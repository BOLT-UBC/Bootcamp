import React from 'react';
import { useNavigate } from "react-router-dom";
import MultiSelect from '../components/MultiSelect';

export default function UserInfo() {
  const navigate = useNavigate();

  return (
    <>
      <h1>who r u lol</h1>
      {/* <MultiSelect></MultiSelect> */}
      <button onClick={() => navigate("/registration/responses")}>
        Next
      </button>
    </>
  );
}




