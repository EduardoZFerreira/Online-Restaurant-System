import { ISaveReservationDTO } from "../interfaces/ISaveReservationDTO";
import prismaClient from "../prisma/PrismaClient";

class ReservationService {
  validateRequest(data: ISaveReservationDTO): boolean {
    if (
      !data.name ||
      !data.amountOfPeople ||
      !data.checkInTime ||
      !data.checkOutTime ||
      !data.reservationDate
    ) {
      throw new Error("Um ou mais campos não foram informados");
    }

    return true;
  }

  async create(data: ISaveReservationDTO) {
    this.validateRequest(data);

    let existingUser = await prismaClient.user.findFirst({
      where: {
        name: data.name,
      },
    });

    if (!existingUser) {
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

    const minimumAheadMinutes = 60;
    const minimumDate = new Date(
      new Date().getTime() + minimumAheadMinutes * 60000
    );

    if (checkIn < minimumDate) {
      throw new Error(
        "As reservas só podem ser agendadas com 1 hora de antecedência!"
      );
    }

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

  async getByUser(userId: string) {
    const reservations = await prismaClient.reservation.findMany({
      where: {
        userId: userId,
      },
    });

    return reservations;
  }
}

export { ReservationService };
