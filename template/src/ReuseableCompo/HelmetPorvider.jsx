import {Helmet} from "react-helmet";
 
// eslint-disable-next-line react/prop-types
const HelmetPorvider = ({title}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} | Learn Mentor Gate</title>
    </Helmet>
  );
};

export default HelmetPorvider;