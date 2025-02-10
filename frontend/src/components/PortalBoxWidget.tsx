import React from "react";
import "./PortalBoxWidget.css"

type PortalBoxWidgetProps = React.PropsWithChildren<{style?: React.CSSProperties;}>;

const PortalBoxWidget: React.FC<PortalBoxWidgetProps> = ({ children, style }) => {
  return  <div className="portal_box_widget__wrapper" >
    <div className="portal_box_widget__children" style={style}>
      {children}
    </div>
  </div>
}

export default PortalBoxWidget;