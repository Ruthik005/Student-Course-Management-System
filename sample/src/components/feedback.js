import React, { useState } from 'react';
import Axios from 'axios';
import './feedback.css';

function Feedback() {
  const [feedback, setFeedback] = useState(Array(10).fill(null));

  const questions = [
    "How satisfied are you with the course content?",
    "How would you rate the clarity of the instructor's explanations?",
    "Did the course meet your expectations?",
    "How helpful were the provided learning materials?",
    "Were the assignments/projects relevant and beneficial to your learning?",
    "How satisfied are you with the pace of the course?",
    "How would you rate the accessibility and responsiveness of the instructor?",
    "Did the course effectively prepare you for assessments?",
    "How likely are you to recommend this course to others?",
    "Do you have any suggestions for improving the course?"
  ];

  const options = [
    ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"],
    ["Very clear", "Clear", "Somewhat clear", "Unclear"],
    ["Yes, it exceeded my expectations", "Yes, it met my expectations", "No, it fell short of my expectations", "No, it did not meet my expectations at all"],
    ["Very helpful", "Helpful", "Somewhat helpful", "Not helpful"],
    ["Highly relevant and beneficial", "Somewhat relevant and beneficial", "Neutral", "Not relevant or beneficial"],
    ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied"],
    ["Excellent", "Good", "Fair", "Poor"],
    ["Yes, very effectively", "Yes, to some extent", "No, not really", "No, not at all"],
    ["Very likely", "Likely", "Unlikely", "Very unlikely"],
    ["Yes", "No"]
  ];

  const handleOptionChange = (questionIndex, optionIndex) => {
    const newFeedback = [...feedback];
    newFeedback[questionIndex] = options[questionIndex][optionIndex];
    setFeedback(newFeedback);
  };

  const handleSubmit = async () => {
    try {
      const response = await Axios.post('http://localhost:5000/feedback', { feedback });
      if (response.status === 200) {
        alert("Feedback submitted successfully");
      } else {
        alert("Failed to submit feedback. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Feedback submitted successfully");
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form className="feedback-form">
        {questions.map((question, index) => (
          <div key={index} className="question">
            <p>{question}</p>
            <div className="options">
              {options[index].map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={feedback[index] === option}
                    onChange={() => handleOptionChange(index, optionIndex)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleSubmit}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
