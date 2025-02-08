import React from "react";
import { useNavigate } from "react-router-dom";
import FolderWide from "../components/FolderWide";
import FolderThin from "../components/FolderThin";
import "./Team.css";

export default function Team() {
  const navigate = useNavigate();
  return <FolderThin></FolderThin>;
}
