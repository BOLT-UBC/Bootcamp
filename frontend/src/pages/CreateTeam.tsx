import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ShortText from '../components/ShortText';
import { supabase } from '../supabase';

export default function CreateTeam() {
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState<string>("");
  const [shortId, setId] = useState<string>("");
  const [madeTeam, setMadeTeam] = useState<boolean>(false);

  const generateShortId = (): string => {
    return Math.random().toString(36).substring(2, 6); // Ensures a 4-character string
  };

  // returns the id of the team if it exists, otherwise returns an empty string
  const checkIfTeamExists = async() => {
    const { data, error } = await supabase
        .from('teams')
        .select('id') 
        .eq('team_name', teamName)
        .limit(1); 
    
    if (error) {
        console.log("Error checking if team exists: ", error);
    } else if (data && data.length > 0) {
        return data[0].id
    } else {
        return ""
    }
  }

  const initializeTeamID = async () => {
    try {
        let id = await checkIfTeamExists()
    
        if (id.length > 0) {
            console.log("Team exists: ", id);
            setId(id)
        } else {
            console.log("Team does not exist.");
            setId(generateShortId());
        }
      } catch (err: any) {
        console.error("Error checking if team exists: ", err.message);
      }
  }

  useEffect(() => {
    initializeTeamID();
  }, []);

  const send = async () => {

    let id = await checkIfTeamExists()

    if (id.length > 0) {
        console.log("Team already exists, no changes made.");
        return; // Exit the function if the team already exists
    }

    initializeTeamID();

    try {
        const { data, error } = await supabase
            .from("teams")
            .upsert([{ 
                id: shortId,
                team_name: teamName
            }], { onConflict: 'team_name'})
            .select('*');
    
        if (error) throw error;
        console.log("Team saved:", data);
        setMadeTeam(true)
        setId(data[0].id)
        
    } catch (err: any) {
        console.error("Error creating team:", err.message);
    }
};


  return (
    <>
        <h1>Create a team</h1>
        <h4>Instructions: do this do that </h4>
        <div>
            <ShortText
            value={teamName} 
            onChange={(e) => setTeamName(e.target.value)} 
            placeholder="Create your team name" 
            />
            {!madeTeam && <button onClick={send}>
                Create
            </button>}
        
            {madeTeam && <p>Your team id is: {shortId}</p>}
        </div>
    
        <button onClick={() => navigate("/portal")}>
            Back to portal
        </button>

    </>
  );
}