import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ClassPage from "./pages/ClassPage";
import WhyOnline from "./pages/WhyOnline";
import Programs from "./pages/Programs";
import About from "./pages/About";
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
          <Route path="/classical" element={<ClassPage discKey="classical" image="/images/classical.jpg" />} />
          <Route path="/ballroom" element={<ClassPage discKey="ballroom" image="/images/ballroom.jpg" />} />
          <Route path="/stretching" element={<ClassPage discKey="stretching" image="/images/stretching.jpg" />} />
          <Route path="/why-online" element={<WhyOnline />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
