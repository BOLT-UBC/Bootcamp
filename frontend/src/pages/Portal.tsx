import React, { useState } from "react";
import PortalNavBar from "../components/portalNavBar";
import PortalPageSection from "../components/PortalPageSection";
import "../styles/Portal.css";
import { supabase } from "../supabase";
import Dashboard from "./Dashboard";
import FullFolder from "../components/Folder/FullFolder";
import SpaceBG from "../components/SpaceBG";
import PortalBg from "./assets/PortalBg.png";

export default function Portal() {
  const [activePage, setActivePage] = useState("Dashboard");
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign Out Error:", error);
    } else {
      console.log("User signed out successfully");
      window.location.href = "/";
    }
  };

  const navigationComponent = 
      <div className="navBar">
        <div className="my-portal">
          <h3>My Portal</h3>
          <nav className="links">
            <a
              className="link"
              onClick={() => setActivePage("Dashboard")}
              href="#dashboard"
            >
              Dashboard
            </a>
            <a
              className="link"
              onClick={() => setActivePage("My Team")}
              href="#my-team"
            >
              My Team
            </a>
          </nav>
        </div>
        <div className="general">
          <h3>General</h3>
          <nav className="links">
            <a
              className="link"
              onClick={() => setActivePage("Schedule")}
              href="#schedule"
            >
              Schedule
            </a>
            <a
              className="link"
              onClick={() => setActivePage("FAQ")}
              href="#faq"
            >
              FAQ
            </a>
          </nav>
        </div>
        <button className="logout" onClick={() => signOut()}>
          Log Out{" "}
        </button>
      </div>

  return (
    <>
      <div className="portal-page">
        <FullFolder portalTitle={activePage} navbarTitle={"Bootcamp"} navigationComponent={navigationComponent}>
          <Dashboard />
        </FullFolder>
        <img className="portal-background" src={PortalBg}></img>
        {/* <div className='portal-page'>
          
            <div className='page-right'>
              <Dashboard />
            </div>
        </div> */}
      </div>
    </>
  );
}
