// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let mealId = 0;
class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = parseInt(price);
    this.id = ++mealId;
    store.meals.push(this);
  }
  deliveries() {
    return store.deliveries.filter(e => e.mealId === this.id);
  }
  customers() {
    return this.deliveries().map(e => e.customer());
  }
  static byPrice() {
    return store.meals.sort((l, h) => h.price - l.price);
  }
}
let customerId = 0;
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name;
    this.neighborhoodId = neighborhoodId;
    this.id = ++customerId;
    store.customers.push(this);
  }
  deliveries() {
    return store.deliveries.filter(e => e.customerId === this.id);
  }
  meals() {
    return this.deliveries().map(e => e.meal());
  }
  totalSpent() {
    return this.meals().reduce((sum, e) => {
      return sum + e.price;
    }, 0);
  }
}
let neighId = 0;
class Neighborhood {
  constructor(name) {
    this.name = name;
    this.id = ++neighId;
    store.neighborhoods.push(this);
  }
  deliveries() {
    return store.deliveries.filter(e => e.neighborhoodId === this.id);
  }
  customers() {
    return store.customers.filter(e => e.neighborhoodId === this.id);
  }
  meals() {
    const meals = this.deliveries().map(e => e.meal());
    return meals.filter((e, i) => {
      return meals.indexOf(e) === i;
    });
  }
}
let deliveryId = 0;
class Delivery {
  constructor(meal, neighborhood, customer) {
    this.mealId = meal;
    this.neighborhoodId = neighborhood;
    this.customerId = customer;
    this.id = ++deliveryId;
    store.deliveries.push(this);
  }
  meal() {
    return store.meals.find(e => e.id === this.mealId);
  }
  customer() {
    return store.customers.find(e => e.id === this.customerId);
  }
  neighborhood() {
    return store.neighborhoods.find(e => e.id === this.neighborhoodId);
  }
}
