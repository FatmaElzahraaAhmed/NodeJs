class FlightReservation {
  #Ticket = [];
  AddItem(
    id,
    seatNum,
    flightNum,
    departureAirport,
    arrivalAirport,
    travelingDate
  ) {
    let newTicket = {
      id,
      seatNum,
      flightNum,
      departureAirport,
      arrivalAirport,
      travelingDate,
    };
    this.#Ticket.push(newTicket);
  }

  getTickets() {
    return this.#Ticket;
  }

  getOneTicket(id) {
    for (let i = 0; i < this.#Ticket.length; i) {
      if (this.#Ticket[i].id == id) {
        return this.#Ticket[i];
      }
      return "No Ticket with id: " + id;
    }
  }

  updateTicket(
    id,
    seatNum,
    flightNum,
    departureAirport,
    arrivalAirport,
    travelingDate
  ) {
    for (let i = 0; i < this.#Ticket.length; i++) {
      if (this.#Ticket[i].id == id) {
        this.#Ticket[i].seatNum = seatNum;
        this.#Ticket[i].flightNum = flightNum;
        this.#Ticket[i].departureAirport = departureAirport;
        this.#Ticket[i].arrivalAirport = arrivalAirport;
        this.#Ticket[i].travelingDate = travelingDate;

        return this.#Ticket[i];
      }
    }

    return "No Ticket with id: " + id;
  }
}

module.exports = { FlightReservation };
