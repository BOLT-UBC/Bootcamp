import React, { useEffect, useState } from "react";
import { supabase } from '../supabase';
import PortalBoxWidget from "../components/PortalBoxWidget";
import "./Dashboard.css"

interface User {
    email: string;
    name: string;
    accepted: boolean;
    major: string;
    year: number;
    team_id: number;
}


export default function Dashboard() {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [team, setTeam] = useState<string>("");
    const [teamID, setTeamID] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [teammates, setTeammates] = useState<string[]>([]);

    useEffect(() => {
    const storedEmail = localStorage.getItem("user_email");
    if (storedEmail) {
        setEmail(storedEmail);
        fetchUserData(storedEmail);
    } else {
        fetchUserEmail();
    }
    }, []);

    const fetchUserEmail = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          setEmail(data.user.email ?? "");
          localStorage.setItem("user_email", data.user.email ?? "");
          fetchUserData(data.user.email ?? "");
        }
      };
    
    const fetchUserData = async (userEmail: string) => {
    try {
        const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", userEmail)
        .maybeSingle();

        const { data : teamData, error: teamError } = await supabase
        .from("teams")
        .select("*") 
        .eq("id", userData.team_id)
        .maybeSingle();

        const { data : teammates, error: teammateError } = await supabase
        .from("users")
        .select("*") 
        .eq("team_id", userData.team_id); 


        if (userError) {
        console.error("Error fetching responses:", userError.message);
        return;
        }

        if (teamError) {
        console.error("Error fetching responses:", teamError.message);
        return;
        }
        
        if (!userData) {
        console.log("No previous responses found.");
        return;
        }

        setName(userData.preferred_name || "");
        setTeam(teamData.team_name || "");
        setMajor(userData.major || "");
        setTeamID(userData.team_id || "");
        setYear(userData.year || "");
        let arr: string[] = teammates ? teammates.map((team) => team.name) : [];
        setTeammates(arr);

    } catch (err: any) {
        console.error("Error retrieving responses:", err.message);
    }
    };

    return (
        <>
            <div className="dashboard-wrapper">
                <div className="top-row">   
                    <div className="top1">
                        <PortalBoxWidget>
                            <h1>welcome, {name}</h1>
                            <h3>Year {year} | {major}</h3>
                            <hr />
                            <h3>your status for registration is:</h3>
                            <h1>REGISTERED</h1>
                        </PortalBoxWidget>
                    </div>
                    <div className="top2">
                        <PortalBoxWidget>
                            <h2>My Team</h2>
                            <h1>{team} #{teamID}</h1>
                            <h3>{teammates.join(", ")}</h3>
                        </PortalBoxWidget>
                    </div>
                    <div className="top3">
                        <PortalBoxWidget>
                            <h2>Task Timer</h2>
                        </PortalBoxWidget>
                    </div>
                </div>
                <div className="bot-row">
                    <div className="bot1-wrapper">
                        <div className="bot1-top">
                            <PortalBoxWidget>
                                <h1>case package</h1>
                                <h3>unavailable</h3>
                            </PortalBoxWidget>
                        </div>
                        <div className="bot1-bot">
                        <PortalBoxWidget>
                        </PortalBoxWidget>
                        </div>
                    </div>
                    <div className="bot2">
                        <PortalBoxWidget>
                        </PortalBoxWidget>
                    </div>
                    <div className="bot3">
                        <PortalBoxWidget>
                            <h1>schedule</h1>
                        </PortalBoxWidget>
                    </div>
                </div>
            </div>
        </>
     
    )
}