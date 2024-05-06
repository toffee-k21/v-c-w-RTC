import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Room from './pages/Room';

function App() {
  return (
    <BrowserRouter>
    <div className="App h-[500px] bg-red-200">
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/room/:id" element={ <Room />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
