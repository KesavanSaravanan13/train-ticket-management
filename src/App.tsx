import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRouteLogin, PrivateRouteOther } from './pages/private-route/PrivateRouteLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import IndexPage from './pages/login/IndexPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/user-profile/UserProfile';
import SlBooking from './pages/booking/SlBooking';
import BookedSeats from './pages/booked-seats/BookedSeats';
import TwoABooking from './pages/booking/TwoABooking';
import ThreeABooking from './pages/booking/ThreeABooking';
import useAuthRedirect from './pages/private-route/useAuthRedirect';


function App() {
  useAuthRedirect();

  return (
      <Routes>
        <Route element={<PrivateRouteLogin />}>
          <Route path='/login' element={<IndexPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<PrivateRouteOther />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/booked-seats' element={<BookedSeats />} />
          <Route path='/sl-booking/:trainNumber' element={<SlBooking />} />
          {/*--- yet to develop ---*/}
          <Route path='/two-tier-booking/:trainNumber' element={<TwoABooking />} />
          <Route path='/three-tier-booking/:trainNumber' element={<ThreeABooking />} />
          {/*--- yet to develop ---*/}
        </Route>
      </Routes>
  );
}

export default App;
