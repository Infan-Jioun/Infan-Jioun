import { useEffect, useState } from "react";
import { LuSun, LuSunMoon } from "react-icons/lu";
import { IoMoonSharp } from "react-icons/io5";

const DarkMode = () => {
    const [isDarkMode, setIsDarkmode] = useState(() => {
        return localStorage.getItem("isDarkMode") === "true";
    });

    const toggleTheme = () => {
        setIsDarkmode(!isDarkMode);
        localStorage.setItem("isDarkMode", !isDarkMode);
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("bg-gradient-to-r", "from-black", "via-gray-900", "to-blue-900", "text-white");
            document.body.classList.remove("bg-white", "text-black");
        } else {
            document.body.classList.add("bg-[#c2caf3]", "text-black");
            document.body.classList.remove("bg-gradient-to-r", "from-black", "via-gray-900", "to-blue-900", "text-white");
        }
    }, [isDarkMode]);

    return (
        <div data-aos="zoom-in-down">
            <button
                className="swap swap-rotate "
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
            >
                {isDarkMode ? <LuSun size={24} /> : <LuSunMoon size={24} />}
            </button>
        </div>
    );
};

export default DarkMode;
