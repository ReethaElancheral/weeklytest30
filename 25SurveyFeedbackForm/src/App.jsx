

import './App.css'
import React, { useState, useEffect } from "react";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Summary from "./components/Summary";

const totalSteps = 4;

export default function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });
  const [showAdmin, setShowAdmin] = useState(false);
  const [allFeedback, setAllFeedback] = useState(() => {
    const saved = localStorage.getItem("allSurveyData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("allSurveyData", JSON.stringify(allFeedback));
  }, [allFeedback]);

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const handleSubmit = () => {
  setAllFeedback([data, ...allFeedback]);
  alert("Thank you for your feedback!");
  setStep(1);
  setData({ name: "", email: "", rating: "", feedback: "" });
  setShowAdmin(true);  //
};

  const clearFeedback = () => {
    if (window.confirm("Are you sure to clear all feedback?")) {
      setAllFeedback([]);
    }
  };

  const progressPercent = (step / totalSteps) * 100;

  if (showAdmin) {
    return (
      <div className="container">
        <h1>Admin - Feedback Submissions</h1>
        <button className="toggle-btn" onClick={() => setShowAdmin(false)}>
          ← Back to Survey
        </button>
        {allFeedback.length === 0 ? (
          <p>No feedback submitted yet.</p>
        ) : (
          <div className="feedback-list">
            {allFeedback.map((fb, i) => (
              <div key={i} className="feedback-item">
                <p>
                  <strong>Name:</strong> {fb.name}
                </p>
                <p>
                  <strong>Email:</strong> {fb.email}
                </p>
                <p>
                  <strong>Rating:</strong> {fb.rating}
                </p>
                <p>
                  <strong>Feedback:</strong> {fb.feedback}
                </p>
                <hr />
              </div>
            ))}
            <button className="clear-btn" onClick={clearFeedback}>
              Clear All Feedback
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Customer Feedback Survey</h1>

      <button className="toggle-btn" onClick={() => setShowAdmin(true)}>
        View Feedback Submissions
      </button>

      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="step-indicator">
        Step {step} of {totalSteps}
      </div>

      {step === 1 && <Step1 data={data} onChange={handleChange} />}
      {step === 2 && <Step2 data={data} onChange={handleChange} />}
      {step === 3 && <Step3 data={data} onChange={handleChange} />}
      {step === 4 && <Summary data={data} />}

      <div className="buttons">
        {step > 1 && <button onClick={prevStep}>Back</button>}
        {step < totalSteps && (
          <button
            onClick={() => {
              if (
                (step === 1 && (!data.name.trim() || !data.email.trim())) ||
                (step === 2 && !data.rating) ||
                (step === 3 && !data.feedback.trim())
              ) {
                alert("Please fill in all required fields.");
                return;
              }
              nextStep();
            }}
          >
            Next
          </button>
        )}
        {step === totalSteps && <button onClick={handleSubmit}>Submit</button>}
      </div>
    </div>
  );
}
