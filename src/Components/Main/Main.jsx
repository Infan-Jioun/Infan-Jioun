import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const Main = () => {
    return (
  <div>
          <div className=" min-h-screen  max-w-screen-xl mx-auto">
           <br />
      
            <Navbar></Navbar>
          
            <div className="">
            <Outlet></Outlet>
            </div>
          
        </div>
        <Footer></Footer>
  </div>
    );
};

export default Main;