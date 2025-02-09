import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LongText from "../components/LongText";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from "uuid";

import { Link } from "react-router-dom";

import ShortText from "../components/ShortText";

export default function Responses() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");
  const [caseCompCount, setCaseCompCount] = useState([]);

  useEffect(() => {
    if (!email) {
      const getUserEmail = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error.message);
        } else if (data?.user) {
          const userEmail = data.user.email ?? "user@example.com";
          setEmail(userEmail);
        }
      };
      getUserEmail();
    }
  }, [email]);

  const send = async () => {
    if (!email) {
      alert("No email found. Make sure you are signed in.");
      return;
    }
    try {
      const { data, error } = await supabase.from("responses").insert([
        {
          user_email: email,
          answer1: answer1,
          answer2: answer2,
          answer3: answer3,
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
          {/* Case Comp Count */}
          <label className="required-label">
            <b>How did you hear about this event?</b>
            <span className="required-text">*</span>
          </label>
          <div className="radio-group">
            {[
              "BOLT Website",
              "Facebook",
              "Instagram",
              "Instagram",
              "Word of Mouth",
              "Other",
            ].map((option) => (
              <label key={option} className="radio-label">
                <input type="radio" name="caseCompCount" value={option} />
                {option}
              </label>
            ))}
          </div>

          {/* Case Comp Count */}
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
                <input type="radio" name="caseCompCount" value={option} />
                {option}
              </label>
            ))}
          </div>

          {/* Roles */}
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
                <input type="checkbox" value={option} />
                {option}
              </label>
            ))}
          </div>

          <div className="button-row">
            <button onClick={() => navigate(-1)} className="back-button">
              Back
            </button>
            <button className="continue-button">Save & Continue</button>
          </div>
        </div>
      </div>

      {/* <button onClick={send}>Next</button> */}
    </div>
  );
}
