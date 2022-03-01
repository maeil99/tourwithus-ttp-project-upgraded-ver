import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="sm:min-w-[640px] md:min-w-[768px] lg:min-w-[1024px]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
