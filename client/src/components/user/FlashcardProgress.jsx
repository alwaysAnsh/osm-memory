import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Modal from "./InstructionsModal"; // Import the Modal component
import "./Flashcard.css"; // Import the CSS file

const FlashcardProgress = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { subcategoryName, categoryName } = useParams();

  const [fileData, setFileData] = useState([]);
  const [completedIndices, setCompletedIndices] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showModal, setShowModal] = useState(true); // State to manage modal visibility

  const fetchFileFromSubcategory = async (categoryName, subcategoryName) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/get-fileurlBySubcategoryName`,
        { categoryName, subcategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.fileUrl) {
        await fetchAndParseFile(response.data.fileUrl);
        if (response.data.subcategoryId) {
          setSubcategoryId(response.data.subcategoryId);
        }
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const fetchAndParseFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" });

      const textData = await response.data.text();
      const fileType = response.data.type;

      if (fileType.includes("json")) {
        setFileData(JSON.parse(textData));
      } else if (fileType.includes("csv")) {
        Papa.parse(textData, {
          complete: (result) => setFileData(result.data),
          header: true,
        });
      }
    } catch (error) {
      console.error(`Error parsing file:`, error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/progress/${
          user._id
        }/${subcategoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedIndices(response.data.completedIndices || []);
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const updateProgress = async (index) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/progress/${
          user._id
        }/${subcategoryId}`,
        { index },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedIndices((prev) => [...prev, index]);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleCorrect = () => {
    if (!completedIndices.includes(currentIndex)) {
      updateProgress(currentIndex);
    }
    goToNextQuestion();
  };

  const handleWrong = () => {
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    let nextIndex = currentIndex + 1;

    while (
      completedIndices.includes(nextIndex) &&
      nextIndex < fileData.length
    ) {
      nextIndex++;
    }

    if (nextIndex < fileData.length) {
      setCurrentIndex(nextIndex);
      setShowAnswer(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetProgress = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v2/progress/${
          user._id
        }/${subcategoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCompletedIndices([]);
      setCurrentIndex(0);
      setQuizCompleted(false);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  useEffect(() => {
    if (completedIndices.includes(currentIndex)) {
      goToNextQuestion();
    }
  }, [completedIndices, currentIndex]);

  useEffect(() => {
    fetchFileFromSubcategory(categoryName, subcategoryName);
  }, [categoryName, subcategoryName]);

  useEffect(() => {
    if (subcategoryId) fetchProgress();
  }, [subcategoryId]);

  if (fileData.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-xl font-bold mb-4">Quiz Instructions</h2>
        <ul className="list-disc pl-4 text-sm">
          <li>Read each question carefully.</li>
          <li>Click "Show Answer" to reveal the answer.</li>
          <li>Mark the question as correct or wrong.</li>
          <li>You can reset progress at any time.</li>
        </ul>
        <button
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
          onClick={() => setShowModal(false)}
        >
          Got It!
        </button>
      </Modal>

      <div className="flashcard-container text-center text-black">
        {!quizCompleted ? (
          <>
            <h2 className="text-xl font-bold text-white mb-6">
              {subcategoryName} Quiz
            </h2>
            <div className="flip-card mx-auto my-4">
              <div className={`flip-card-inner ${showAnswer ? "flip" : ""}`}>
                <div className="flip-card-front">
                  <p className="question-text">
                    Question: {fileData[currentIndex]?.question}
                  </p>
                </div>
                <div className="flip-card-back">
                  <p className="answer-text">
                    Answer: {fileData[currentIndex]?.answer}
                  </p>
                </div>
              </div>
            </div>
            <div className="controls flex gap-4 justify-center mt-4">
              <button onClick={handleCorrect} className="correct-btn">
                Correct
              </button>
              <button onClick={handleWrong} className="wrong-btn">
                Wrong
              </button>
              <button
                onClick={() => setShowAnswer(true)}
                className="show-answer-btn"
              >
                Show Answer
              </button>
            </div>
          </>
        ) : (
          <div>
            <p className="completed-message">Quiz Completed!</p>
            <button onClick={resetProgress} className="reset-btn">
              Reset Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardProgress;
