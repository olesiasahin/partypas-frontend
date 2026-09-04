import { Routes, Route, useSearchParams, Navigate } from "react-router-dom";
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
import { IMAGES } from "./siteConfig";

// Same routing as the design prototype: /?page=<key>&lang=<xx>
const PAGES = {
  home: <Home />,
  klasik: <ClassPage discKey="classical" image={IMAGES.classical} />,
  salon: <ClassPage discKey="ballroom" image={IMAGES.ballroom} />,
  stretching: <ClassPage discKey="stretching" image={IMAGES.stretching} />,
  "neden-online": <WhyOnline />,
  programlar: <Programs />,
  hakkimda: <About />,
  iletisim: <Contact />,
  trial: <Appointment />,
  blog: <Blog />,
};

function QueryPage() {
  const [params] = useSearchParams();
  const page = params.get("page") || "home";
  return PAGES[page] || PAGES.home;
}

// Old path URLs keep working by redirecting to the ?page= form.
const ALIASES = {
  "/classical": "klasik",
  "/ballroom": "salon",
  "/stretching": "stretching",
  "/why-online": "neden-online",
  "/programs": "programlar",
  "/about": "hakkimda",
  "/contact": "iletisim",
  "/book": "trial",
  "/blog": "blog",
};

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<QueryPage />} />
          {Object.entries(ALIASES).map(([path, page]) => (
            <Route key={path} path={path} element={<Navigate to={`/?page=${page}`} replace />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
