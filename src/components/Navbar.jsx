// Navbar.jsx
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full bg-blue-800 text-white px-6 py-4 shadow-lg flex justify-between items-center">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <span role="img" aria-label="logo">📄</span> Paste App
      </h1>
      <div className="flex gap-4 text-lg">
        <Link
          to="/"
          className={`hover:text-yellow-400 ${
            location.pathname === "/" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/pastes"
          className={`hover:text-yellow-400 ${
            location.pathname === "/pastes" ? "text-yellow-400 font-semibold" : ""
          }`}
        >
          Pastes
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
