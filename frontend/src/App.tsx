import Navbar from "./Components/Sidebar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import NewReservation from "./Views/Reservation/NewReservation";
import MenuItemsList from "./Views/MenuItems/MenuItemsList";
import Success from "./Views/Reservation/Success";
import ListReservations from "./Views/Reservation/ListReservations";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reservations/new" element={<NewReservation />} />
        <Route path="/reservations/success" element={<Success />} />
        <Route path="/reservations/list" element={<ListReservations />} />
        <Route path="/menuItems/list" element={<MenuItemsList />} />
      </Routes>
    </>
  );
}

export default App;
