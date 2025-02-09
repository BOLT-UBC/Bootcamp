import React from 'react';
import { useNavigate } from "react-router-dom";

import FullFolder from '../components/Folder/FullFolder';
import PortalBoxWidget from '../components/PortalBoxWidget';

import CryCat from '../components/assets/CryCat.jpg'

import "./Team.css"

const teammateCardStyle = {
  display: "flex",
  flexdirection: "column",
  alignItems: "center",
  width: "25%",
  height: "50%",
  aspectRatio: "1" 
}

export default function Team() {
  const navigate = useNavigate();

  return (
    <>
    <div className='hehehaha'>
      <FullFolder>
        <PortalBoxWidget style={teammateCardStyle}>
          <img src={CryCat} className='teammate_profile_picture'></img>
        </PortalBoxWidget>
      </FullFolder>
    </div>
    </>
  );
}
