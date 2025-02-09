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

interface Team {
    
}

export default function Dashboard() {
    return (
        <>
            <div className="dashboard-wrapper">
                <div className="top-row">   
                    <div className="top1">
                        <PortalBoxWidget>
                        </PortalBoxWidget>
                    </div>
                    <div className="top2">
                        <PortalBoxWidget>
                        </PortalBoxWidget>
                    </div>
                    <div className="top3">
                        <PortalBoxWidget>
                        </PortalBoxWidget>
                    </div>
                </div>
                <div className="bot-row">
                    <div className="bot1-wrapper">
                        <div className="bot1-top">
                            <PortalBoxWidget>
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
                        </PortalBoxWidget>
                    </div>
                </div>
            </div>
        </>
     
    )
}