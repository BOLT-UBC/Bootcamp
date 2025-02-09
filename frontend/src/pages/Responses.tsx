import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LongText from "../components/LongText";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

import ShortText from "../components/ShortText";

export default function Responses() {
  const navigate = useNavigate();
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");
  const [compCount, setCompCount] = useState<string>("");
  const [roles, setRoles] = useState<string[]>([]);
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      fetchUserEmail();
    }
  }, []);

  const fetchUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      setEmail(data.user.email ?? "");
      localStorage.setItem("user_email", data.user.email ?? "");
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setRoles((prevRoles) => {
      const updatedRoles = prevRoles.includes(value)
        ? prevRoles.filter((role) => role !== value) // Remove role if already selected
        : [...prevRoles, value]; // Add role if not selected
      return updatedRoles;
    });
  };

  const handleEventChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.includes(value)
        ? prevEvents.filter((event) => event !== value) // Remove role if already selected
        : [...prevEvents, value]; // Add role if not selected

      console.log(updatedEvents);
      return updatedEvents;
    });
  };

  const send = async () => {
    if (!email) {
      alert("No email found. Make sure you are signed in.");
      return;
    }

    if (!compCount) {
      alert("Please select how many case competitions you've attended.");
      return;
    }
  
    if (roles.length === 0) {
      alert("Please select at least one role.");
      return;
    }
  
    if (events.length === 0) {
      alert("Please select at least one event.");
      return;
    }
  
    try {
      const { data, error } = await supabase.from("responses").insert([
        {
          user_email: email,
          case_comp_count: parseInt(compCount), 
          roles, 
          answer1,
          answer2,
          answer3,
          events_attending: events,
        },
      ]);

      if (error) throw error;
      console.log("Responses saved:", data);

      navigate("/registration/thankyou");
    } catch (err: any) {
      console.error("Error saving responses:", err.message);
    }
  };

  return (
    <div className="container register-gradient">
      <div className="register-content">
        <h1 className="register-title">Register</h1>
        <p className="register-subtitle">
          Already registered for Bootcamp? View your status in{" "}
          <Link to="/portal" className="portal-link">
            your portal
          </Link>{" "}
          !
        </p>

        <div className="register-form">
          <h2 className="form-title">Your Bootcamp</h2>
          {/* Case Comp Count */}
          <label className="required-label">
            <b>How many case competitions have you been to before?</b>
            <span className="required-text">*</span>
          </label>
          <div className="radio-group">
            {["0", "1", "2", "3", "4", "5+"].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="caseCompCount"
                  value={option}
                  checked={compCount === option}
                  onChange={(e) => {
                    setCompCount(e.target.value);
                    console.log(
                      "Selected Case Competition Count:",
                      e.target.value
                    );
                  }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Roles */}
          <label className="required-label">
            <b>
              What role(s) would you like to take on? [Select all that apply]
            </b>
            <span className="required-text">*</span>
          </label>
          <div className="checkbox-group">
            {["Project Manager", "Business Analyst", "Data Analyst"].map(
              (option) => (
                <label key={option} className="checkbox-label">
                  <input
                    type="checkbox"
                    value={option}
                    checked={roles.includes(option)}
                    onChange={handleRoleChange}
                  />
                  {option}
                </label>
              )
            )}
          </div>

          {/* Tell about */}
          <label className="required-label">
            <b>
              Tell us a little about yourself! What are your interests,
              experiences, or passions that you'd like to share with us?
            </b>
            <span className="required-text">*</span>
          </label>
          <LongText
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            placeholder="Type your answer..."
          />

          {/* Tell about */}
          <label className="required-label">
            <b>What are you hoping to get out of Bootcamp?</b>
            <span className="required-text">*</span>
          </label>
          <LongText
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
            placeholder="Type your answer..."
          />

          {/* Roles */}
          <label className="required-label">
            <b>
              We will be holding multiple events prior to the final day, which
              events will you be attending? [Select all apply]
            </b>
            <span className="required-text">*</span>
          </label>
          <div className="checkbox-group">
            {[
              "March 1st  (Case Workshop + Networking Session)",
              "March 4th (Online Workshop)",
              "March 8th (Finals Presentations)",
            ].map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={events.includes(option)}
                  onChange={handleEventChange}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Tell about */}
          <label className="required-label">
            <b>What are you expecting to learn in the workshops? (optional)</b>
          </label>
          <LongText
            value={answer3}
            onChange={(e) => setAnswer3(e.target.value)}
            placeholder="Type your answer..."
          />

          <div className="button-row">
            <button onClick={() => navigate(-1)} className="back-button">
              Back
            </button>
            <button onClick={send} className="continue-button">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
