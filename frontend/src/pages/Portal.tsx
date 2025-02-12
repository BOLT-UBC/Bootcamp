import React, { useState, useEffect } from "react";
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
import GlowingDoggo from "../components/GlowingDoggo";
import PortalSchedule from "../components/PortalSchedule";
import FAQPortal from "./sections/FAQPortal";

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

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash.replace("#", "");
      console.log("Current hash:", currentHash); // Debugging line

      if (currentHash) {
        setActivePage(currentHash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navigationComponent = (
    <div className="portal_page__navbar">
      <GlowingDoggo />
      <div className="navbar__my_portal_wrapper">
        <h3 className="navbar__section_title">My Portal</h3>
        <nav className="navbar__links">
          <a className="link" href="#dashboard">
            Dashboard
          </a>
          <a className="link link__last" href="#my-team">
            My Team
          </a>
        </nav>
      </div>
      <div className="navbar__general_wrapper">
        <h3 className="navbar__section_title">General</h3>
        <nav className="navbar__links">
          <a className="link" href="#schedule">
            Schedule
          </a>
          <a className="link link__last" href="#faq">
            FAQ
          </a>
        </nav>
      </div>
      <button className="logout_button" onClick={() => signOut()}>
        Log Out{" "}
      </button>
    </div>
  );

  return (
    <>
      <div className="portal-page portal-bg">
        <div className="portal-bg">
          <FullFolder
            portalTitle={activePage}
            navbarTitle={"Bootcamp"}
            navigationComponent={navigationComponent}
          >
            {activePage === "dashboard" && <Dashboard />}
            {activePage === "my-team" && <Team />}
            {activePage === "faq" && <FAQPortal />}
            {activePage === "schedule" && <PortalSchedule />}
          </FullFolder>
        </div>
      </div>
    </>
  );
}
