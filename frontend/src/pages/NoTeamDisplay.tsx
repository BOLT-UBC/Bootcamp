import React from "react";
import { useNavigate } from "react-router-dom";

import "./Team.css";

export default function NoTeamDisplay() {
    const navigate = useNavigate()

    return (
        <>
            <div>
                <h1>You are not in a team yet :(</h1>
                <div>
                    <button
                        onClick={() => navigate("/portal/join-team")}
                        className="back-button"> Join Team </button>

                    <button
                        onClick={() => navigate("/portal/create-team")}
                        className="back-button"> Create Team </button>
                </div>
            </div>
        </>
    );
}