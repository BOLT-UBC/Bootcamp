import React, { useState, useEffect } from "react";
import CompleteSchedule from "./ScheduleFolder/CompleteSchedule";
import StarButton from "./ScheduleFolder/components/StarButton";

/**
 * Type Definitions
 */
type PortalScheduleProps = {
  navbarTitle?: string;
};

type ScheduleWideProps = {
  portalTitle?: string;
  onSelect: (schedule: string) => void;
};

/**
 * Schedule Data
 */
const schedules = [
  { name: "Overview", yOffset: 60 },
  { name: "Day 1", yOffset: 260 },
  { name: "Day 2", yOffset: 180 },
  { name: "Day 3", yOffset: 300 },
  { name: "Day 4", yOffset: 80 },
  { name: "Finale", yOffset: 150 },
];

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
      events: ["12:00 PM – Offline Workshop", "1:30 PM – Networking Event"],
    },
  ],
  "Day 2": [
    {
      date: "Tuesday, March 4, 2025",
      description:
        "An online workshop focused on refining presentation skills.",
      events: ["TBD – Online Presentation Workshop"],
    },
  ],
  "Day 3": [
    {
      date: "Wednesday, March 5, 2025",
      description: "Submission deadline and finalist announcement.",
      events: [
        "12:00 PM (Noon) – Submission Deadline",
        "6:00 PM – Finalist Announcement",
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
      events: ["12:00 PM – Final Presentations @ Sauder, UBC"],
    },
  ],
};

/**
 * ScheduleWide Component - Handles Schedule Selection
 */
const ScheduleWide: React.FC<ScheduleWideProps> = ({
  portalTitle,
  onSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    onSelect(schedules[0].name);
  }, [onSelect]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    onSelect(schedules[index].name);
  };

  return (
    <div style={{ marginRight: "1rem", width: "75%" }}>
      {portalTitle && <h1 className="schedule-wide_title">{portalTitle}</h1>}
      <div className="schedule-wide__content_wrapper">
        <div className="star-map-bg">
          <div className="star-button-row">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                style={{ position: "relative", top: `${schedule.yOffset}px` }}
              >
                <StarButton
                  label={schedule.name}
                  isSelected={index === selectedIndex}
                  onClick={() => handleSelect(index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * PortalSchedule Component - Main Component Handling Schedule Display
 */
const PortalSchedule: React.FC<PortalScheduleProps> = ({
  navbarTitle = "Overview",
}) => {
  const [selectedSchedule, setSelectedSchedule] = useState<string>("Overview");

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        fontFamily: "Roboto Mono, monospace",
      }}
    >
      <ScheduleWide onSelect={setSelectedSchedule} />
      <div
        style={{
          backgroundColor: "#D37E3D",
          borderRadius: "1rem",
          width: "25%",
        }}
      >
        <h1 className="schedule-thin_title">{selectedSchedule}</h1>
        <div className="schedule-thin__content_wrapper">
          <ul>
            {scheduleMap[selectedSchedule]?.map((day, index) => (
              <li key={index} className="schedule-day">
                <strong>{day.date}</strong>
                {selectedSchedule !== "Overview" && day.description && (
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
            )) || <p>No schedule available.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PortalSchedule;
