import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useState } from "react";


const Main = () => {
  const [scrolled, setScrolled] = useState(false);
  return (
    <div>
      <div className="   max-w-screen-xl mx-auto">
        <br />

        <Navbar setScrolled={setScrolled} />

        <div className="">
          <Outlet></Outlet>
        </div>
        <div className="">
          <Footer></Footer>
        </div>
        <br />
      </div>

    </div>
  );
};

export default Main;