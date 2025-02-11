import React, { useEffect, useState } from "react";
import { supabase } from '../supabase';
import PortalBoxWidget from "../components/PortalBoxWidget";
import "./Dashboard.css"
import { useNavigate } from "react-router-dom";

interface User {
    email: string;
    name: string;
    accepted: boolean;
    major: string;
    year: number;
    team_id: number;
}


export default function Dashboard() {
    
const navigate =     useNavigate();

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
            <div className="top1__welcome_container">
              <PortalBoxWidget>
                <div className="dashboard__welcome_widget">
                  <div>
                    <p className="dashboard__desc">Welcome, </p>
                    <h1 className="dashboard__username">
                      {name ? name : "Guest"}
                    </h1>
                  </div>
                  <div>
                    <p className="dashboard__desc"> Your status for registration is:</p>
                    <p className="dashboard__registration_status">Registered</p>
                  </div>
                </div>
              </PortalBoxWidget>
            </div>
            <div className="top2__team_container">
              <PortalBoxWidget
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "90%",
                }}
              >
                <h2 className="dashboard__widget_title">My Team</h2>
                {teamID ? (
                  <h1>
                    {team} #{teamID}
                  </h1>
                ) : (
                  <p className="dashboard__desc">You don't have a team!</p>
                )}
                {teammates && <h3>{teammates.join(", ")}</h3>}
              </PortalBoxWidget>
            </div>
            <div className="top3">
              <PortalBoxWidget>
                <h2 className="dashboard__widget_title">Task Timer</h2>
              </PortalBoxWidget>
            </div>
          </div>
          <div className="bot-row">
            <div className="bot1-wrapper">
              <div className="bot1-top">
                <PortalBoxWidget>
                  <div className="dashboard__case_package_widget">
                    <h2 className="dashboard__widget_title">Case Package</h2>
                    <h1 className="dashboard__desc dashboard__case_package_unavail">Unavailable</h1>
                  </div>
                </PortalBoxWidget>
              </div>
              <div className="bot1-bot">
                <PortalBoxWidget></PortalBoxWidget>
              </div>
            </div>
            <div className="bot2">
              <PortalBoxWidget></PortalBoxWidget>
            </div>
            <div className="bot3">
              <PortalBoxWidget>
                <h1>schedule</h1>
                <button className="redirect-button">View Schedule </button>
              </PortalBoxWidget>
            </div>
          </div>
        </div>
      </>
    );
}