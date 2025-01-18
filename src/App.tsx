import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import GroupDetails from "./pages/groupdetails";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          {/* Logo */}
          <span className="text-2xl font-bold">Susu.</span>

          {/* Navigation Links */}
          <nav className="flex gap-6">
            <Link to="/" className="hover:text-teal-400 transition">Home</Link>
            <Link to="/login" className="hover:text-teal-400 transition">Login</Link>
            <Link to="/signup" className="hover:text-teal-400 transition">Signup</Link>
            <Link to="/dashboard" className="hover:text-teal-400 transition">Dashboard</Link>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 bg-gray-100">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/groupdetails" element={<GroupDetails />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>&copy; 2025 Susu. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="#" className="text-teal-400 hover:underline">
              Facebook
            </a>
            <a href="#" className="text-teal-400 hover:underline">
              Instagram
            </a>
            <a href="#" className="text-teal-400 hover:underline">
              Twitter
            </a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
