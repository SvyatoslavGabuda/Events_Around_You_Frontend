import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import Home from "./components/home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ReggistrationForm from "./components/Registration/ReggistrationForm";
import { AuthProvider } from "./auth/contex/AuthProvider";
import LoginForm from "./components/login/LoginForm";
import Missing from "./components/otherpages/Missing";
import Unauthorized from "./components/otherpages/Unauthorized";
import AdminPage from "./components/adminspage/AdminPage";
import UserPage from "./components/userPage/UserPage";
import RequireAuth from "./auth/RequiredAuth";
import EventsPage from "./components/eventspage/EventsPage";
import ResturantPage from "./components/resturantsPage/ResturantPage";
import HotelPage from "./components/hotelsPage/HotelPage";
import AttractionPage from "./components/attractionPage/AttractionPage";
import LoginModal from "./components/login/LoginModal";
import EventsDetailsPage from "./components/eventspage/EventsDetailsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <LoginModal />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventsDetailsPage />} />
            <Route path="/ristoranti" element={<ResturantPage />} />
            <Route path="/hotels" element={<HotelPage />} />
            <Route path="/attrazioni" element={<AttractionPage />} />

            <Route path="/register" element={<ReggistrationForm />} />
            <Route path="/login" element={<LoginForm inModal={false} />} />
            <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN", "ROLE_USER"]} />}>
              <Route path="/user" element={<UserPage />} />
            </Route>
            <Route path="*" element={<Missing />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
