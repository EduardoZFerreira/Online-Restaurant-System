import { useLazyGetReservationByUserIdQuery } from "../../api/api";
import ReservationCardPlaceholder from "../../Components/Placeholders/ReservationCardPlaceholder";
import ReservationCard from "../../Components/ReservationCard/ReservationCard";
import ReservationSearch from "../../Components/ReservationSearch/ReservationSearch";

const ListReservations = () => {
  const [getReservations, { data, isSuccess, isLoading }] =
    useLazyGetReservationByUserIdQuery();

  const handleUserSelect = async (userId: string) => {
    if (userId) await getReservations(userId);
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row mb-4">
          <h1>Selecione um usuário para buscar as reservas</h1>
          <ReservationSearch onSelectItem={handleUserSelect} />
        </div>
        {isLoading && <ReservationCardPlaceholder />}
        {isSuccess &&
          data.map((reservation) => (
            <div className="row mb-4" key={reservation.id}>
              <ReservationCard {...reservation} />
            </div>
          ))}
      </div>
    </>
  );
};

export default ListReservations;
