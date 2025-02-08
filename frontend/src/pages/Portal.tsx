import React, { useState } from 'react';
import PortalNavBar from '../components/portalNavBar';
import PortalPageSection from '../components/PortalPageSection';
import '../styles/Portal.css';


export default function Team() {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <>
        <div className='portal-page'>
          <div className='navBar'>
              <h1 className='bootcamp-title'>Bootcamp</h1>
              <div className='my-portal'>
                <h3>My Portal</h3>
                <nav className='links'>
                  <a className="link" onClick={() => setActivePage("Dashboard")} href="#dashboard">Dashboard</a>
                  <a className="link" onClick={() => setActivePage("My Team")} href="#my-team">My Team</a>
                </nav>
              </div>
              <div className='general'>
                <h3>General</h3>
                <nav className='links'>
                  <a className="link" onClick={() => setActivePage("Schedule")} href="#schedule">Schedule</a>
                  <a className="link" onClick={() => setActivePage("FAQ")} href="#faq">FAQ</a>
                </nav>
              </div>
              <button className='logout'>Log Out</button>
            </div>
          <h1>{activePage}</h1>
        </div>
    </>
  );
}




