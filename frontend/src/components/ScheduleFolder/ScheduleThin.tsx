import React from "react";
import "./ScheduleThin.css";
import { JSX } from "react";

type ScheduleThinProps = {
  navbarTitle?: string;
};

const ScheduleThin: React.FC<ScheduleThinProps> = ({ navbarTitle }) => {
  const scheduleMap: Record<
    string,
    { date: string; events: string[]; description?: string }[]
  > = {
    Overview: [
      {
        date: "Monday, February 10, 2025",
        events: ["12:00 PM – Registration Opens"],
      },
      {
        date: "Monday, February 24, 2025",
        events: ["11:59 PM – Registration Closes"],
      },
      {
        date: "Wednesday, February 26, 2025",
        events: ["5:00 PM – Case Release"],
      },
      {
        date: "Saturday, March 1, 2025",
        events: ["12:00 PM – Offline Workshop", "1:30 PM – Networking Event"],
      },
      {
        date: "Tuesday, March 4, 2025",
        events: ["TBD – Online Presentation Workshop"],
      },
      {
        date: "Wednesday, March 5, 2025",
        events: [
          "12:00 PM (Noon) – Submission Deadline",
          "6:00 PM – Finalist Announcement",
        ],
      },
      {
        date: "Thursday, March 6, 2025",
        events: ["TBD – Office Tour (Tentative)"],
      },
      {
        date: "Saturday, March 8, 2025",
        events: ["12:00 PM – Final Presentations @ Sauder, UBC"],
      },
    ],
    "Day 1": [
      {
        date: "Saturday, March 1, 2025",
        description:
          "A day dedicated to workshops and networking with industry professionals.",
        events: [
          "12:00 PM – Offline Workshop | Hands-on session to strengthen problem-solving and case presentation skills.",
          "1:30 PM – Networking Event (In collaboration with USS, WiDS, and WiCS) | Connect with industry professionals and expand your network. (Paid event)",
        ],
      },
    ],
    "Day 2": [
      {
        date: "Tuesday, March 4, 2025",
        description:
          "An online workshop focused on refining presentation skills.",
        events: [
          "TBD – Online Presentation Workshop | Learn how to structure and deliver an impactful case presentation.",
        ],
      },
    ],
    "Day 3": [
      {
        date: "Wednesday, March 5, 2025",
        description: "Submission deadline and finalist announcement.",
        events: [
          "12:00 PM (Noon) – Submission Deadline | Final deadline to submit your case solutions.",
          "6:00 PM – Finalist Announcement | Selected teams will be notified via email and the BOLT UBC website.",
        ],
      },
    ],
    "Day 4": [
      {
        date: "Thursday, March 6, 2025",
        description:
          "A potential opportunity to visit a corporate office and engage with professionals.",
        events: ["TBD – Office Tour (Tentative)"],
      },
    ],
    Finale: [
      {
        date: "Saturday, March 8, 2025",
        description: "Final presentations and the announcement of winners.",
        events: [
          "12:00 PM – Final Presentations @ Sauder, UBC | Finalist teams present their case solutions to a panel of industry judges.",
        ],
      },
    ],
  };

  // Default to "Overview" if the title isn't recognized
  const scheduleItems = scheduleMap[navbarTitle || "Overview"] || [];
  return (
    <>
      <div className="folder-thin__wrapper">
        <svg
          width="227"
          height="884"
          viewBox="0 0 227 884"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="folder-thin__filler_wrapper"
          preserveAspectRatio="none"
        >
          <path
            d="M54.0182 2H12C6.47715 2 2 6.47714 2 12V872C2 877.523 6.47716 882 12 882H215C220.523 882 225 877.523 225 872V12C225 6.47715 220.523 2 215 2H209.62C206.622 2 203.781 3.3455 201.882 5.66572L200.179 7.74605C198.28 10.0663 195.44 11.4118 192.441 11.4118H71.1123C68.0162 11.4118 65.0947 9.97762 63.201 7.52817L61.9295 5.8836C60.0358 3.43414 57.1143 2 54.0182 2Z"
            fill="#CD6E15"
            stroke="#FF881F"
            stroke-width="4"
          />
        </svg>

        <svg
          width="227"
          height="884"
          viewBox="0 0 227 884"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="folder-thin__outline_wrapper"
          preserveAspectRatio="none"
        >
          <path
            d="M2 86V872C2 877.523 6.47716 882 12 882H215C220.523 882 225 877.523 225 872V86M2 86V12C2 6.47715 6.47715 2 12 2H54.0182C57.1143 2 60.0358 3.43414 61.9295 5.8836L63.201 7.52817C65.0947 9.97762 68.0162 11.4118 71.1123 11.4118H192.441C195.44 11.4118 198.28 10.0663 200.179 7.74605L201.882 5.66572C203.781 3.3455 206.622 2 209.62 2H215C220.523 2 225 6.47715 225 12V86M2 86L8.1143 72.3996C9.72837 68.8094 13.2986 66.5 17.235 66.5H209.955C213.934 66.5 217.535 68.859 219.124 72.5071L225 86"
            stroke="#FF881F"
            stroke-width="4"
          />
        </svg>
        <h1 className="schedule-thin_title">{navbarTitle}</h1>
        <div className="schedule-thin__content_wrapper">
          <ul>
            {scheduleItems.length > 0 ? (
              scheduleItems.map((day, index) => (
                <li key={index} className="schedule-day">
                  <strong>{day.date}</strong>
                  {navbarTitle !== "Overview" && day.description && (
                    <p className="schedule-description">{day.description}</p>
                  )}
                  <ul className="event-list">
                    {day.events.map((event, eventIndex) => (
                      <li key={eventIndex} className="schedule-event">
                        {event}
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <p>No schedule available.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ScheduleThin;
