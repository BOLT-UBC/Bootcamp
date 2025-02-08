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

  // const URL = import.meta.env.VITE_SUPABASE_URL;
  // const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // const supabase = createClient(URL, KEY);

  // console.log(URL)
  // console.log(KEY)

  // const send = async () => {
  //   if (!email) {
  //     alert("No email found. Make sure you are signed in.");
  //     return;
  //   }

  //   try {
  //     const { data, error } = await supabase
  //       .from("responses")
  //       .insert([
  //         { user_email: email, answer: `${answer1} | ${answer2} | ${answer3}` },
  //       ]);

  //     if (error) throw error;
  //     console.log("Responses saved:", data);

  //     navigate("/registration/thankyou");
  //   } catch (err: any) {
  //     console.error("Error saving responses:", err.message);
  //   }
  // };

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
          <ShortText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your legal name"
            need={true}
          />
          {/* Roles */}
          <label className="required-label">
            <b>
              What role(s) would you like to take on? [Select all that apply]
            </b>
            <span className="required-text">*</span>
          </label>
          <ShortText
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your legal name"
            need={true}
          />
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
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
            placeholder="Type your answer..."
          />

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
