import { Link, useLocation } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import DarkMode from "../DarkMode/DarkMode";

const Navbar = ({ setScrolled }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollCheck = window.scrollY > 50;
      setIsScrolled(scrollCheck);
      setScrolled(scrollCheck); // send to parent
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setScrolled]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { path: "about", label: "ABOUT" },
    { path: "myProjects", label: "MY PROJECTS" },
    { path: "skills", label: "MY SKILLS" },
    { path: "education", label: "EDUCATION" },
    { path: "contact", label: "CONTACT US" },
  ];

  const navLinks = navItems.map(({ path, label }) => (
    <button
      key={path}
      onClick={() => {
        scrollToSection(path);
        closeDropdown();
      }}
      className="font-bold text-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded"
    >
      {label}
    </button>
  ));

  return (
    <div>
      <div
        className={`navbar bg-transparent border-2 border-white backdrop-blur-xl max-w-screen-xl rounded-3xl drop-shadow-xl w-full mx-auto px-8 md:px-20 text-white z-40 transition-all duration-300
          ${isScrolled ? 'fixed top-0' : 'relative mt-3'}
        `}
      >
        <div className="navbar-start flex items-center gap-4">
          <div className="dropdown md:hidden block">
            <Menu open={isOpen} handler={setIsOpen}>
              <MenuHandler>
                <div className="btn btn-ghost btn-circle text-xl text-white cursor-pointer" onClick={toggleDropdown}>
                  {isOpen ? <AiOutlineClose /> : <HiOutlineMenu />}
                </div>
              </MenuHandler>
              <MenuList className="bg-transparent border-2 border-white backdrop-blur-xl ml-3 mt-3 text-black z-[1000]">
                {navItems.map(({ path, label }) => (
                  <MenuItem
                    key={path}
                    className="hover:bg-transparent focus:bg-transparent active:bg-transparent border-2 border-white backdrop-blur-xl"
                  >
                    <button
                      onClick={() => {
                        scrollToSection(path);
                        closeDropdown();
                      }}
                      className="font-bold text-white relative inline-block transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-white before:scale-0 before:transition-transform before:duration-300 hover:before:scale-100 rounded"
                    >
                      {label}
                    </button>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>

          <Link to="/" className="font-bold text-xl flex drop-shadow-2xl select-none">
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
