import { ChangeEvent } from "react";
import { useGetUsersQuery } from "../../api/api";

interface ReservationSearchProperties {
  onSelectItem: (userId: string) => void;
}

const ReservationSearch = ({ onSelectItem }: ReservationSearchProperties) => {
  const { data, isLoading, isSuccess } = useGetUsersQuery();
  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          {isLoading && (
            <div className="placeholder-glow">
              <div className="placeholder col-md-6"></div>
            </div>
          )}
          {isSuccess && (
            <select
              className="form-select"
              aria-label="Usuário para busca..."
              defaultValue={""}
              onChange={(event) => {
                event.stopPropagation();
                onSelectItem(event.target.value);
              }}
            >
              <option value="" disabled>
                Escolha um usuário
              </option>
              {data.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationSearch;
