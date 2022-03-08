import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="sm:max-w-[640px] md:max-w-[1300px] xl:max-w-[1920px] 2xl:max-w-full">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
