import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Image from './pages/Image.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Image />} />
      </Routes>
    </Router>
  );
}

export default App;