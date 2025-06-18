import { Link, NavLink, useLocation } from "react-router-dom";
import { MdDownloading } from "react-icons/md";
import Typewriter from 'typewriter-effect';
import { RiMenu4Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import DarkMode from "../DarkMode/DarkMode";
import { useEffect, useState } from "react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const navItems = [
    { path: "/", label: "ABOUT" },
    { path: "/skills", label: "MY SKILLS" },
    { path: "/myProjects", label: "MY PROJECTS" },
    { path: "/education", label: "EDUCATION" },
    { path: "/contact", label: "CONTACT US" },
  ];

  const navLinks = navItems.map(({ path, label }) => (
    <NavLink
      key={path}
      to={path}
      className={({ isActive }) =>
        isActive
          ? "font-bold text-white border-b-2 border-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-100 before:transition-transform before:duration-300 hover:before:scale-100"
          : "font-bold text-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded"
      }
      onClick={closeDropdown}
    >
      {label}
    </NavLink>
  ));

  return (
    <div>
      <div className={`navbar bg-[#37133746] backdrop-blur border-b-2 px-8 md:px-20 text-white ${scrolled ? 'fixed top-0 left-0 w-full shadow-md z-50' : ''}`}>

        <div className="navbar-start flex items-center gap-4">
          <div className="dropdown md:hidden block">
            <Menu open={isOpen} handler={setIsOpen}>
              <MenuHandler>
                <div className="btn btn-ghost btn-circle text-2xl text-white cursor-pointer" onClick={toggleDropdown}>
                  {isOpen ? <AiOutlineClose /> : <HiOutlineMenu />}
                </div>
              </MenuHandler>
              <MenuList className="bg-[#37133746] ml-3 mt-3 backdrop-blur-md text-black z-[1000]">
                {navItems.map(({ path, label }) => (
                  <MenuItem key={path} className="hover:bg-transparent focus:bg-transparent active:bg-transparent">
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive
                          ? "font-bold text-white border-b-2 border-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-100 before:transition-transform before:duration-300 hover:before:scale-100"
                          : "font-bold text-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded"
                      }
                      onClick={closeDropdown}
                    >
                      {label}
                    </NavLink>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>

          <Link to="/" className="font-bold text-2xl flex drop-shadow-2xl select-none">
            <Typewriter
              options={{
                strings: ["INFAN"],
                autoStart: true,
                loop: true,
              }}
            />
          </Link>
        </div>

        <div className="flex-none navbar-end flex items-center gap-4">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-5 font-bold font-[Protest Revolution]">
              {navLinks}
            </ul>
          </div>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
