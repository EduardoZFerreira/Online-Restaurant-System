import { IReservation } from "../interfaces/IReservation";
import prismaClient from "../prisma/PrismaClient";

class ReservationService {
  async create(data: IReservation) {
    const reservation = await prismaClient.reservation.create({
      data: {
        ...data,
        checkIn: new Date(Date.parse(data.checkIn)),
        checkOut: new Date(Date.parse(data.checkOut)),
      },
    });

    return reservation;
  }
}

export { ReservationService };
