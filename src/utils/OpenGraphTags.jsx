import React from "react";
const OpenGraphTags = () => {
  return <React.Fragment>
      <meta property="og:url" content="" />
      {/* thumbnail And title for social media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Dashboard" />
      <meta property="og:description" content="Dashboard" />
      <meta property="og:image" content="/assets/images/landing/preview.png" />
    </React.Fragment>;
};
export default OpenGraphTags;