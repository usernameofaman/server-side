import * as React from "react";
import ReactSVG from "react-svg";
import loader from '../../images/footer_wave.svg'
import "./scss/index.scss";

class Wave extends React.PureComponent {
  render() {
    return (
      <div className="emw-footer-wave">
        < ReactSVG path={loader} className="medium-size-loader" />
      </div>
    );
  }
}

export default Wave;
