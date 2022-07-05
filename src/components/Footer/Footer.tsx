import "./scss/index.scss";
import { displayNotificationBar } from "../EMWNotificationBar";
import * as React from "react";
import  { useEffect , useState }  from 'react'
import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Nav from "./Nav";
import Wave from "./Wave";
import moment from 'moment';
import Box from '@material-ui/core/Box';
import ReactSVG from "react-svg";
import footerDesktop from "../../images/footer-desktop-image.svg";
import Toggleicon from "../../images/gearIcon.svg"
import {Helmet} from "react-helmet";

const Footer: React.FC= (props) => {
  const customerEmail = localStorage.getItem('ImpersonatedCustomerEmail');

  const EnableZonosScript=()=>{
    const zonosHelloSiteKey=process.env.REACT_APP_ENABLE_ZONOS_HELLO_SITEKEY;
    const zonosHelloUrl=`https://hello.zonos.com/hello.js?siteKey=${zonosHelloSiteKey}`;
    return(
      <Helmet>
          <script src={zonosHelloUrl}></script>
          <script id="welcome_mat_js" type="text/javascript" src="https://cdn.iglobalstores.com/js/welcome_mat/zonos_electricmotorwholesale.js"></script> 
      </Helmet>
    )
  }

  const [topMainMenuHeight, setTopMainMenuHeight] = useState(0);


  useEffect(() => {
    // if (customerEmail && customerEmail.length) displayNotification();
    if (!customerEmail) {
      if (!document.getElementById("helloBar_13kfayjrgswr")) {
        setTopMainMenuHeight(0);
        setTimeout(displayNotification, 1000)
        // displayNotification();
      }
    }
  }, [customerEmail]);


  const displayNotification = () => {
    // display notification bar 
    let emailId = JSON.parse(localStorage.getItem('currentUserData'));
    if(emailId)
      emailId = emailId.email;
    else
      emailId = ""
    const userEmailId = emailId
    const gearIcon = `<img id='bar-button' style="margin: -6px -3px; cursor: pointer;" src="${Toggleicon}" />`
    const customerBannerText = `Agent ${userEmailId} is impersonating customer ${customerEmail}. Close this browser instance when completed. <span class="bypass-menu-toggle" onclick="window.alert("HH")"> ${gearIcon} </span>`
    let bannerText = customerEmail && customerEmail.length ? customerBannerText : process.env.REACT_APP_NOTIFICATION_BAR_TEXT;
    const hideClose = customerEmail && customerEmail.length ? true : false;
    if ((bannerText !== "" && bannerText !== undefined)) {
      let bgColor = customerEmail && customerEmail.length ? '#B21B0C' : process.env.REACT_APP_NOTIFICATION_BAR_BG_COLOR;
      const id = customerEmail ? 'helloBar_impersonation' : 'helloBar_13kfayjrgswr';
      let bar;
      if(customerEmail && customerEmail.length)
        bar = displayNotificationBar(bannerText, 'top', bgColor, hideClose, id);
      else
        bar = displayNotificationBar(bannerText, 'bottom', bgColor, hideClose, id);

      bar.on("close-bar", () => {
        setTopMainMenuHeight(0);
        const root = document.documentElement;
        root.style.setProperty("--helloBarHeight", `0px`);
      });
      setTimeout(function () {
        const barContainer = document.querySelector('.hello-bar');
        let topHeight = 0;
        if (barContainer && barContainer.clientHeight && customerEmail && customerEmail.length) {
          topHeight = barContainer.clientHeight;
          setTopMainMenuHeight(barContainer.clientHeight);
        }
        const root = document.documentElement;
        let height = topHeight.toString();
        let blackdropHeight = ((topHeight + 80).toString());
        root.style.setProperty("--helloBarHeight", `${height}px`);
        root.style.setProperty("--helloBarHeightBlackDropHeight", `${blackdropHeight}px`);
      }, 1000);
    } else {
      const root = document.documentElement;
      root.style.setProperty("--helloBarHeight", `0px`);
      root.style.setProperty("--helloBarHeightBlackDropHeight", `80px`);
    }
  }



  return(
  <>
  {
    (process.env.REACT_APP_ENABLE_ZONOS_CHECKOUT=="true") && <EnableZonosScript />
  }
  <Box className="footer-image">
    <ReactSVG path={footerDesktop} />
  </Box>

  <div className="footer" id="footer">
    {/* <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Wave />     */}
    <Nav />
    <div className="emw-copyright">COPYRIGHT © { moment().format('YYYY')} ELECTRIC MOTOR WHOLESALE, INC.</div>
  </div>
  </>
  );
};

export default Footer;
