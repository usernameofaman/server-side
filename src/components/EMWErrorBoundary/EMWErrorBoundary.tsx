import React from 'react';
import "./scss/index.scss";
import ReactSVG from "react-svg";
import loginlogo from "../../images/emw-confirm-logo.svg";
import { history } from '../../history';
import leftArrow from '../../images/leftArrow.png'


interface EMWErrorBoundaryProps{
  children: any;
 
}

interface EMWErrorBoundaryState{
  error: any;
}

class EMWErrorBoundary extends React.Component<EMWErrorBoundaryProps,EMWErrorBoundaryState>{
    constructor(props) {
      super(props);
      this.state = { error: false };
    }
    
    static getDerivedStateFromError(error) {
      return { error: true };
    }
    
    componentDidCatch(error, errorInfo) {
      this.setState({
        error: true,
      })
    }
    
    render() {
      const { error } = this.state;
      const backHandler=()=>{
        this.setState({
          error: false,
        })
        history.push(`/`);
      }
        return error ? 
        <>
        <div className="section">
          <div className="secondary-section">   
              <span className="login-logo">
                  <ReactSVG path={loginlogo} className="overlay__header__logo-icon" />
              </span> 
              <p className="mainErrorHeading">We have encountered an error!</p>
              <p className="secondaryLine">Sorry for the inconvenience caused.</p>
              <div onClick={backHandler} className="arrowSection"> 
                  <img src={leftArrow} /> 
                  <p>Go Back To Home Page</p>
              </div>
          </div>
        </div> 
        </>
        : this.props.children;
    }  
  }

export default EMWErrorBoundary;