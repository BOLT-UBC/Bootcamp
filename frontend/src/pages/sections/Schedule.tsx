import React from "react";
import "./Schedule.css";
import "../LandingPage.css";
import CompleteSchedule from "../../components/ScheduleFolder/CompleteSchedule";

export default function About() {
  return (
    <div className="schedule-background">
      <CompleteSchedule
        portalTitle={"BOOTCAMP ADVENTURE MAP"}
        navbarTitle={"BOOTCAMP OVERVIEW"}
      ></CompleteSchedule>
    </div>
  );
}
