import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="landing-page">
            <div className="landing-overlay" />
            <div className="landing-content">
              <h1>Paradise Nursery</h1>
              <AboutUs />
              <br />
              <Link to="/plants" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        }
      />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}

export default App;
