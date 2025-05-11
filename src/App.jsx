import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Meal from './pages/Meal';


import './App.css'

function App() {
  return (
     <BrowserRouter>
       <Routes>
        
<Route path="/" element={<Home />} />

    <Route path="/meal/:id" element={<Meal />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;