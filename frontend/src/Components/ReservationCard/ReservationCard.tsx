import { IReservation } from "../../Interfaces/IReservation";

const ReservationCard = (reservation: IReservation) => {
  const checkIn = new Date(reservation.checkIn);
  const checkOut = new Date(reservation.checkOut);

  return (
    <>
      <div className="card shadow col-md-5 col-lg-3 col-12 mb-4 m-lg-2">
        <div className="card-body">
          <h2 className="card-title">{checkIn.toLocaleDateString("pt-BR")}</h2>
          <p className="card-text">Entrada às {checkIn.toLocaleTimeString()}</p>
          <p className="card-text">Saída às {checkOut.toLocaleTimeString()}</p>
        </div>
        <div className="card-footer text-center">
          <h4>Mesa para {reservation.amountOfPeople}</h4>
        </div>
      </div>
    </>
  );
};

export default ReservationCard;
