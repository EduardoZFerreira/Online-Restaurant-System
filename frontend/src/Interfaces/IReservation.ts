interface IReservation {
  id: string;
  amountOfPeople: number;
  checkIn: Date;
  checkOut: Date;
  userId: string;
}

export type { IReservation };
