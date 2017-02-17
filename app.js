'use strict'

//global variables
var hours = ['6Am', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'];
var storeLocations = [];
// var hourlyTotals = [];
var salesTable = document.getElementById('salesTable');
var salesInput = document.getElementById('salesInput');

//constructor function defines a template for all storeLocations
function Store(name, minCustomers, maxCustomers, avgTreats) {
  //properties
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgTreats = avgTreats;
  //arrays
  this.avgCustomersPerHour = [];
  this.avgTreatsSoldPerHour = [];
  this.totalTreatsPerDay = 0;
  //methods
  this.numCustomersPerHour();
  this.treatsPerCustomer();
  //push created instance to storeLocations array
  storeLocations.push(this);
}
  //the constructor function is the prototype for Store objects...create table elements
Store.prototype.render = function() {
  var trRowName = document.createElement('tr');
  var tdStore = document.createElement('td');
  tdStore.textContent = this.name;
  trRowName.appendChild(tdStore);
  for (var i = 0; i < this.avgTreatsSoldPerHour.length; i++) {
    var tdCell = document.createElement('td');
    tdCell.textContent = this.avgTreatsSoldPerHour[i];
    trRowName.appendChild(tdCell);
  };
  var tdTotal = document.createElement('td');
  tdTotal.textContent = this.totalTreatsPerDay;
  trRowName.appendChild(tdTotal);
  salesTable.appendChild(trRowName);
};
Store.prototype.numCustomersPerHour = function() {
  for (var i = 0; i < hours.length; i++) {
    var perHourCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers +1)) + this.minCustomers;
    this.avgCustomersPerHour.push(perHourCustomers);
  }
};
Store.prototype.treatsPerCustomer = function() {
  for (var i = 0; i < hours.length; i++) {
    var perHourTreats = Math.ceil(this.avgCustomersPerHour[i] * this.avgTreats);
    this.avgTreatsSoldPerHour.push(perHourTreats);
    this.totalTreatsPerDay += perHourTreats;
  }
};

//functions to create table
function makeHeaderRow() {
  var tableRow = document.createElement('tr');
  var thElement = document.createElement('th');
  thElement.textContent = null;
  salesTable.appendChild(tableRow);
  tableRow.appendChild(thElement);
  for (var i = 0; i < hours.length; i++) {
    thElement = document.createElement('th');
    thElement.textContent = hours[i];
    tableRow.appendChild(thElement);
    // console.log(thElement);
  }
  thElement = document.createElement('th');
  thElement.textContent = 'Location Total';
  tableRow.appendChild(thElement);
  console.log(salesTable);
  salesTable.appendChild(tableRow);
};
function renderAllStores() {
  for (var i = 0; i < storeLocations.length; i++) {
    storeLocations[i].render();
  }
};
function makeFooterRow() {
  var tableRow = document.createElement('tr');
  tableRow.textContent = 'Totals';
  salesTable.appendChild(tableRow);
  var grandTotal = 0;
  for (var i = 0; i < hours.length; i++) {
    var hourlyTotals = 0;
    for (var j = 0; j < storeLocations.length; j++) {
      hourlyTotals = hourlyTotals + storeLocations[j].avgTreatsSoldPerHour[i];
      grandTotal += storeLocations[j].avgTreatsSoldPerHour[i];
  }
    var tdElement = document.createElement('td');
    tdElement.textContent = hourlyTotals;
    tableRow.appendChild(tdElement);
}
tdElement = document.createElement('td');
tdElement.textContent = grandTotal;
tableRow.appendChild(tdElement);
}

//Store object declarations
new Store('Alki', 2, 16, 4.6);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('1st & Pike', 23, 65, 6.3);

//funtion for event handler
function dataInput(event) {
  event.preventDefault();
  console.log('Submit clicked');
//if statement prevents empty text fields
  if (!event.target.name.value || !event.target.minCustomers.value || !event.target.maxCustomers.value || !event.target.avgTreats.value) {
    return alert('Fields cannot be empty');
  }

event.target.name = null;
event.target.minCustomers = null;
event.target.maxCustomers = null;
event.target.avgTreats = null;

var name = event.target.name.value;
var minCustomers = parseInt(event.target.minCustomers.value);
var maxCustomers = parseInt(event.target.maxCustomers.value);
var avgTreats = parseInt(event.target.avgTreats.value);

//user inputs added to table
salesTable.textContent = null;

function realStore(x,y) {
  for (var i = 0; i < x.length; i++) {
    if (x[i].name === y) {
      index = i;
      return true;
    }
  }
  return false;
}

realStore(storeLocations, name);
console.log(realStore(storeLocations, name));

if (realStore === true) {
  console.log('yes');
  storeLocations[index].minCustomers = parseInt(minCustomers);
  storeLocations[index].maxCustomers = parseInt(maxCustomers);
  storeLocations[index].avgTreats = parseFloat(avgTreats);
  storeLocations[index].avgCustomersPerHour = [];
  storeLocations[index].avgTreatsSoldPerHour = [];
  storeLocations[index].totalTreatsPerDay = 0;
  storeLocations[index].numCustomersPerHour();
  storeLocations[index].treatsPerCustomer();
}

if (realStore === false) {
  var newStore = new Store(name, minCustomers, maxCustomers, avgTreats)
}

//refreshing table with user dataInput
makeHeaderRow();
renderAllStores();
makeFooterRow();
}

makeHeaderRow();
renderAllStores();
makeFooterRow();


salesInput.addEventListener('submit', dataInput);
