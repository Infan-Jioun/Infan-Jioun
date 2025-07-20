import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


const Main = () => {
    return (
  <div>
          <div className="   max-w-screen-xl mx-auto">
           <br />
      
            <Navbar></Navbar>
          
            <div className="">
            <Outlet></Outlet>
            </div>
            <div className="px-1">
            <Footer></Footer>
            </div>
            <br />
        </div>
        
  </div>
    );
};

export default Main;