import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import Lottie from "react-lottie"; // Import Lottie for confetti animation
import confettiAnimationData from "../../assets/lottie/confetti.json"; // Path to your confetti animation
import "./Flashcard.css";

// Helper function to shuffle an array
const shuffleArray = (array) => {
  return array
    .map((item) => ({ ...item, sortOrder: Math.random() }))
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(({ sortOrder, ...rest }) => rest);
};

const FlashcardProgress = () => {
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);
  const { subcategoryName, categoryName } = useParams();

  const [fileData, setFileData] = useState([]); // Parsed data (questions)
  const [completedIndices, setCompletedIndices] = useState([]); // Tracks completed indices
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current question
  const [showAnswer, setShowAnswer] = useState(false); // Toggles answer visibility
  const [subcategoryId, setSubcategoryId] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [shuffledDeck, setShuffledDeck] = useState([]); // The current shuffled deck of cards
  const [score, setScore] = useState(0); // Tracks the score (correctly answered cards)
  const [perfectScore, setPerfectScore] = useState(false); // Tracks if the user has scored full marks
  const [showConfetti, setShowConfetti] = useState(false); // Tracks if confetti animation should show

  // Fetch and parse the file
  const fetchFileFromSubcategory = async () => {
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

      const { fileUrl, subcategoryId } = response.data;

      if (fileUrl) {
        await fetchAndParseFile(fileUrl);
        if (subcategoryId) {
          setSubcategoryId(subcategoryId);
        } else {
          console.error("Subcategory ID not found in response.");
        }
      } else {
        console.error("No file URL found.");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  const fetchAndParseFile = async (fileUrl) => {
    try {
      const response = await axios.get(fileUrl, { responseType: "blob" });
      const contentType = response.headers["content-type"];

      if (contentType.includes("application/json")) {
        const textData = await response.data.text();
        setFileData(JSON.parse(textData));
      } else if (contentType.includes("text/csv")) {
        const textData = await response.data.text();
        Papa.parse(textData, {
          complete: (result) => {
            setFileData(
              result.data.filter((row) => row.question && row.answer)
            ); // Filter out empty rows
          },
          header: true,
        });
      } else {
        console.error("Unsupported file type:", contentType);
      }
    } catch (error) {
      console.error("Error fetching or parsing file:", error);
    }
  };

  // Shuffle the deck when file data is loaded
  useEffect(() => {
    if (fileData.length > 0) {
      setShuffledDeck(shuffleArray(fileData));
      setCurrentIndex(0); // Start at the first question
      setQuizCompleted(false); // Reset quiz completion status
      setScore(0); // Reset the score
      setPerfectScore(false); // Reset perfect score state
    }
  }, [fileData]);

  // Handle correct answer
  const handleCorrect = () => {
    if (!completedIndices.includes(currentIndex)) {
      updateProgress(currentIndex); // Save progress to backend
      setScore((prevScore) => prevScore + 1); // Increment the score
      setCompletedIndices((prev) => [...prev, currentIndex]); // Mark the card as completed
    }
    goToNextQuestion(); // Move to the next card
  };

  // Handle wrong answer (shuffle the card back)
  const handleWrong = () => {
    setShowAnswer(true); // Show the answer immediately on wrong answer
    goToNextQuestion(); // Move to the next card (no score increase)
  };

  // Update progress for a correct answer
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
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Show next question (shuffle if necessary)
  const goToNextQuestion = () => {
    setShowAnswer(false); // Hide the answer
    if (currentIndex < shuffledDeck.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next question
    } else {
      setQuizCompleted(true); // End the quiz when all cards are answered
      if (score === shuffledDeck.length) {
        setPerfectScore(true); // If the score is equal to the total number of questions, set perfect score
        setShowConfetti(true); // Trigger confetti animation
      }
    }
  };

  // Reset progress for the subcategory
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
      setScore(0);
      setShuffledDeck(shuffleArray(fileData));
      setCurrentIndex(0);
      setQuizCompleted(false);
      setPerfectScore(false);
      setShowConfetti(false); // Hide confetti when resetting
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  // During initial setup or whenever data changes
  useEffect(() => {
    fetchFileFromSubcategory();
  }, [categoryName, subcategoryName]);

  if (fileData.length === 0) {
    return <p>Loading questions...</p>;
  }

  const currentQuestion = shuffledDeck[currentIndex];

  return (
    <div className="mx-auto text-center flex flex-col mt-[10%]">
      {!quizCompleted ? (
        <>
          <h2 className="text-2xl font-semibold">{subcategoryName} Quiz</h2>

          {/* Flashcard UI */}
          <div className="flip-card mx-auto">
            <div
              className={`flip-card-inner ${showAnswer ? "rotate-y-180" : ""}`}
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {/* Front of the card */}
              <div className="flip-card-front">
                <p className="text-xl font-semibold">
                  {currentQuestion?.question}
                </p>
              </div>

              {/* Back of the card */}
              <div className="flip-card-back">
                <p className="text-xl font-semibold">
                  {currentQuestion?.answer}
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={handleCorrect}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Correct
            </button>
            <button
              onClick={handleWrong}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Wrong
            </button>
          </div>

          {/* Progress and Reset */}
          <div className="mt-6">
            <p>
              {score} / {shuffledDeck.length} Correct
            </p>
            <button
              onClick={resetProgress}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Reset Progress
            </button>
          </div>
        </>
      ) : (
        <div>
          <p>
            Quiz completed! Your final score is {score} / {shuffledDeck.length}.
          </p>

          {/* Confetti animation if perfect score */}
          {showConfetti && perfectScore && (
            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
              <Lottie
                options={{
                  loop: false,
                  autoplay: true,
                  animationData: confettiAnimationData,
                  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
                }}
                height={400}
                width={400}
              />
            </div>
          )}

          {/* Restart Quiz Button */}
          <button
            onClick={() => {
              resetProgress(); // Reset the quiz
              setQuizCompleted(false); // Set quiz to ongoing
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default FlashcardProgress;
