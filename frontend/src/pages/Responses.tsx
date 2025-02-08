import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LongText from "../components/LongText";
import { supabase } from "../supabase";

export default function Responses() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");
  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");

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
      const { data, error } = await supabase
        .from("responses")
        .insert([
          { user_email: email, answer: `${answer1} | ${answer2} | ${answer3}` }
        ]);

      if (error) throw error;
      console.log("Responses saved:", data);

      navigate("/registration/thankyou");
    } catch (err: any) {
      console.error("Error saving responses:", err.message);
    }
  };

  return (
    <>
      <h1>Answer my little questions here...</h1>
      <div>
        <h4>Why do you wanna join this club?</h4>
        <LongText
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          placeholder="Type your answer..."
        />

        <h4>Why are you awesome?</h4>
        <LongText
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          placeholder="Type your answer..."
        />

        <h4>How much do you love Lebron James?</h4>
        <LongText
          value={answer3}
          onChange={(e) => setAnswer3(e.target.value)}
          placeholder="Type your answer..."
        />
      </div>
      <button onClick={send}>Next</button>
    </>
  );
}
