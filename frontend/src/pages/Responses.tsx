import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LongText from "../components/LongText";
import { supabase } from "../supabase";
import { v4 as uuidv4 } from 'uuid';

export default function Responses() {
  const navigate = useNavigate();
  const [answer1, setAnswer1] = useState<string>("")
  const [answer2, setAnswer2] = useState<string>("")
  const [answer3, setAnswer3] = useState<string>("")

  // const URL = import.meta.env.VITE_SUPABASE_URL;
  // const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // const supabase = createClient(URL, KEY);

  // console.log(URL)
  // console.log(KEY)

  const send = async () => {
    // const { data, error } = await supabase.from("responses").insert([
    //   { user_email: "developer@boltubc.com", answer1, answer2, answer3 }
    // ]);
  
    // if (error) {
    //   console.error("Error inserting data:", error.message);
    // } else {
    //   console.log("Data inserted successfully:", data);
    // }

    navigate("/registration/thank you");
  }

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
