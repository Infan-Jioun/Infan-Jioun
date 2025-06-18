import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home/Home";
import Main from "../Components/Main/Main";
import About from "../Components/About/About";
import ContactMe from "../Components/Home/ContactMe/ContactMe";
import MyProjects from "../Components/Home/MyProjects/MyProjects";
import Skills from "../Components/Skills/Skills";
import Education from "../Components/Education/Education";
 
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        // {
        //     path: "/",
        //     // element: <Home></Home>
        // },
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/skills",
            element: <Skills/>
        },
        {
            path: "/myProjects",
            element: <MyProjects/>
        },
        {
            path: "/education",
            element: <Education/>
        },
        {
            path: "/contact",
            element: <ContactMe></ContactMe>
        }
      ]
    },
  ]);