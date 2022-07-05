import React, {useState} from 'react';
import IdleTimer from 'react-idle-timer';
import { history } from '../../history';
import { OverlayContext } from "../index";

interface EMWIdleUserProps{
  children: any;
}

const EMWIdleUser :React.FC<EMWIdleUserProps> = (props) =>{

  const [idleTimer, setIdleTimer] = useState(null);

  const overlayContext = React.useContext(OverlayContext);

    const handleOnAction = (event:any) => {
    console.log('user did something 123', event)
  }

  const handleOnActive = (event:any) => {
    console.log('user is active 123', event)
  }

  const handleOnIdle = (event:any) =>{
    const loggedIn = localStorage.getItem('loggedIn');
    if(!loggedIn){
      console.log("user is idle 123")
      history.push(`/`);
      overlayContext.hide();
      setTimeout(removeLocalStorage, 5000);
    }
  }

  const removeLocalStorage =()=>{
    localStorage.removeItem('contactInfoTemp');
    localStorage.removeItem('shippingtemp');
    // localStorage.removeItem('EMWCart');
    //localStorage.removeItem('ValidAddressID');
  }
        return (
        <>
        {process.env.REACT_APP_IDLE_USER_TIMEOUT && <IdleTimer
          ref={ref => { setIdleTimer(ref)}}
          timeout={parseInt(process.env.REACT_APP_IDLE_USER_TIMEOUT)}
          onActive={handleOnActive}
          onIdle={(event)=>handleOnIdle(event)}
          onAction={handleOnAction}
          debounce={250}
        />}
         {props.children}
         </>
         )
  }

export default EMWIdleUser;