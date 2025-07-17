import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const projects = [
  {
    title: "FOODHUB",
    description:
      "Developed a food ordering platform (FodHub) with dynamic food management and role-based access (Admin, Moderator, Restaurant Owner). ",
    liveLink: "https://foodhub-d3e1e.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/FoodHub-Frontend-Projects",
    backendRepo: "https://github.com/Infan-Jioun/FoodHub-Backend-Projects",
    imageUrl: "https://i.ibb.co/fzkTN1Tw/screenshot-1748712980940.png",
    techStack: [
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "ShoppingGO",
    description:
      "An advanced e-commerce platform with product listing, dynamic navigation, payment integration, a responsive design, and Seller Sale product system.",
    liveLink: "https://shoppinggo-930e2.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Frontend",
    backendRepo: "https://github.com/Infan-Jioun/ShoppingGO-Projects-Backend",
    imageUrl: "https://i.ibb.co/j9wXX893/screenshot-1748713595547.png",
    techStack: [
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "Infan Web Ecommerce",
    description:
      "An advanced e-commerce platform with product listing, dynamic navigation, payment integration, and a responsive design.",
    liveLink: "https://infan-web.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-frontend",
    backendRepo: "https://github.com/Infan-Jioun/infan-ecommerce-backend",
    imageUrl: "https://i.ibb.co.com/GHzJT6J/Screenshot-2024-11-23-071650.png",
    techStack: [
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "Pet Adopt Web",
    description:
      "An interactive pet adoption website connecting adopters with pets through a user-friendly experience.",
    liveLink: "https://petadoptweb.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/Pet-adoption-frontend",
    backendRepo: "https://github.com/Infan-Jioun/Pet-adoption-backend",
    imageUrl: "https://i.ibb.co.com/ZmZmXPz/2024-11-24.png",
    techStack: [
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
  {
    title: "EduBooker",
    description:
      "A modern solution simplifying college admissions with an intuitive and efficient online platform.",
    liveLink: "https://edubooker-2f225.web.app/",
    frontendRepo: "https://github.com/Infan-Jioun/EduBooker-project-frontend",
    backendRepo: "https://github.com/Infan-Jioun/EduBooker-project-backend",
    imageUrl: "https://i.ibb.co.com/NtZz2NN/2025-01-27-2.png",
    techStack: [
      "https://i.ibb.co.com/gRXXrDs/react.webp",
      "https://i.ibb.co.com/jJzXpx5/tailwind.webp",
      "https://i.ibb.co.com/6s0HLvL/DaisyUI.webp",
      "https://i.ibb.co.com/jVnm9XT/nodeJS.webp",
      "https://i.ibb.co.com/ZYWHXHn/express-Js.webp",
    ],
  },
];

const MyProjects = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-12 max-w-7xl mx-auto">
      <h2 data-aos="zoom-in" className="text-3xl mt-7  md:text-4xl uppercase font-bold text-center mb-10 drop-shadow-2xl text-white ">
        My PROJECTS
      </h2>

      <div className=" mx-auto px-6 md:px-16 py-10 grid gap-10 drop-shadow-2xl">
        {(loading ? Array.from({ length: 3 }) : projects).map((project, index) => (
          <motion.div
            key={index}
            className="group relative flex flex-col lg:flex-row bg-[#ffffff08] border border-purple-500/30 backdrop-blur-md shadow-2xl rounded overflow-hidden transition transform hover:scale-[1.02] hover:shadow-purple-500/30 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Image Section */}
            <div className="lg:w-1/2 overflow-hidden drop-shadow-lg">
              {loading ? (
                <Skeleton height={250} />
              ) : (
                <Link to={project.liveLink} target="_blank">
                  <motion.img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
              )}
            </div>  

            {/* Content Section */}
            <div className="lg:w-1/2 p-6 flex flex-col justify-between ">
              <div>
                <h3 className="text-xl font-bold   drop-shadow-2xl  text-white">
                  {loading ? <Skeleton width={150} /> : project.title}
                </h3>

                <div className="flex gap-2 py-4 flex-wrap">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} width={40} height={40} circle />
                    ))
                    : project.techStack.map((tech, i) => (
                      <img
                        key={i}
                        src={tech}
                        alt="Tech"
                        className="w-8 h-8 object-contain rounded-full border border-purple-300 p-1 bg-white shadow"
                      />
                    ))}
                </div>

                <p className=" t text-opacity-80">
                  {loading ? <Skeleton count={3} /> : project.description}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6">
                {loading ? (
                  <Skeleton width={100} height={40} />
                ) : (
                  <>
                    <Link to={project.liveLink} target="_blank">
                      <Button className="px-6 py-2 font-semibold rounded-lg transition bg-[#5a1c5a81]  hover:bg-[#5a1c5a81] shadow-lg">
                        Preview 
                      </Button>
                    </Link>

                    <Link to={project.frontendRepo} target="_blank">
                      <img
                        src="https://i.ibb.co.com/5jCZwV7/github.webp"
                        alt="GitHub"
                        className="w-10 hover:scale-110 transition drop-shadow"
                      />
                    </Link>

                    <Link to={project.backendRepo} target="_blank">
                      <img
                        src="https://i.ibb.co.com/5jCZwV7/github.webp"
                        alt="GitHub"
                        className="w-10 hover:scale-110 transition drop-shadow"
                      />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
