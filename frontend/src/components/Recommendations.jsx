import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Recommendations = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [recommendedServiceNumbers, setRecommendedServiceNumbers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setRecommendedServiceNumbers([]);
    setError("");
    setShowRecommendations(false);
  };

  const handleViewRecommendations = async () => {
    if (!selectedFile) {
      setError("Please select a CSV file first.");
      return;
    }
    
    setLoading(true);
    setError("");

    // Create a FormData object to send the file to the backend.
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(`Error processing data: ${errData.error || "Unknown error"}`);
        setLoading(false);
        return;
      }

      const resData = await response.json();
      setRecommendedServiceNumbers(resData.recommended_services || []);
      setShowRecommendations(true);
    } catch (err) {
      setError(`An error occurred while processing the data: ${err.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 to-purple-600 text-white font-poppins">
      <Navbar />
      <div className="pt-20 flex flex-col items-center text-center px-5">
        <h1 className="text-5xl font-bold mb-5">Bank Service Recommender</h1>
        <h2 className="text-2xl mb-10">Upload your transaction file to get suggestions!</h2>

        <div className="mb-10 w-full max-w-5xl">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-3 p-2 rounded shadow-md"
          />
          <button
            onClick={handleViewRecommendations}
            className="px-5 py-3 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {loading ? "Processing..." : "Get Recommendations"}
          </button>
          {error && <p className="mt-2 text-red-300">{error}</p>}
        </div>

        {showRecommendations && recommendedServiceNumbers.length > 0 && (
          <div className="mt-5 w-full max-w-md p-4 bg-white text-black rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-center mb-3">Recommended Service Numbers</h3>
            <ul className="list-disc pl-5">
              {recommendedServiceNumbers.map((service, index) => (
                <li key={index} className="mb-2">
                  Service #{service}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
