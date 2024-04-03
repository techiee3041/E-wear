import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import Login from "./scenes/home/Login";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return (
    <div className="m-auto">
      <BrowserRouter>
        <Routes>
          {/* Routes without Navbar and Footer */}
          <Route path="/login" element={<Login />} />
          {/* Routes with Navbar and Footer */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <ScrollToTop />
                <Route path="/" element={<Home />} />
                <Route path="/item/:itemId" element={<ItemDetails />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="checkout/success" element={<Confirmation />} />
                <CartMenu />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
