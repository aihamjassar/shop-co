import { useEffect, useRef, useState } from "react";
import { Footer } from "../components/common/Footer";
import { Header } from "../components/common/Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
      const handleResize = () => setHeaderHeight(headerRef.current.offsetHeight);
      window.addEventListener("resize", handleResize);
      return () => removeEventListener("resize", handleResize);
    }
  }, []);
  
  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      <Header ref={headerRef} />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
