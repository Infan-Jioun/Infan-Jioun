import React from 'react';
import { MdDownloading, MdSchool } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Education = () => {
  const education = [
    {
      institute: 'Premier University Chittagong',
      degree: 'Bachelor of Arts (BA)',
      field: 'Fashion Design And Technology',
      duration: '2024 - Present',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
      <h2
        data-aos="zoom-in"
        className="text-3xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 mb-12"
      >
        Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Academic Institutions */}
        {education.map((edu, index) => (
          <div
            key={index}
            className="group bg-gradient-to-br from-[#1b1b2f] via-[#2c2c54] to-[#1b1b2f] border border-purple-600/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-purple-600/50"
          >
            <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
              <MdSchool className="text-purple-400" />
              {edu.institute}
            </h3>
            <p className="text-white/90 font-medium">{edu.degree}</p>
            <p className="text-white/70">{edu.field}</p>
            <p className="text-sm italic text-white/60 mt-2">{edu.duration}</p>
          </div>
        ))}

        {/* Programming Hero Card */}
        <div className="group bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] border border-purple-600/30 p-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-pink-600/40">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-2">
            <MdSchool className="text-pink-400" />
            Programming Hero
          </h3>
          <p className="text-white/90 font-medium">Additional Course</p>
          <p className="text-white/70">Web Development</p>
          <p className="text-sm italic text-white/60 mt-2">2023 (July - December)</p>
          <Link
            to="https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <MdDownloading className="text-xl" />
            Certificate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Education;
