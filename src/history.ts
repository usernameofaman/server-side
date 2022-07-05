import { createBrowserHistory } from "history";
import ReactGA from 'react-ga';
import { checkIsPathHaveDynamicSeoTitle } from "./utils/isPathHaveDynamicTitle";

const history = createBrowserHistory();
history.listen((_location, action) => {
  const start=window.performance.mark(`${location.pathname}_START`);
  if (["PUSH"].includes(action)) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    // window.scroll({
    //   behavior: "smooth",
    //   top: 0,
    // });
  }
  // Set Page View Other than Product & Category Components 
  if(!checkIsPathHaveDynamicSeoTitle(location.pathname)){
    ReactGA.ga('send', 'pageview', {
      'page': location.pathname+location.search,
      'title': "EMW e-commerce"
    });
  } 
});


export { history };
