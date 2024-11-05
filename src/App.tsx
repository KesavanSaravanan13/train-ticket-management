import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRouteLogin, PrivateRouteOther } from './pages/private-route/PrivateRouteLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import IndexPage from './pages/login/IndexPage';
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/user-profile/UserProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteLogin />}>
          <Route path='/login' element={<IndexPage />} />
        </Route>
        <Route element={<PrivateRouteOther />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/userProfile' element={<UserProfile/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
