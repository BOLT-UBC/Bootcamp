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
          fetchResponses(userEmail); // Fetch user data after getting the email
          console.log("Fetched User Email:", userEmail);
        }
      };
      getUserEmail();
    }
  }, [email]);

  const fetchResponses = async (userEmail: string) => {
    try {
      const { data, error } = await supabase
        .from("responses")
        .select("*")
        .eq("user_email", userEmail)
        .maybeSingle();

      if (error) {
        console.error("Error fetching responses:", error.message);
        return;
      }

      if (!data) {
        console.log("No previous responses found.");
        return;
      }

      setHear(data.how_heard || "");
      setPast(data.past_events || []);
      setEmailUpdates(data.email_updates || "");
    } catch (err: any) {
      console.error("Error retrieving responses:", err.message);
    }
  };

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
      const [
        { data: responsesData, error: responsesError },
        { data: usersData, error: usersError },
      ] = await Promise.all([
        supabase
          .from("responses")
          .update({
            how_heard: hear,
            past_events: past,
            email_updates: emailUpdates,
          })
          .eq("user_email", email),

        supabase.from("users").update({ registered: true }).eq("email", email),
      ]);

      if (responsesError) throw responsesError;
      if (usersError) throw usersError;

      console.log("Responses saved:", responsesData);
      console.log("User registered updated:", usersData);

      navigate("/registration/page-4");
    } catch (err: any) {
      console.error("Error saving responses:", err.message);
    }
  };

  return (
    <div className="container register-gradient">
      <div className="space-bg">
        <div className="register-content">
          <h1 className="register-title">Register</h1>
          <p className="register-subtitle">
            Already registered for Bootcamp? View your status in{" "}
            <Link to="/portal/#dashboard" className="portal-link">
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
                    className="radioInput"
                  />
                  <span className="radioButton"></span>
                  <span className="radioText">{option}</span>
                </label>
              ))}
            </div>

            {/* Which BOLT events have you attended in the past? */}
            <label className="required-label">
              <b>
                Which BOLT events have you attended in the past? [Select all
                that apply]
              </b>
              <span className="required-text">*</span>
            </label>
            <div className="checkboxGroup">
              {["FirstByte", "Bolt Connect", "Other"].map((option) => (
                <label key={option} className="checkboxLabel">
                  <input
                    type="checkbox"
                    value={option}
                    checked={past.includes(option)}
                    onChange={handlePastChange}
                    className="checkboxInput"
                  />
                  <span className="checkbox"></span>
                  <span className="checkboxText">{option}</span>
                </label>
              ))}
            </div>

            {/* Would you like to receive email updates? */}
            <label className="required-label">
              <b>
                Would you like to receive email updates about future BOLT
                events?
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
                    className="radioInput"
                  />
                  <span className="radioButton"></span>
                  <span className="radioText">{option}</span>
                </label>
              ))}
            </div>

            <div className="button-row">
              <button
                onClick={() => navigate("/registration/page-2")}
                className="back-button"
              >
                Back
              </button>
              <button onClick={send} className="continue-button">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
