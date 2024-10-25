import { FormEvent, useState } from "react";
import { useAddReservationMutation } from "../../api/api";
import { SaveReservationDTO } from "../../DTOs/SaveReservationDTO";
import { useNavigate } from "react-router-dom";

const NewReservation = () => {
  const [reservation, setReservation] = useState<SaveReservationDTO>(
    new SaveReservationDTO("", 1, "", "", "")
  );

  const [addReservation] = useAddReservationMutation();

  const navigator = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await addReservation(reservation)
      .unwrap()
      .then((response) => {
        if (response.id) {
          navigator("/reservations/success");
        }
      });
  };

  return (
    <>
      <div className="row justify-content-center">
        <div className="card col-8 border-secondary">
          <h4 className="card-header">Nova reserva</h4>
          <form className="p-4" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Reserva em nome de:
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) =>
                  setReservation({ ...reservation, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amountOfPeople" className="form-label">
                Quantidade de pessoas:
              </label>
              <input
                type="number"
                name="amountOfPeople"
                className="form-control"
                min="1"
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    amountOfPeople: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reservationDate" className="form-label">
                Dia da reserva:
              </label>
              <input
                type="date"
                name="reservationDate"
                className="form-control"
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    reservationDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkInTime" className="form-label">
                Horário de entrada:
              </label>
              <input
                type="time"
                name="checkInTime"
                className="form-control"
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    checkInTime: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkOutTime" className="form-label">
                Horário de saída:
              </label>
              <input
                type="time"
                name="checkOutTime"
                className="form-control"
                onChange={(e) =>
                  setReservation({
                    ...reservation,
                    checkOutTime: e.target.value,
                  })
                }
              />
            </div>
            <button className="btn btn-primary">Confirmar reserva</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewReservation;
