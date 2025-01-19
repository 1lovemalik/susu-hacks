import React, { useState } from "react";
import { motion } from "framer-motion";

function GroupDetails() {
  // Mock data + local state for editing
  const [groupName] = useState("Family Savings");
  const [groupDescription, setGroupDescription] = useState(
    "Saving for our future projects and emergencies."
  );
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  function parseCurrency(str: string): number {
    return Number(str.replace(/[^0-9.-]+/g, "")) || 0;
  }

  const [groupMembers, setGroupMembers] = useState([
    { name: "Adesola", contributed: "$1,200", nextContribution: "Jan 20th, 2025" },
    { name: "Tochi", contributed: "$1,900", nextContribution: "Jan 20th, 2025" },
    { name: "Chigo", contributed: "$1,000", nextContribution: "Jan 20th, 2025" },
  ]);

  const [payoutSchedule] = useState([
    { date: "Feb 10th, 2025", member: "Adesola", amount: "$1,500" },
    { date: "March 10th, 2025", member: "Tochi", amount: "$1,500" },
    { date: "April 10th, 2025", member: "Chigo", amount: "$1,500" },
  ]);

  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberContribution, setNewMemberContribution] = useState("");

  // Calculate total contributed
  const totalContributed = groupMembers.reduce((sum, member) => {
    return sum + parseCurrency(member.contributed);
  }, 0);

  // Mock goal for the progress bar
  const contributionGoal = 5000;
  const progressPercentage = Math.min(
    Math.round((totalContributed / contributionGoal) * 100),
    100
  );

  // Handlers
  const handleSaveDescription = () => {
    setIsEditingDescription(false);
  };

  const handleAddMember = () => {
    if (!newMemberName || !newMemberContribution) return;
    setGroupMembers((prev) => [
      ...prev,
      {
        name: newMemberName,
        contributed: newMemberContribution,
        nextContribution: "TBD",
      },
    ]);
    setNewMemberName("");
    setNewMemberContribution("");
  };

  const handleRemoveMember = (name: string) => {
    setGroupMembers((prev) => prev.filter((m) => m.name !== name));
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Group Header */}
      <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">{groupName}</h1>
        {isEditingDescription ? (
          <div className="mt-2 flex items-center gap-2">
            <textarea
              className="text-gray-800 p-2 rounded w-full max-w-lg"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
            />
            <button
              onClick={handleSaveDescription}
              className="bg-white text-teal-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mt-2 flex justify-between items-center">
            <p className="text-lg">{groupDescription}</p>
            <button
              onClick={() => setIsEditingDescription(true)}
              className="text-white underline hover:text-gray-300"
            >
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Progress</h2>
        <p className="text-gray-700 mb-2">
          Total Contributed: <strong>${totalContributed}</strong> / $
          {contributionGoal}
        </p>
        <div className="w-full h-4 bg-gray-300 rounded">
          <div
            className="h-full bg-teal-500 rounded"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {progressPercentage}% of your ${contributionGoal} goal
        </p>
      </div>

      {/* Members Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Members</h2>
        <ul className="space-y-4">
          {groupMembers.map((member, index) => (
            <li
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition flex justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-teal-600">{member.name}</h3>
                <p className="text-gray-700">Contributed: {member.contributed}</p>
                <p className="text-gray-600">
                  Next Contribution: {member.nextContribution}
                </p>
              </div>
              <button
                onClick={() => handleRemoveMember(member.name)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Add New Member Form */}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <h3 className="text-xl font-semibold mb-2">Add New Member</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Member Name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <input
              type="text"
              placeholder='Contributed (e.g. "$500")'
              value={newMemberContribution}
              onChange={(e) => setNewMemberContribution(e.target.value)}
              className="border border-gray-300 rounded p-2"
            />
            <button
              onClick={handleAddMember}
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            >
              Add Member
            </button>
          </div>
        </div>
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
    </motion.div>
  );
}

export default GroupDetails;
