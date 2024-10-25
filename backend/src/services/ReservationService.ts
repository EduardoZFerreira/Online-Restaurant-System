import { ISaveReservationDTO } from "../interfaces/ISaveReservationDTO";
import prismaClient from "../prisma/PrismaClient";

class ReservationService {
  async create(data: ISaveReservationDTO) {
    let existingUser = await prismaClient.user.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!existingUser && data.name) {
      existingUser = await prismaClient.user.create({
        data: {
          name: data.name,
          email: "",
          password: "",
        },
      });
    }

    const checkIn: Date = new Date(
      `${data.reservationDate} ${data.checkInTime}`
    );

    const checkOut: Date = new Date(
      `${data.reservationDate}T${data.checkOutTime}:00`
    );

    if (checkOut < checkIn) {
      checkOut.setDate(checkOut.getDate() + 1);
    }

    const reservation = await prismaClient.reservation.create({
      data: {
        amountOfPeople: data.amountOfPeople,
        userId: existingUser?.id,
        checkIn: checkIn,
        checkOut: checkOut,
      },
    });

    return reservation;
  }
}

export { ReservationService };
