import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from '../supabase';
import ShortText from '../components/ShortText';

export default function JoinTeam() {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const location = useLocation();
  const [email, setEmail] = useState<string>(location.state?.email || "");

  useEffect(() => {
      const storedEmail = localStorage.getItem("user_email");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        fetchUserEmail();
      }
    }, []);
  
const fetchUserEmail = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
    setEmail(data.user.email ?? "");
    localStorage.setItem("user_email", data.user.email ?? "");
    }
};


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
    if (email.length <= 0){
        console.log("You aren't sign in yet.");
        setMessage("You aren't sign in yet.");
        return 
    }

    let full = await checkFullness(id);

    if (full) {
        console.log("The team with the specified ID is full.");
        setMessage("The team with the specified ID is full.");
        return 
    }
    if (id.length !== 4) {
        console.log("ID has to be length 4.");
        setMessage("ID has to be length 4.");
        return 
    }
    setMessage("")
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
                console.log("Error occurred while trying to update this user.");
                setMessage("Couldn't join this team.");
                return
            }

            console.log("Team " + id + " successfully joined!");
            setMessage("Team " + id + " successfully joined!");
            
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
        {message.length > 0 ? <p>{message}</p> : null}
        <h4>Your team ID should have been shown when you created your team.</h4>
        <button onClick={join}>
            Join Team
        </button>
        <button onClick={() => navigate("/portal/team")}>
            Back to Team
        </button>
    </>
  );
}