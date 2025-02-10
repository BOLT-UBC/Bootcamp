import React from "react";
import "./FolderThin.css";

type FolderThinProps = React.PropsWithChildren<{navbarTitle?: String}>;

const FolderThin: React.FC<FolderThinProps> = ({  navbarTitle, children }) => {
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
          <h1 className="folder-thin__navbar_title">{navbarTitle}</h1>
        <div className="folder-thin__content_wrapper">{children}</div>
      </div>
    </>
  );
};

export default FolderThin;
