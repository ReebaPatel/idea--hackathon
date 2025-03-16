import React, { useState } from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Papa from 'papaparse';  // For parsing CSV files

const FraudDetection = () => {
  const [transactions, setTransactions] = useState([]);
  const [results, setResults] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          setTransactions(result.data);  // Set the parsed transactions
          setCurrentIndex(0);  // Start from the first transaction
        },
      });
    }
  };

  // Check if a transaction is fraudulent
  const checkTransaction = async (transaction) => {
    try {
      const response = await fetch('http://192.168.1.100:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;  // { is_fraud: boolean, confidence: number }
    } catch (error) {
      console.error('Error checking transaction:', error);
      return { is_fraud: false, confidence: 99 };  // Fallback response
    }
  };

  // Process transactions one by one
  const processTransactions = async () => {
    if (currentIndex < transactions.length) {
      const transaction = transactions[currentIndex];
      const result = await checkTransaction(transaction);

      // Add the result to the results list
      setResults((prev) => [
        ...prev,
        { ...transaction, status: result.is_fraud ? 'Flagged' : 'Safe', confidence: result.confidence },
      ]);

      // Move to the next transaction
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Automatically process transactions every 2 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < transactions.length) {
        processTransactions();
      } else {
        clearInterval(interval);  // Stop when all transactions are processed
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex, transactions]);

  return (
    <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Fraud Detection with GenAI
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Upload a CSV file to analyze transactions in real-time.
          </p>
        </div>

        {/* File Upload */}
        <div className="mb-8">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        {/* Results Table */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Transaction Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {results.map((result, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {result.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      ${result.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {result.status === 'Flagged' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200">
                          <FaExclamationTriangle className="mr-1" /> Flagged
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                          <FaCheckCircle className="mr-1" /> Safe
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {result.confidence}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FraudDetection;