import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRouteLogin, PrivateRouteOther } from './pages/private-route/PrivateRouteLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import IndexPage from './pages/login/IndexPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/user-profile/UserProfile';
import SlBooking from './pages/booking/SlBooking';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteLogin />}>
          <Route path='/login' element={<IndexPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
        <Route element={<PrivateRouteOther />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userProfile' element={<UserProfile/>} />
          <Route path='/sl-booking/:trainNumber' element={<SlBooking/>}/>
          <Route path='/two-tier-booking/:trainNumber' element={<SlBooking/>}/>
          <Route path='/three-tier-booking/:trainNumber' element={<SlBooking/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
