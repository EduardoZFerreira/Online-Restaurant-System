import { Request } from "express";
import { IReservation } from "../interfaces/IReservation";
import { ReservationService } from "../services/ReservationService";

class ReservationController {
  async create(request: Request) {
    const data = request.body as IReservation;
    const service = new ReservationService();
    const reservation = await service.create(data);

    return reservation;
  }
}

export { ReservationController };
