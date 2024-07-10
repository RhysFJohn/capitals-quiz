import React, { useState, useEffect } from "react";
import axios from "axios";

interface Option {
  text: string;
  correct: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

const QuizComponent = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get<Question>(
        "http://localhost:3001/question"
      );
      setQuestion(response.data);
      setSelectedOption(null);
      setFeedback("");
      setAnswered(false);
    } catch (err) {
      console.error("Error fetching question: ", err);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setFeedback(option.correct ? "Correct!" : "Incorrect!");
    setAnswered(true);
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="question">{question.question}</h2>
      <div className="options-container">
        {question.options &&
          question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              id="option"
              style={{
                backgroundColor:
                  answered && option.correct
                    ? "green"
                    : answered && selectedOption === option
                    ? "red"
                    : "",
              }}
              disabled={answered}
            >
              {option.text}
            </button>
          ))}
      </div>
      {feedback && (
        <div className="feedback-container">
          <p className="feedback">{feedback}</p>
          <button onClick={fetchQuestion} className="restart-button">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
