import Navbar from "./Components/Sidebar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Views/Home/Home";
import NewReservation from "./Views/Reservation/NewReservation";
import MenuItemsList from "./Views/MenuItems/MenuItemsList";
import Success from "./Views/Reservation/Success";
import ListReservations from "./Views/Reservation/ListReservations";
import Login from "./Views/Home/Login";
import { RequireAuth } from "./Components/Permissions/RequireAuth";
import { RequireRole } from "./Components/Permissions/RequireRole";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menuItems/list" element={<MenuItemsList />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/reservations/new" element={<NewReservation />} />
          <Route path="/reservations/success" element={<Success />} />
          <Route element={<RequireRole requiredRole="Admin" />}>
            <Route path="/reservations/list" element={<ListReservations />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
