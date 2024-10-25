import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRouteLogin } from './pages/private-route/PrivateRouteLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import IndexPage from './pages/login/IndexPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRouteLogin />}>
          <Route path='/' element={<IndexPage />} />
          {/* <Route path='/' element={<Dashboard/>}/> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
