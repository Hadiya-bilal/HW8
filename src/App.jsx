import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Meal from './pages/Meal';
import NotFound from './pages/NotFound';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
        
        <main className="app-main">
          <Routes>
            <Route index element={<Home />} />
            <Route path="meal/:id" element={<Meal />} />
            <Route 
              path="admin" 
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;