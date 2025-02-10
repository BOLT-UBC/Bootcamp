import React, { useState } from "react";
import PortalNavBar from "../components/portalNavBar";
import PortalPageSection from "../components/PortalPageSection";
import "../styles/Portal.css";
import { supabase } from "../supabase";
import Dashboard from "./Dashboard";
import FullFolder from "../components/Folder/FullFolder";
import SpaceBG from "../components/SpaceBG";
import Team from "./Team";
import NoTeamDisplay from "./NoTeamDisplay";
import FAQ from "./sections/FAQ";
import Schedule from "./sections/Schedule";

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
      <div className="portal_page__navbar">
        <div className="navbar__my_portal_wrapper">
          <h3 className="navbar__section_title">My Portal</h3>
          <nav className="navbar__links">
            <a
              className="link"
              onClick={() => setActivePage("Dashboard")}
              href="#dashboard"
            >
              Dashboard
            </a>
            <a
              className="link link__last"
              onClick={() => setActivePage("Team")}
              href="#my-team"
            >
              My Team
            </a>
          </nav>
        </div>
        <div className="navbar__general_wrapper">
          <h3 className="navbar__section_title">General</h3>
          <nav className="navbar__links">
            <a
              className="link"
              onClick={() => setActivePage("Schedule")}
              href="#schedule"
            >
              Schedule
            </a>
            <a
              className="link link__last"
              onClick={() => setActivePage("FAQ")}
              href="#faq"
            >
              FAQ
            </a>
          </nav>
        </div>
        <button className="logout_button" onClick={() => signOut()}>
          Log Out{" "}
        </button>
      </div>

  return (
    <>
      <div className="portal-page">
        <FullFolder portalTitle={activePage} navbarTitle={"Bootcamp"} navigationComponent={navigationComponent}>
          {activePage === "Dashboard" && <Dashboard />}
          {activePage === "Team" && <Team />}
          {activePage === "FAQ" && <FAQ />}
          {activePage === "Schedule" && <Schedule />}
        </FullFolder>
        <img className="portal-background" src={"./assets/PortalBg.png"}></img>
      </div>
    </>
  );
}
