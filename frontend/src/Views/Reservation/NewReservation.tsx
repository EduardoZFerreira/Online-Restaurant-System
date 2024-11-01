import { FormEvent, useState } from "react";
import { useAddReservationMutation } from "../../api/api";
import { SaveReservationDTO } from "../../DTOs/SaveReservationDTO";
import { useNavigate } from "react-router-dom";
import FormAlert from "../../Components/FormAlert/FormAlert";
import { useSelector } from "react-redux";
import { selectCurrentName } from "../../features/authSlice";

const NewReservation = () => {
  const name = useSelector(selectCurrentName);

  const [alertVisible, setAlertVisible] = useState(false);
  const [validationMessage, setValidationMessage] = useState<string>("");

  const minimumAheadMinutes = 60;

  const [reservation, setReservation] = useState<SaveReservationDTO>(
    new SaveReservationDTO(name, 1, "", "", "")
  );

  const [addReservation] = useAddReservationMutation();

  const navigator = useNavigate();

  const handleReservationCheckIn = (checkInTime: string) => {
    const minimumDate = new Date(
      new Date().getTime() + minimumAheadMinutes * 60000
    );
    const reservationCheckIn = new Date(
      `${reservation.reservationDate} ${checkInTime}`
    );

    if (reservationCheckIn >= minimumDate) {
      setReservation({
        ...reservation,
        checkInTime: checkInTime,
      });
      setAlertVisible(false);
    } else {
      setValidationMessage(
        "As reservas só podem ser agendadas com 1 hora de antecedência!"
      );
      setAlertVisible(true);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await addReservation(reservation)
      .unwrap()
      .then((response) => {
        if (response.id) {
          navigator("/reservations/success");
        }
      })
      .catch((response) => {
        setValidationMessage(response.data.error);
        setAlertVisible(true);
      });
  };

  return (
    <>
      <div className="container mt-4">
        {alertVisible && (
          <FormAlert
            error={validationMessage}
            onClose={() => {
              setValidationMessage("");
              setAlertVisible(false);
            }}
          />
        )}
        <div className="row justify-content-center">
          <div className="card shadow col-lg-8 col-md-10 col-11 border-secondary">
            <h4 className="card-header display-6">Nova reserva para {name} </h4>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={(e) =>
                    setReservation({ ...reservation, name: e.target.value })
                  }
                  placeholder="Reserva em nome de..."
                  value={name}
                  required
                />
                <label htmlFor="name">Reserva em nome de...</label>
              </div>
              <div className="mb-3 form-floating">
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
                  placeholder="Quantidade de pessoas"
                  required
                />
                <label htmlFor="amountOfPeople">Quantidade de pessoas:</label>
              </div>
              <div className="mb-3 form-floating">
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
                  placeholder="Dia da reserva"
                  required
                />
                <label htmlFor="reservationDate">Dia da reserva:</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="time"
                  name="checkInTime"
                  className="form-control"
                  onChange={(e) => handleReservationCheckIn(e.target.value)}
                  placeholder="Horário de entrada"
                  required
                />
                <label htmlFor="checkInTime">Horário de entrada:</label>
              </div>
              <div className="mb-3 form-floating">
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
                  placeholder="Horário de saída"
                  required
                />
                <label htmlFor="checkOutTime">Horário de saída:</label>
              </div>
              <button className="btn btn-primary">Confirmar reserva</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewReservation;
