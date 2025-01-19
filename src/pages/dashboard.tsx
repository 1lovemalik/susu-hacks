import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useNotifications } from "../App";
import { groupData } from "../data/placeholderData";

// Interfaces

// Group logic
interface Group {
  id: number;
  groupName: string;
  totalContributions: number;
  nextPayout: string;
  members: string[];
}

// Poll Feature
interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  question: string;
  options: PollOption[];
}

// Goals & Achievements
interface Goal {
  id: number;
  title: string;
  target: number;
  current: number; // how much user has saved so far
}

// Calendar / Timeline
interface CalendarEvent {
  id: number;
  title: string;
  date: string; // i.e. "2025-02-10"
  description: string;
}

// Activity Feed
interface FeedItem {
  id: number;
  user: string;
  message: string;
  timestamp: string;
}

// Dashboard Components
function Dashboard() {
  // Gather username from Local Storage
  const [userName, setUserName] = useState("Adesola");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUserName(storedUser);
    }
  }, []);

  // Notifications Hook
  const { addNotification } = useNotifications();

  // GROUP CREATION FEATURE
  const [groups, setGroups] = useState<Group[]>(groupData);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Form inputs for adding a new group
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupContributions, setNewGroupContributions] = useState("");
  const [newGroupPayout, setNewGroupPayout] = useState("");
  const [newGroupMembers, setNewGroupMembers] = useState("");

  // For “Contribute” inputs in each group
  const [contributionInputs, setContributionInputs] = useState<{
    [key: number]: string;
  }>({});

  // Polls Logic
  const [polls, setPolls] = useState<Poll[]>([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState("");

  // Goals & Achievement Logic
  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState("");
  const [achievements, setAchievements] = useState<string[]>([]);

  // CALENDAR AND TIMELINE FEATURE
  // Mock upcoming events: payouts, next contributions, and more
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: "Payout for Family Savings",
      date: "2025-02-10",
      description: "Adesola receives payout",
    },
    {
      id: 2,
      title: "Group Payment Deadline",
      date: "2025-02-15",
      description: "Monthly contribution for Travel Fund",
    },
    {
      id: 3,
      title: "Payout for Investment Club",
      date: "2025-03-01",
      description: "Kunle receives payout",
    },
  ]);

  // ACTIVITY FEED FEATURE
  // Simulate a mini chat/updates from the user or system
  const [feed, setFeed] = useState<FeedItem[]>([
    {
      id: 1,
      user: "System",
      message: "Welcome to Susu!",
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [feedInput, setFeedInput] = useState("");

  // EXPORT TO CSV FEATURE
  const handleExportCSV = () => {
    // combine certain data into CSV for simplicity since this is an MVP:
    // 1) Groups
    // 2) Polls
    // 3) Goals
    // 4) Feed items

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Groups:\n";
    csvContent += "ID,GroupName,TotalContributions,NextPayout,Members\n";
    groups.forEach((g) => {
      csvContent += `${g.id},${g.groupName},${g.totalContributions},${g.nextPayout},"${g.members.join(
        "|"
      )}"\n`;
    });

    csvContent += "\nPolls:\n";
    csvContent += "PollID,Question,OptionID,OptionText,Votes\n";
    polls.forEach((poll) => {
      poll.options.forEach((opt) => {
        csvContent += `${poll.id},${poll.question},${opt.id},${opt.text},${opt.votes}\n`;
      });
    });

    csvContent += "\nGoals:\n";
    csvContent += "GoalID,Title,Target,Current\n";
    goals.forEach((goal) => {
      csvContent += `${goal.id},${goal.title},${goal.target},${goal.current}\n`;
    });

    csvContent += "\nActivityFeed:\n";
    csvContent += "FeedID,User,Message,Timestamp\n";
    feed.forEach((f) => {
      csvContent += `${f.id},${f.user},${f.message},${f.timestamp}\n`;
    });

    // Create a link and download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SusuData.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CONTRIBUTIONS AND TOTALS FEATURE
  // Sum up total from groups
  const totalGroupContributions = groups.reduce(
    (sum, g) => sum + g.totalContributions,
    0
  );

  // Sum up total from personal goals
  const totalGoalContributions = goals.reduce(
    (sum, goal) => sum + goal.current,
    0
  );

  // Combined total across groups + personal goals
  const overallTotalContributions =
    totalGroupContributions + totalGoalContributions;


  // FILTER AND SORT GROUPS FEATURE
  const filteredGroups = useMemo(() => {
    // Start with all groups
    let tempGroups = [...groups];

    // Filter based on search term
    if (searchTerm.trim() !== "") {
      tempGroups = tempGroups.filter((group) =>
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort based on sortOption
    switch (sortOption) {
      case "name":
        tempGroups.sort((a, b) => a.groupName.localeCompare(b.groupName));
        break;
      case "payout":
        tempGroups.sort(
          (a, b) =>
            new Date(a.nextPayout).getTime() -
            new Date(b.nextPayout).getTime()
        );
        break;
      case "contributions":
        tempGroups.sort(
          (a, b) => b.totalContributions - a.totalContributions
        );
        break;
      default:
        break;
    }

    return tempGroups;
  }, [groups, searchTerm, sortOption]);

  
  // ALL GROUP FUNCTIONS
  // Add a new group
  const handleAddGroup = () => {
    if (!newGroupName.trim()) {
      addNotification("Group Name is required!", "error");
      return;
    }
    const membersArray = newGroupMembers
      ? newGroupMembers.split(",").map((m) => m.trim())
      : [];
    const contributions = Number(newGroupContributions) || 0;

    const newGroup: Group = {
      id: groups.length + 1,
      groupName: newGroupName,
      totalContributions: contributions,
      nextPayout: newGroupPayout || "TBD",
      members: membersArray.length > 0 ? membersArray : ["Unknown"],
    };

    setGroups((prev) => [...prev, newGroup]);
    setNewGroupName("");
    setNewGroupContributions("");
    setNewGroupPayout("");
    setNewGroupMembers("");
    addNotification(`New group "${newGroupName}" created!`, "success");

    // Also log to feed
    pushToFeed(`Created new group: ${newGroupName}`);
  };

  // Contribute to a group
  const handleContribute = (groupId: number) => {
    const amountString = contributionInputs[groupId] || "0";
    const amount = Number(amountString);

    if (isNaN(amount) || amount <= 0) {
      addNotification("Please enter a valid contribution amount!", "error");
      return;
    }

    // Update that group's total
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, totalContributions: g.totalContributions + amount }
          : g
      )
    );

    // Clear input
    setContributionInputs((prev) => ({ ...prev, [groupId]: "" }));
    addNotification(`Contributed $${amount} successfully!`, "success");
    pushToFeed(`Contributed $${amount} to group #${groupId}`);
  };

  // Handler for group contribution input
  const handleContributionInputChange = (
    groupId: number,
    value: string
  ) => {
    setContributionInputs((prev) => ({ ...prev, [groupId]: value }));
  };

  // POLL FUNCTIONS FEATURE
  const handleCreatePoll = () => {
    if (!pollQuestion.trim()) {
      addNotification("Please enter a poll question!", "error");
      return;
    }
    if (!pollOptions.trim()) {
      addNotification("Please provide at least one poll option!", "error");
      return;
    }

    const optionsArray = pollOptions
      .split(",")
      .map((opt) => opt.trim())
      .filter((opt) => opt.length > 0)
      .map((opt, idx) => ({
        id: idx + 1,
        text: opt,
        votes: 0,
      }));

    if (optionsArray.length === 0) {
      addNotification("No valid poll options found!", "error");
      return;
    }

    const newPoll: Poll = {
      id: polls.length + 1,
      question: pollQuestion,
      options: optionsArray,
    };

    setPolls((prev) => [...prev, newPoll]);
    setPollQuestion("");
    setPollOptions("");
    addNotification("New poll created!", "success");
    pushToFeed(`Created new poll: "${newPoll.question}"`);
  };

  const handleVote = (pollId: number, optionId: number) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id !== pollId) return poll;
        const updatedOptions = poll.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return { ...poll, options: updatedOptions };
      })
    );
    addNotification("Vote cast successfully!", "success");
    pushToFeed(`Voted on poll #${pollId}, option #${optionId}`);
  };

 
