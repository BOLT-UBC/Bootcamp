import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function Responses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");
  const [hear, setHear] = useState<string>("");
  const [emailUpdates, setEmailUpdates] = useState<string>("");
  const [past, setPast] = useState<string[]>([]);

  useEffect(() => {
    if (!email) {
      const getUserEmail = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
        } else if (data?.user) {
          const userEmail = data.user.email ?? "user@example.com";
          setEmail(userEmail);
          console.log("Fetched User Email:", userEmail);
        }
      };
      getUserEmail();
    }
  }, [email]);

  // Handle radio change (How did you hear about this event?)
  const handleHearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHear(event.target.value);
  };

  // Handle checkbox changes for past events
  const handlePastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPast((prevPast) => {
      const updatedPast = prevPast.includes(value)
        ? prevPast.filter((p) => p !== value) // Remove if already selected
        : [...prevPast, value]; // Add if not selected

      return updatedPast;
    });
  };

  // Handle radio change (Would you like to receive email updates?)
  const handleEmailUpdatesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailUpdates(event.target.value);
  };

  const send = async () => {
    if (!email) {
      alert("No email found. Make sure you are signed in.");
      return;
    }
    try {
      const { data, error } = await supabase.from("responses").insert([
        {
          user_email: email,
          how_heard: hear,
          past_events: past,
          email_updates: emailUpdates,
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
          <h2 className="form-title">Final Step</h2>

          {/* How did you hear about this event? */}
          <label className="required-label">
            <b>How did you hear about this event?</b>
            <span className="required-text">*</span>
          </label>
          <div className="radio-group">
            {[
              "BOLT Website",
              "Facebook",
              "Instagram",
              "Word of Mouth",
              "Other",
            ].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="hear"
                  value={option}
                  checked={hear === option}
                  onChange={handleHearChange}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Which BOLT events have you attended in the past? */}
          <label className="required-label">
            <b>
              Which BOLT events have you attended in the past? [Select all that
              apply]
            </b>
            <span className="required-text">*</span>
          </label>
          <div className="checkbox-group">
            {["FirstByte", "Bolt Connect", "Other"].map((option) => (
              <label key={option} className="checkbox-label">
                <input
                  type="checkbox"
                  value={option}
                  checked={past.includes(option)}
                  onChange={handlePastChange}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Would you like to receive email updates? */}
          <label className="required-label">
            <b>
              Would you like to receive email updates about future BOLT events?
            </b>
            <span className="required-text">*</span>
          </label>
          <div className="radio-group">
            {[
              "Yes, sign me up!",
              "I've already signed up!",
              "Maybe next time.",
            ].map((option) => (
              <label key={option} className="radio-label">
                <input
                  type="radio"
                  name="emailUpdates"
                  value={option}
                  checked={emailUpdates === option}
                  onChange={handleEmailUpdatesChange}
                />
                {option}
              </label>
            ))}
          </div>

          <div className="button-row">
            <button onClick={() => navigate(-1)} className="back-button">
              Back
            </button>
            <button onClick={send} className="continue-button">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
