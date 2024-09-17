import React from "react";

import "./index.styles.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return <footer className="footer">{year} © NOMAD Store</footer>;
};

export default Footer;
