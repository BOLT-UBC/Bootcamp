import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import MultiSelect from '../components/MultiSelect';
import ShortText from '../components/ShortText';

export default function UserInfo() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("")
  const [pronouns, setPronouns] = useState<string>("")
  const [major, setMajor] = useState<string>("")

  const [selectedYear, setSelectedYear] = useState<string>()

  const years = [
    { value: "year-1", label: "Year 1" },
    { value: "year-2", label: "Year 2" },
    { value: "year-3", label: "Year 3" },
    { value: "year-4", label: "Year 4" },
  ]


  return (
    <>
      <h1>who r u lol</h1>
      <div style={{ padding: "20px", maxWidth: "300px", margin: "0 auto" }}>
        <MultiSelect
          value={selectedYear}
          onValueChange={setSelectedYear}
          label="Current Year of Study"
          options={years}
          placeholder="Select your year"
        />
      </div>

      <div>
        <h4>wassayname</h4>
        <ShortText value={name} onChange={(e) => setName(e.target.value)}></ShortText>
        <h4>what r ur pronouns</h4>
        <ShortText value={pronouns} onChange={(e) => setPronouns(e.target.value)}></ShortText>
        <h4>whats ur major</h4>
        <ShortText value={major} onChange={(e) => setMajor(e.target.value)}></ShortText>
      </div>
      
      <button onClick={() => navigate("/registration/responses")}>
        Save & Continue
      </button>
    </>
  );
}




