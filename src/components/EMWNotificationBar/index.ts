import HelloBar from "hello-bar";
import 'hello-bar/build/index.css';

export const displayNotificationBar=(bannerText,bannerPosition,bgColor,hideClose,id)=>{
  return new HelloBar({
    id: id,
    text: bannerText,
    position: bannerPosition,
    fixed: true,
    hideClose: hideClose, 
    background: bgColor,
    multiline: true,
    targeting: {
      once: false,
    }
  });
};
