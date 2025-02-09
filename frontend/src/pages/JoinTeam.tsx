import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '../supabase';
import ShortText from '../components/ShortText';

export default function JoinTeam() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("")
  const [error, setError] = useState<string>("")
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");

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

    // gets all teams
    const getTeams = async() => {
        const { data, error } = await supabase
            .from('teams')
            .select('*') 

        if (error) {
            console.log("couldn't get teams")
        } else if (data) {
            return data;
        }

    return null;
    }

    // returns true if team is full
    const checkFullness = async (team_id) => {
        const { data, error } = await supabase
            .from('users')
            .select('team_id') 

        if (error) {
            console.log("couldn't get users")
            return
        } 

        let count = 0;

        for (let i = 0; i < data?.length; i++) {
            if (data[i].team_id === team_id) count++;
        }

        return count >= 4;
    }

  const join = async () => {
    checkFullness("uuuu");
    if (id.length !== 4) {
        console.log("ID has to be length 4.")
        setError("ID has to be length 4.")
        return 
    }
    setError("")
    let data = await getTeams();
    if (data == null) {
        console.log("no teams created yet");
        return
    }
    for (let i = 0; i < data?.length; i++) {
        if (id === data[i].id) {
            // there is a team matching the ID that the user inputted
            const { data, error } = await supabase
                .from('users')
                .update({
                    team_id: id,
                })
                .eq('email', email);
            
            if (error) {
                console.log("Error occurred while trying to update this user.")
                setError("Couldn't join this team.")
            }
            
        }
    }
  }

  return (
    <>
        <h1>Join a team</h1>
        <h4>Enter your team ID below</h4>
        <ShortText
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Your Team ID"
            need={true}
        />
        {error.length > 0 ? <p>{error}</p> : null}
        <h4>Your team ID should have been shown when you created your team.</h4>
        <button onClick={join}>
            Join Team
        </button>
        <button onClick={() => navigate("/portal")}>
            Back to portal
        </button>
    </>
  );
}