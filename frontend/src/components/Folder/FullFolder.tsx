import React from "react";
import { JSX } from "react";

import "./FullFolder.css";
import FolderThin from "./FolderThin";
import FolderWide from "./FolderWide";

type FullFolderProps = React.PropsWithChildren<{navigationComponent: JSX.Element; portalTitle?: String; navbarTitle?: String}>;

const FullFolder: React.FC<FullFolderProps> = ({ portalTitle,  navbarTitle, navigationComponent, children }) => {
  return (
      <section className="full_folder__wrapper">
        <div className="full_folder__content_wrapper">
          <div className="folder_thin__container">
          <FolderThin navbarTitle={navbarTitle}>{navigationComponent}</FolderThin>
          </div>
          <div className="folder_wide__container">
            <FolderWide portalTitle={portalTitle}>{children}</FolderWide>
          </div>
        </div>
        <div className="full_folder__background_wrapper">
          <svg
            className="full_folder__background_filler"
            width="1759"
            height="969"
            viewBox="0 0 1759 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M2 107.553V12C2 6.47715 6.4772 2 12 2H1677.71C1679.98 2 1682.17 2.76674 1683.94 4.17504L1710.12 25.0031C1711.89 26.4114 1714.08 27.1781 1716.34 27.1781H1747C1752.52 27.1781 1757 31.6553 1757 37.1781V957C1757 962.523 1752.52 967 1747 967H1562.03C1560.55 967 1559.1 966.676 1557.77 966.05L1546.36 960.687C1545.03 960.061 1543.58 959.737 1542.11 959.737H107.353C104.902 959.737 102.535 958.836 100.704 957.206L93.8807 951.132C92.0495 949.501 89.6832 948.601 87.2314 948.601H24.5094C18.9866 948.601 14.5094 944.123 14.5094 938.601V901.044C14.5094 897.773 12.9097 894.709 10.226 892.839L6.28348 890.092C3.59968 888.222 2 885.158 2 881.887V244.184C2 240.292 4.25786 236.754 7.78747 235.115L8.72197 234.681C12.2516 233.041 14.5094 229.503 14.5094 225.611V127.892C14.5094 125.112 13.3522 122.458 11.3154 120.566L5.19399 114.879C3.15723 112.987 2 110.333 2 107.553Z"
              fill="#FF9645"
              stroke="#FF881F"
              stroke-width="4"
            />
            <rect
              x="13"
              y="27"
              width="1744"
              height="921"
              rx="10"
              fill="#502F11"
            />
            <path d="M1712 28L1688.5 6H1735L1757 28H1712Z" fill="#5D3815" />
            <path
              d="M1559 967L1528 949H1757V959L1750.5 967H1559Z"
              fill="#583E07"
            />
          </svg>
          <svg
            className="full_folder__background_outline"
            width="1759"
            height="969"
            viewBox="0 0 1759 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M14.5094 123.533L5.19399 114.879C3.15723 112.987 2 110.333 2 107.553V27.1781V12C2 6.47715 6.4772 2 12 2H1677.71C1679.98 2 1682.17 2.76674 1683.94 4.17505L1685.5 5.41566M14.5094 123.533V231.992M14.5094 123.533V37.1781C14.5094 31.6553 18.9866 27.1781 24.5094 27.1781H1712.85M14.5094 231.992L7.78747 235.115C4.25786 236.754 2 240.292 2 244.184V881.887C2 885.158 3.59968 888.222 6.28348 890.092L14.5094 895.823M14.5094 231.992V895.823M14.5094 895.823V938.601C14.5094 944.123 18.9866 948.601 24.5094 948.601H91.0377M91.0377 948.601L100.704 957.206C102.535 958.836 104.902 959.737 107.353 959.737H1544.34M91.0377 948.601H1523.5M1544.34 959.737L1557.77 966.05C1559.1 966.676 1560.55 967 1562.03 967H1747C1752.52 967 1757 962.523 1757 957V948.601M1544.34 959.737L1523.5 948.601M1757 27.1781H1712.85M1757 27.1781V948.601M1757 27.1781L1736.89 8.15188C1735.03 6.3948 1732.58 5.41566 1730.02 5.41566H1685.5M1712.85 27.1781L1685.5 5.41566M1523.5 948.601H1757"
              stroke="#FF881F"
              stroke-width="4"
            />
          </svg>
        </div>
      </section>
  );
};

export default FullFolder;
