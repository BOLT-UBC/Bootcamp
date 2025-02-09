import React from "react";
import "./FolderWide.css";

type FolderWideProps = React.PropsWithChildren<{portalTitle?: String}>;

const FolderWide: React.FC<FolderWideProps> = ({ portalTitle, children }) => {
  return (
    <>
      <div className="folder-wide__wrapper">
        <svg // outline
          width="1477"
          height="884"
          viewBox="0 0 1477 884"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="folder-wide__outline_wrapper"
          preserveAspectRatio="none"
        >
          <path
            d="M2 88V872C2 877.523 6.47713 882 12 882H1465C1470.52 882 1475 877.523 1475 872V88M2 88V12C2 6.47715 6.47715 2 12 2H108.807C109.913 2 111.01 2.18323 112.056 2.54222L136.303 10.8695C137.348 11.2285 138.445 11.4118 139.551 11.4118H1290.31C1290.92 11.4118 1291.53 11.3559 1292.13 11.245L1341.22 2.16675C1341.82 2.05582 1342.43 2 1343.04 2H1465C1470.52 2 1475 6.47715 1475 12V88M2 88L17.2801 70.4364C19.1794 68.2534 21.9311 67 24.8246 67H1450.24C1452.93 67 1455.51 68.0833 1457.39 70.0053L1475 88"
            stroke="#FF881F"
            stroke-width="4"
          />
        </svg>
        <svg // fill
          width="1473"
          height="880"
          viewBox="0 0 1473 880"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="folder-wide__filler_wrapper"
          preserveAspectRatio="none"
        >
          <path
            d="M108.297 0H10C4.47715 0 0 4.47714 0 9.99999V870C0 875.523 4.47713 880 9.99998 880H1463C1468.52 880 1473 875.523 1473 870V10C1473 4.47715 1468.52 0 1463 0H1341.04C1340.43 0 1339.82 0.055816 1339.22 0.166751L1290.13 9.24501C1289.53 9.35595 1288.92 9.41177 1288.31 9.41177H136.061C134.81 9.41177 133.571 9.17726 132.407 8.72041L111.951 0.691351C110.787 0.234504 109.548 0 108.297 0Z"
            fill="#CD6E15"
          />
        </svg>
       {portalTitle && <h1 className="folder-wide__portal_title">{portalTitle}</h1>}
        <div className="folder-wide__content_wrapper">{children}</div>
      </div>
    </>
  );
};

export default FolderWide;
