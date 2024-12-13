import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Papa from "papaparse";

const FlashcardProgress = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const { subcategoryName } = useParams();
  const { categoryName } = useParams();

  const [fileData, setFileData] = useState([]); // Parsed data (questions)
  const [completedIndices, setCompletedIndices] = useState([]); // Tracks completed indices
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current question
  const [showAnswer, setShowAnswer] = useState(false); // Toggles answer visibility
  const [subcategoryId, setSubcategoryId] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch and parse the file
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
        await fetchAndParseFile(response.data.fileUrl, subcategoryName);

        if (response.data.subcategoryId) {
          setSubcategoryId(response.data.subcategoryId);
        } else {
          console.error("Subcategory ID not found in response.");
        }
      } else {
        console.log("No file data found. File is empty");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const fetchAndParseFile = async (fileUrl, subcategoryName) => {
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob",
      });

      if (response.data.type === "application/json") {
        const textData = await response.data.text();
        const jsonData = JSON.parse(textData);
        setFileData(jsonData);
      } else if (response.data.type === "text/csv") {
        const textData = await response.data.text();
        Papa.parse(textData, {
          complete: (result) => {
            setFileData(result.data);
          },
          header: true,
        });
      } else {
        console.error("Unsupported file type:", response.data.type);
      }
    } catch (error) {
      console.error(`Error fetching or parsing file from ${fileUrl}:`, error);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/progress/${
          user._id
        }/${subcategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
  }, [completedIndices, currentIndex, fileData]);

  useEffect(() => {
    fetchFileFromSubcategory(categoryName, subcategoryName);
  }, [categoryName, subcategoryName]);

  useEffect(() => {
    if (subcategoryId) fetchProgress();
  }, [subcategoryId]);

  const currentQuestion = fileData[currentIndex];

  if (fileData.length === 0) {
    return <p>Loading questions...</p>;
  }

  return (
    <div className="mx-auto text-center flex flex-col mt-[10%]">
      <div className="flashcard-container mx-auto bg-white shadow-lg rounded-lg p-6 text-black max-w-md">
        {!quizCompleted ? (
          <>
            <h2 className="text-xl font-bold">{subcategoryName} Quiz</h2>
            <p className="question-text my-4 text-lg">
              <strong>Question:</strong> {currentQuestion?.question}
            </p>
            {showAnswer && (
              <p className="answer-text my-4 bg-gray-100 p-2 rounded">
                <strong>Answer:</strong> {currentQuestion?.answer}
              </p>
            )}
            <div className="controls flex gap-4 justify-center mt-4">
              <button
                onClick={() => handleCorrect(currentIndex)}
                className="correct-btn rounded-lg bg-green-500 text-white px-4 py-2"
              >
                Correct
              </button>
              <button
                onClick={handleWrong}
                className="rounded-lg bg-red-500 text-white px-4 py-2"
              >
                Wrong
              </button>
              <button
                onClick={() => setShowAnswer((prev) => !prev)}
                className="rounded-lg bg-blue-500 text-white px-4 py-2"
              >
                Show Answer
              </button>
            </div>
          </>
        ) : (
          <p className="text-lg font-bold text-green-600">Quiz Completed!</p>
        )}
      </div>
      {quizCompleted && (
        <button
          onClick={resetProgress}
          className="reset-btn mx-auto mt-4 rounded-lg bg-yellow-500 text-white px-4 py-2"
        >
          Reset Progress
        </button>
      )}
    </div>
  );
};

export default FlashcardProgress;
