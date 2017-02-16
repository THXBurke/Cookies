'use strict'


var hours = ['6Am', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
var stores = [];
var hourlyTotals = [];
var salesTable = document.getElementById('salesTable');

//constructor function defines a template for the stores
function Store(minCustomers, maxCustomers, avgTreats, name) {
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgTreats = avgTreats;
  this.customersPerHour = [];
  this.treatsSoldPerHour = [];
  this.totalTreats = 0;
  this.name = name;

  this.numCustomersPerHour = function() {
    for (var i = 0; i < hours.length; i++) {
      this.customersPerHour.push(Math.floor(Math.random() * (this.maxCustomers - this.minCustomers +1)) + this.minCustomers);
    }
  }
  // this.numTreatsPerHour
};
