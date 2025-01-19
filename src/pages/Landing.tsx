import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <motion.div
      className="min-h-screen bg-gray-100 text-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="bg-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Community. Trust. Growth.</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the power of collective saving with{" "}
          <span className="text-teal-500">Susu.</span> Simplify your
          contributions, track your progress, and achieve financial freedom.
        </p>
        <div className="mt-8">
          <Link to="/signup">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-teal-600 transition">
              Join Now
            </button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Why Choose <span className="text-teal-500">Susu</span>?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold text-teal-500 mb-4">Secure</h3>
            <p className="text-gray-600">
              Your contributions are safe and transparent with real-time
              tracking.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold text-teal-500 mb-4">Collaborative</h3>
            <p className="text-gray-600">
              Connect with trusted members in your community to grow wealth
              together.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-bold text-teal-500 mb-4">Flexible</h3>
            <p className="text-gray-600">
              Withdraw your funds with ease, no strings attached, no interest.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default Landing;
