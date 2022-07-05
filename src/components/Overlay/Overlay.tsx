import "./scss/index.scss";

import classNames from "classnames";
import React from "react";

import { OverlayContextInterface } from "./context";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide },
}) => {
  const set=()=>{
    const flag=localStorage.getItem('registerHide');
    (flag==="true") ? hide() : null;
  }
  return(
    <div
    className={classNames("overlay", {
      [`overlay--${type}`]: !!type,
      [className]: !!className,
    })}
    onClick={(type==="register" || type==="password") ? set : hide}
  >
    <div className="notification-banner-gap">
      <div className={`overlay__${theme}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  </div>
  )
}
export default Overlay;
