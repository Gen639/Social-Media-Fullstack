import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer>&copy;{currentYear} Gen App</footer>;
};

export default Footer;
