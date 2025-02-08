import React from "react";
import "./FolderLeft.css";

type FolderLeftProps = React.PropsWithChildren<{}>;

const FolderLeft: React.FC<FolderLeftProps> = ({ children }) => {
  return (
    <>
      <div className="folder-left__wrapper"></div>
    </>
  );
};

export default FolderLeft;
