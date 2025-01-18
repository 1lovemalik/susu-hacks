function Dashboard() {
  const userName = "Adesola"; // Example user name for greeting

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-lg mt-2">Here’s an overview of your activity and progress.</p>
      </div>

      {/* Stats Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">Total Contributions</h2>
          <p className="text-4xl font-bold text-gray-800">$4,520</p>
          <p className="text-gray-600 mt-2">This is the total you've contributed so far.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">Active Groups</h2>
          <p className="text-4xl font-bold text-gray-800">3</p>
          <p className="text-gray-600 mt-2">Groups you are currently a part of.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">Next Payout</h2>
          <p className="text-4xl font-bold text-gray-800">$1,200</p>
          <p className="text-gray-600 mt-2">Scheduled for January 25th, 2025.</p>
        </div>
      </div>

      {/* Group Activity Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Groups</h2>
        <ul className="space-y-4">
          {/* Example Group 1 */}
          <li className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
            <h3 className="text-lg font-bold text-teal-600">Group: Family Savings</h3>
            <p className="text-gray-700">Next Contribution: $300 on Jan 20th, 2025</p>
            <p className="text-gray-600">Payout Date: Feb 10th, 2025</p>
          </li>
          {/* Example Group 2 */}
          <li className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
            <h3 className="text-lg font-bold text-teal-600">Group: Travel Fund</h3>
            <p className="text-gray-700">Next Contribution: $200 on Jan 22nd, 2025</p>
            <p className="text-gray-600">Payout Date: March 5th, 2025</p>
          </li>
          {/* Example Group 3 */}
          <li className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition">
            <h3 className="text-lg font-bold text-teal-600">Group: Investment Club</h3>
            <p className="text-gray-700">Next Contribution: $500 on Jan 25th, 2025</p>
            <p className="text-gray-600">Payout Date: March 15th, 2025</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
