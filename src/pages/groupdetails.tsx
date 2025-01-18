function GroupDetails() {
  // Mock group details
  const groupName = "Family Savings";
  const groupMembers = [
    { name: "Adesola", contributed: "$1,200", nextContribution: "Jan 20th, 2025" },
    { name: "Tochi", contributed: "$800", nextContribution: "Jan 20th, 2025" },
    { name: "Amara", contributed: "$1,000", nextContribution: "Jan 20th, 2025" },
  ];
  const payoutSchedule = [
    { date: "Feb 10th, 2025", member: "Adesola", amount: "$1,500" },
    { date: "March 10th, 2025", member: "Tochi", amount: "$1,500" },
    { date: "April 10th, 2025", member: "Amara", amount: "$1,500" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Group Header */}
      <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">{groupName}</h1>
        <p className="text-lg mt-2">Track contributions, payouts, and member activity.</p>
      </div>

      {/* Members Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Members</h2>
        <ul className="space-y-4">
          {groupMembers.map((member, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-bold text-teal-600">{member.name}</h3>
              <p className="text-gray-700">Contributed: {member.contributed}</p>
              <p className="text-gray-600">Next Contribution: {member.nextContribution}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Payout Schedule Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payout Schedule</h2>
        <ul className="space-y-4">
          {payoutSchedule.map((payout, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
            >
              <div>
                <p className="text-teal-600 font-bold">{payout.member}</p>
                <p className="text-gray-700">Amount: {payout.amount}</p>
              </div>
              <p className="text-gray-600">{payout.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupDetails;
