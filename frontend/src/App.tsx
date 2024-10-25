import Sidebar from "./Components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import NewReservation from "./Views/Reservation/NewReservation";
import MenuItemsList from "./Views/MenuItems/MenuItemsList";
import Success from "./Views/Reservation/Success";

function App() {
  return (
    <>
      <Sidebar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations/new" element={<NewReservation />} />
          <Route path="/reservations/success" element={<Success />} />
          <Route path="/menuItems/list" element={<MenuItemsList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
