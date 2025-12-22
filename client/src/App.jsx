import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LikesProvider } from './context/LikesContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import ContentDetail from './pages/ContentDetail';
import About from './pages/About';
import Liked from './pages/Liked';

function App() {
  return (
    <LikesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/liked" element={<Liked />} />
        </Routes>
      </Router>
    </LikesProvider>
  );
}

export default App;
