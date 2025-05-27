import { HashRouter, Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom'
import Header from './components/layouts/Header';
import Home from './pages/Home';
import Footer from './components/layouts/Footer';
import Read from './pages/Read';
import Sign from './pages/Sign';
import ProductDetail from './pages/productDetail';

import ViewDetail from './pages/viewDetail';
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/Cart";

const App = () => (
  <CartProvider>
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/ProductDetail" element={<ProductDetail />} />
          <Route path="/viewDetail/:id" element={<ViewDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </HashRouter>
    </div>
  </CartProvider>
);

export default App;
