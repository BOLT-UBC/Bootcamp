import React, { useState } from "react";
import "./Team.css";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";


export default function NoTeamDisplay() {
    const [activePage, setActivePage] = useState("current");

    return (
        <>
            {activePage === "current" ? (
                <div className="team-page__no-team-wrapper">
                    <h1>You are not in a team yet :(</h1>
                    <div className="team-page__no-team__button_wrapper">
                        <button
                            onClick={() => setActivePage("join")}
                            className="back-button"> Join Team </button>

                        <button
                            onClick={() => setActivePage("create")}
                            className="back-button"> Create Team </button>
                    </div>
                </div>
            ) : activePage === "join" ? (
                <JoinTeam />
            ) : (
                <CreateTeam />
            )}
        </>
    );
}