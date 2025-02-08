import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MultiSelect from '../components/MultiSelect';
import ShortText from '../components/ShortText';
import { supabase } from '../supabase';

export default function UserInfo() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  // Initialize email with an empty string (or a known default)
  const [email, setEmail] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");
  const [otherPronouns, setOtherPronouns] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = [
    { value: "1", label: "Year 1" },
    { value: "2", label: "Year 2" },
    { value: "3", label: "Year 3" },
    { value: "4", label: "Year 4" },
  ];

  const pronounOptions = [
    { value: "He/Him", label: "He/Him" },
    { value: "She/Her", label: "She/Her" },
    { value: "They/Them", label: "They/Them" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
    const getUserEmail = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (data?.user) {
        // If data.user.email is undefined, we fallback to a default email.
        const userEmail = data.user.email ?? "user@example.com";
        setEmail(userEmail);
      }
    };

    getUserEmail();
  }, []);

  const saveUser = async () => {
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }

    const finalPronouns = pronouns === "Other" ? otherPronouns : pronouns;

    try {
      const { data, error } = await supabase
        .from("users")
        .upsert([{ 
          name, 
          email, 
          pronouns: finalPronouns, 
          major, 
          year: selectedYear ? parseInt(selectedYear) : null 
        }], { onConflict: 'email' });

      if (error) throw error;
      console.log("User saved:", data);

      navigate("/registration/responses", { state: { email } });
    } catch (err: any) {
      console.error("Error saving user:", err.message);
    }
  };

  return (
    <>
      <h1>Who are you?</h1>

      <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
        <ShortText 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Enter your email" 
        />
        <ShortText 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your name" 
        />
        <MultiSelect 
          value={selectedYear || ""} 
          onValueChange={(value) => setSelectedYear(value || null)}
          label="Current Year of Study" 
          options={years} 
          placeholder="Select your year" 
        />
      </div>

      <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
        <MultiSelect 
          value={pronouns} 
          onValueChange={(value) => setPronouns(value || "")}
          label="Your Preferred Pronouns" 
          options={pronounOptions} 
          placeholder="Select your preferred pronouns" 
        />
        {pronouns === "Other" && (
          <ShortText 
            value={otherPronouns} 
            onChange={(e) => setOtherPronouns(e.target.value)} 
            placeholder="Specify your pronouns" 
          />
        )}
      </div>

      <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
        <h4>What's your major?</h4>
        <ShortText 
          value={major} 
          onChange={(e) => setMajor(e.target.value)} 
          placeholder="Enter your major" 
        />
      </div>
      
      <button onClick={saveUser}>Save & Continue</button>
    </>
  );
}
