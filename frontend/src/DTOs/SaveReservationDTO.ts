class SaveReservationDTO {
  name: string;
  amountOfPeople: number;
  reservationDate: Date;
  checkInTime: string;
  checkOutTime: string;

  constructor(
    name: string,
    amountOfPeople: number,
    reservationDate: Date,
    checkInTime: string,
    checkOutTime: string
  ) {
    this.name = name;
    this.amountOfPeople = amountOfPeople;
    this.reservationDate = reservationDate;
    this.checkInTime = checkInTime;
    this.checkOutTime = checkOutTime;
  }
}

export { SaveReservationDTO };
