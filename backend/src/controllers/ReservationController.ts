import { Request } from "express";
import { IReservation } from "../interfaces/IReservation";
import { ReservationService } from "../services/ReservationService";
import { ISaveReservationDTO } from "../interfaces/ISaveReservationDTO";

class ReservationController {
  async create(request: Request) {
    const data = request.body as ISaveReservationDTO;
    const service = new ReservationService();
    const reservation = await service.create(data);

    return reservation;
  }

  async getByUser(request: Request) {
    const filter = request.params.userId as string;

    if (!filter) {
      throw new Error("É necessário informar um usuário");
    }

    return await new ReservationService().getByUser(filter);
  }
}

export { ReservationController };
