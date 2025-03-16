import React, { useState } from "react";
import Navbar from "../components/Navbar";

const transactions = [
  { id: 1, date: "2024-03-01", description: "Grocery Store", amount: -50, type: "Debit" },
  { id: 2, date: "2024-03-03", description: "Salary Credit", amount: 2000, type: "Credit" },
  { id: 3, date: "2024-03-05", description: "Netflix Subscription", amount: -15, type: "Debit" },
  { id: 4, date: "2024-03-07", description: "Electricity Bill", amount: -80, type: "Debit" },
  { id: 5, date: "2024-03-10", description: "Dining Out", amount: -30, type: "Debit" },
];

const recommendations = [
  "You have multiple subscriptions. Consider switching to an annual plan for savings!",
  "Your last electricity bill was high. Would you like to set a monthly budget?",
  "Based on your salary, you may be eligible for a premium savings account.",
];

const Recommendations = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-poppins">
      <Navbar />
      
      {/* Page Content */}
      <div className="pt-20 flex flex-col items-center text-center px-5">
        <h1 className="text-5xl font-bold mb-5">Recommendations</h1>
        <h2 className="text-2xl mb-10">Here is your transaction history & insights!</h2>

        {/* Transaction History Table */}
        <div className="w-full max-w-5xl overflow-x-auto bg-white text-black rounded-lg p-5 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-3">Transaction History</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-3">Date</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Amount</th>
                <th className="border border-gray-300 p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="text-center">
                  <td className="border border-gray-300 p-3">{tx.date}</td>
                  <td className="border border-gray-300 p-3">{tx.description}</td>
                  <td className={`border border-gray-300 p-3 ${tx.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                    ${tx.amount.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-3">{tx.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Chatbot Section */}
        <div className="mt-10">
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="px-5 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {showChatbot ? "Hide Recommendations" : "View AI Recommendations"}
          </button>

          {showChatbot && (
            <div className="mt-5 w-full max-w-md p-4 bg-white text-black rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-center mb-3">💡 AI Insights</h3>
              <ul className="list-disc pl-5">
                {recommendations.map((rec, index) => (
                  <li key={index} className="mb-2">{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