// GOALS AND ACHIEVEMENTS FEATURE
  const handleAddGoal = () => {
    if (!goalTitle.trim()) {
      addNotification("Please enter a goal title!", "error");
      return;
    }
    const targetValue = Number(goalTarget);
    if (isNaN(targetValue) || targetValue <= 0) {
      addNotification("Target must be a positive number!", "error");
      return;
    }

    const newGoal: Goal = {
      id: goals.length + 1,
      title: goalTitle,
      target: targetValue,
      current: 0,
    };

    setGoals((prev) => [...prev, newGoal]);
    setGoalTitle("");
    setGoalTarget("");
    addNotification(`New goal '${goalTitle}' created!`, "success");
    pushToFeed(`New personal goal: ${goalTitle}, target $${targetValue}`);
  };

  const handleContributeToGoal = (goalId: number, amount: number) => {
    if (amount <= 0) {
      addNotification("Contribution must be a positive number!", "error");
      return;
    }

    setGoals((prevGoals) =>
      prevGoals.map((goal) => {
        if (goal.id !== goalId) return goal;

        const updatedCurrent = goal.current + amount;
        const newlyUnlocked = checkAchievements(
          goal.title,
          updatedCurrent,
          goal.target
        );

        if (newlyUnlocked.length > 0) {
          setAchievements((prev) => [...prev, ...newlyUnlocked]);
          newlyUnlocked.forEach((ach) =>
            pushToFeed(`Unlocked achievement: ${ach}`)
          );
        }

        return { ...goal, current: updatedCurrent };
      })
    );

    addNotification(`Contributed $${amount} to goal!`, "success");
    pushToFeed(`Contributed $${amount} to personal goal #${goalId}`);
  };

  const handleRemoveGoal = (goalId: number) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    addNotification("Goal removed successfully.", "success");
    pushToFeed(`Removed goal #${goalId}`);
  };

  // Check for achievements
  function checkAchievements(
    goalTitle: string,
    currentAmount: number,
    targetAmount: number
  ): string[] {
    const unlocked: string[] = [];

    if (currentAmount >= 200 && !achievements.includes("Reached $200!")) {
      unlocked.push("Reached $200!");
    }

    const halfWay = targetAmount / 2;
    if (
      currentAmount >= halfWay &&
      !achievements.includes(`Halfway to ${goalTitle}!`)
    ) {
      unlocked.push(`Halfway to ${goalTitle}!`);
    }

    if (
      currentAmount >= targetAmount &&
      !achievements.includes(`Goal Reached: ${goalTitle}`)
    ) {
      unlocked.push(`Goal Reached: ${goalTitle}`);
    }

    return unlocked;
  }

  // ACTIVITY FEED FEATURE
  const handleAddFeedMessage = () => {
    if (!feedInput.trim()) {
      addNotification("Please type a message before sending!", "error");
      return;
    }
    const newItem: FeedItem = {
      id: feed.length + 1,
      user: userName || "Anonymous",
      message: feedInput,
      timestamp: new Date().toLocaleString(),
    };
    setFeed((prev) => [...prev, newItem]);
    setFeedInput("");
  };

  function pushToFeed(message: string) {
    // speedy system-like entry
    const newItem: FeedItem = {
      id: feed.length + 1,
      user: "System",
      message,
      timestamp: new Date().toLocaleString(),
    };
    setFeed((prev) => [...prev, newItem]);
  }

  // RENDERING
  return (
    <motion.div
      className="min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* HEADER */}
      <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="text-lg mt-2">
          Here’s an overview of your activity and progress.
        </p>
      </div>

      {/* TOP STATS: OVERALL CONTRIBUTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Overall Contributions (Groups + Goals) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">
            Total Contributions
          </h2>
          <p className="text-4xl font-bold text-gray-800">
            $
            {(
              /* sum of group total + personal goals */
              overallTotalContributions
            ).toLocaleString()}
          </p>
          <p className="text-gray-600 mt-2">
            This is your combined total across all groups <br />
            and personal goals.
          </p>
        </div>

        {/* Card 2: Active Groups */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">
            Active Groups
          </h2>
          <p className="text-4xl font-bold text-gray-800">{groups.length}</p>
          <p className="text-gray-600 mt-2">
            Groups you are currently a part of.
          </p>
        </div>

        {/* Card 3: Export CSV */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-teal-600 mb-2">
              Export Data
            </h2>
            <p className="text-gray-600 mt-2">
              Download your Susu data for record-keeping.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="bg-teal-600 text-white px-4 py-2 mt-4 rounded hover:bg-teal-700"
          >
            Export to CSV
          </button>
        </div>
      </div>

      {/* SORT & FILTER GROUPS */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row gap-4 items-center">
        {/* Filter by Group Name */}
        <input
          type="text"
          placeholder="Search by group name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        />

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">-- Sort By --</option>
          <option value="name">Group Name (A-Z)</option>
          <option value="payout">Next Payout (A-Z)</option>
          <option value="contributions">Contribution Amount (High-Low)</option>
        </select>
      </div>

      {/* ADD NEW GROUP */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add a New Group
        </h2>
        <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
          <input
            type="text"
            placeholder="Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Contribution (e.g. 2000)"
            value={newGroupContributions}
            onChange={(e) => setNewGroupContributions(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Next Payout Date (optional)"
            value={newGroupPayout}
            onChange={(e) => setNewGroupPayout(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <input
            type="text"
            placeholder="Members (comma-separated)"
            value={newGroupMembers}
            onChange={(e) => setNewGroupMembers(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <button
            onClick={handleAddGroup}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Add Group
          </button>
        </div>
      </div>

      {/* POLLS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Group Polls</h2>
        {/* Create Poll Form */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Poll Question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <input
            type="text"
            placeholder="Poll Options (comma-separated)"
            value={pollOptions}
            onChange={(e) => setPollOptions(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleCreatePoll}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Create Poll
          </button>
        </div>

        {/* Render Existing Polls */}
        {polls.map((poll) => (
          <div key={poll.id} className="bg-gray-100 p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-bold text-teal-600 mb-2">
              {poll.question}
            </h3>
            <ul>
              {poll.options.map((opt) => (
                <li
                  key={opt.id}
                  className="flex justify-between items-center mb-2"
                >
                  <span className="text-gray-700">{opt.text}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      Votes: {opt.votes}
                    </span>
                    <button
                      onClick={() => handleVote(poll.id, opt.id)}
                      className="bg-teal-500 text-white px-2 py-1 rounded hover:bg-teal-600"
                    >
                      Vote
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* GOALS & ACHIEVEMENTS SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your Personal Savings Goals
        </h2>
        {/* Create Goal Form */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Goal Title (e.g. 'New Laptop')"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <input
            type="number"
            placeholder="Target Amount (e.g. 500)"
            value={goalTarget}
            onChange={(e) => setGoalTarget(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full md:w-auto"
          />
          <button
            onClick={handleAddGoal}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            Add Goal
          </button>
        </div>

        {/* Render Goals */}
        {goals.map((goal) => {
          const percentage = Math.min(
            Math.round((goal.current / goal.target) * 100),
            100
          );
          return (
            <div
              key={goal.id}
              className="bg-gray-100 p-4 rounded-lg shadow mb-4"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-teal-600">
                  {goal.title}
                </h3>
                <button
                  onClick={() => handleRemoveGoal(goal.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <p className="text-gray-700">
                ${goal.current} / ${goal.target}
              </p>
              {/* Progress Bar */}
              <div className="w-full h-4 bg-gray-300 rounded mt-2 mb-2">
                <div
                  className="h-full bg-teal-500 rounded"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Contribute to goal */}
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Amount"
                  onKeyDown={(e) => {
                    // block invalid characters
                    if (
                      !/[0-9BackspaceArrowLeftArrowRight]/.test(e.key) &&
                      e.key.length === 1
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) =>
                    (e.target as HTMLInputElement).setAttribute(
                      "data-amount",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 p-2 rounded w-24"
                />
                <button
                  onClick={(e) => {
                    const input = (
                      e.currentTarget.parentElement?.querySelector(
                        'input[type="number"]'
                      ) as HTMLInputElement
                    )?.getAttribute("data-amount");
                    const parsed = Number(input) || 0;
                    handleContributeToGoal(goal.id, parsed);
                  }}
                  className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
                >
                  Contribute
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievements Section */}
      {achievements.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Achievements
          </h2>
          <ul className="space-y-2">
            {achievements.map((ach, i) => (
              <li
                key={i}
                className="bg-teal-50 p-2 rounded shadow-sm text-teal-700 font-semibold"
              >
                {ach}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CALENDAR / TIMELINE SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Upcoming Deadlines & Payouts
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Mock events to show how members can stay on top of their finances.
        </p>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Event</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {calendarEvents.map((evt) => (
              <tr key={evt.id} className="hover:bg-gray-50">
                <td className="p-2 border">{evt.date}</td>
                <td className="p-2 border text-teal-600 font-bold">
                  {evt.title}
                </td>
                <td className="p-2 border">{evt.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ACTIVITY FEED */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Feed</h2>
        <div className="max-h-64 overflow-y-auto mb-4 border rounded p-2">
          {feed.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-200 pb-2 mb-2 last:border-none last:pb-0 last:mb-0"
            >
              <div className="text-sm text-teal-700 font-semibold">
                {item.user} -{" "}
                <span className="text-gray-500 italic">{item.timestamp}</span>
              </div>
              <p className="text-gray-700">{item.message}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="border border-gray-300 rounded p-2 flex-1"
            placeholder="Share an update..."
            value={feedInput}
            onChange={(e) => setFeedInput(e.target.value)}
          />
          <button
            onClick={handleAddFeedMessage}
            className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
          >
            Post
          </button>
        </div>
      </div>

      {/* GROUP ACTIVITY SECTION */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Groups</h2>
        <ul className="space-y-4">
          {filteredGroups.map((group: Group) => { // Typed 'group' as 'Group'
            const groupContributionInput = contributionInputs[group.id] || "";
            return (
              <li
                key={group.id}
                className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <h3 className="text-lg font-bold text-teal-600">
                  Group: {group.groupName}
                </h3>
                <p className="text-gray-700">
                  Total Contributions: ${group.totalContributions}
                </p>
                <p className="text-gray-600">Next Payout: {group.nextPayout}</p>
                <p className="text-gray-600">
                  Members: {group.members.join(", ")}
                </p>

                {/* Contribution Simulation Controls */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    value={groupContributionInput}
                    onChange={(e) =>
                      handleContributionInputChange(group.id, e.target.value)
                    }
                    className="border border-gray-300 p-2 rounded w-32"
                  />
                  <button
                    onClick={() => handleContribute(group.id)}
                    className="bg-teal-500 text-white px-3 py-1 rounded hover:bg-teal-600"
                  >
                    Contribute
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

export default Dashboard;
