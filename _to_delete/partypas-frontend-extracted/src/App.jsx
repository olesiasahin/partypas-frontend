import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DanceStyles from "./pages/DanceStyles";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dance-styles" element={<DanceStyles />} />
          <Route path="/book" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
