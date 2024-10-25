import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRouteLogin, PrivateRouteOther } from './pages/private-route/PrivateRouteLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from './pages/login/IndexPage';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteLogin />}>
          <Route path='/' element={<IndexPage />} />
        </Route>
        <Route element={<PrivateRouteOther />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
