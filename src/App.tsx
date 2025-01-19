// App.tsx
import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import "./App.css";

// Define Notification types
interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info"; // you can add more
}

// Shape of our context value
interface NotificationContextProps {
  notifications: Notification[];
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
  removeNotification: (id: number) => void;
}

// Create the Context with a default empty shape
const NotificationContext = createContext<NotificationContextProps>({
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
});

// Hook to use Notification Context
export function useNotifications() {
  return useContext(NotificationContext);
}

// Create Provider that holds the logic
export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    const newNotification: Notification = {
      id: Date.now(), // quick unique ID
      message,
      type,
    };
    setNotifications((prev) => [...prev, newNotification]);

    // automatically remove the notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}

      {/* Notification Display */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`px-4 py-2 rounded shadow-md text-white ${
              notif.type === "success"
                ? "bg-green-500"
                : notif.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {notif.message}

            {/* Optional close button */}
            <button
              onClick={() => removeNotification(notif.id)}
              className="ml-3 text-white font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

// Animated Routes Component
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groupdetails" element={<GroupDetails />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <NotificationProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Susu</Link>
            <nav className="flex gap-6">
              <Link to="/" className="hover:text-teal-400 transition">
                Home
              </Link>
              <Link to="/login" className="hover:text-teal-400 transition">
                Login
              </Link>
              <Link to="/signup" className="hover:text-teal-400 transition">
                Signup
              </Link>
              <Link to="/dashboard" className="hover:text-teal-400 transition">
                Dashboard
              </Link>
              <Link to="/groupdetails" className="hover:text-teal-400 transition">
                GroupDetails
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <main className="flex-1 p-4 bg-gray-100">
            <AnimatedRoutes />
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
    </NotificationProvider>
  );
}

export default App;
