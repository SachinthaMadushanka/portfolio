import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 text-white shadow-md sticky top-0 z-50">
        <h2 className="text-2xl font-bold tracking-wide">dev</h2>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-300 font-medium">
            Home
          </Link>
          <Link to="/projects" className="hover:text-blue-400 transition-colors duration-300 font-medium">
            Projects
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors duration-300 font-medium">
            Contact
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;