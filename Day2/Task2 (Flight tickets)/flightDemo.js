const flightMod=require('./flightModule');

let myTickets=flightMod.FlightReservation;

let t1=new myTickets();

t1.AddItem(1,'A12', 'ABC123', 'JFK', 'LAX', '2024-04-01');
t1.AddItem(2,'A13', 'ABC124', 'JFK', 'LAX', '2024-04-01');

console.log("\nDisplaying one ticket with valid id:");
console.log(t1.getOneTicket(1));
console.log("________________________________________________________________");

console.log("\nDisplaying one ticket with invalid id:");
console.log(t1.getOneTicket(4));
console.log("________________________________________________________________");

console.log("\nUpdating one ticket with valid id:");
console.log(t1.updateTicket(2,'A11112', 'ABC123', 'JFK', 'LAX', '2024-04-01'));
console.log("________________________________________________________________");

console.log("\nUpdating one ticket with invalid id:");
console.log(t1.updateTicket(4));
console.log("________________________________________________________________");

console.log("Displaying All Tickets:");
console.log(t1.getTickets());
console.log("________________________________________________________________");
