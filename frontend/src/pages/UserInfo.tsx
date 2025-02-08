import { useNavigate } from "react-router-dom";
import SpaceBG from "../components/SpaceBG";
import "./RegisterPage.css";

import React, { useState, useEffect } from "react";

import MultiSelect from "../components/MultiSelect";
import ShortText from "../components/ShortText";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";

export default function StartRegistration() {
  const navigate = useNavigate();
  const [intro, setIntro] = useState("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pronouns, setPronouns] = useState<string>("");
  const [otherPronouns, setOtherPronouns] = useState<string>("");
  const [school, setSchool] = useState<string>("");
  const [otherSchool, setOtherSchool] = useState<string>("");
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

  const universityOptions = [
    { value: "UBC", label: "UBC" },
    { value: "SFU", label: "SFU" },
    { value: "BCIT", label: "BCIT" },
    { value: "Other", label: "Other" },
  ];

  useEffect(() => {
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
  }, []);

  const saveUser = async () => {
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }

    const finalPronouns = pronouns === "Other" ? otherPronouns : pronouns;

    try {
      const { data, error } = await supabase.from("users").upsert(
        [
          {
            name,
            email,
            pronouns: finalPronouns,
            major,
            year: selectedYear ? parseInt(selectedYear) : null,
          },
        ],
        { onConflict: "email" }
      );

      if (error) throw error;
      console.log("User saved:", data);

      navigate("/registration/responses", { state: { email } });
    } catch (err: any) {
      console.error("Error saving user:", err.message);
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
          <h2 className="form-title">About You</h2>
          {/* Legal Name */}
          <label className="required-label">
            Legal First/Last Name<span className="required-text">*</span>
          </label>
          <ShortText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your legal name"
            need={true}
          />

          {/* Prefered Name */}
          <label className="required-label">
            Preferred Name<span className="required-text">*</span>
          </label>
          <ShortText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your legal name"
            need={true}
          />

          {/* Pronouns */}
          <label className="required-label">
            Pronouns<span className="required-text">*</span>
          </label>
          <MultiSelect
            value={pronouns}
            onValueChange={(value) => setPronouns(value || "")}
            options={pronounOptions}
            placeholder="Select your preferred pronouns"
          />
          {pronouns === "Other" && (
            <ShortText
              value={otherPronouns}
              onChange={(e) => setOtherPronouns(e.target.value)}
              placeholder="Specify your pronouns"
              need={true}
            />
          )}

          {/* Current School */}
          <label className="required-label">
            Current School<span className="required-text">*</span>
          </label>
          <MultiSelect
            value={pronouns}
            onValueChange={(value) => setSchool(value || "")}
            options={universityOptions}
            placeholder="Select your preferred pronouns"
          />
          {pronouns === "Other" && (
            <ShortText
              value={otherPronouns}
              onChange={(e) => setOtherSchool(e.target.value)}
              placeholder="Specify your pronouns"
              need={true}
            />
          )}

          {/* Year */}
          <label className="required-label">
            Year<span className="required-text">*</span>
          </label>
          <MultiSelect
            value={selectedYear || ""}
            onValueChange={(value) => setSelectedYear(value || null)}
            options={years}
            placeholder="Select your year"
          />

          {/* Major */}
          <label className="required-label">
            Major<span className="required-text">*</span>
          </label>
          <ShortText
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Enter your major"
            need={true}
          />
          <div className="button-row">
            <button onClick={() => navigate(-1)} className="back-button">
              Back
            </button>
            <button onClick={saveUser} className="continue-button">
              Save & Continue
            </button>
          </div>
        </div>
      </div>

      {/* SpaceBG Positioned at Bottom */}
      {/* <div className="planet">
        <SpaceBG />
      </div> */}
    </div>
  );
}
