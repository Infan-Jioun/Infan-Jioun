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
        <div className='max-w-7xl mx-auto mt-6 min-h-screen'>
  <section className="my-10 px-4">
  <h2 data-aos="zoom-in" className="text-2xl md:text-4xl font-bold text-center uppercase text-white drop-shadow-lg mb-8">
    Education
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {education.map((edu, index) => (
      <div
        key={index}
        className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-800/40"
      >
        <h3 className="text-lg font-semibold  flex items-center gap-2 mb-1">
          <MdSchool className="text-[#5a1c5a81]" /> {edu.institute}
        </h3>
        <p className=" font-semibold">{edu.degree}</p>
        <p className="">{edu.field}</p>
        <p className="italic  mt-2">{edu.duration}</p>
      </div>
    ))}

    {/* Programming Hero Card */}
    <div className="relative bg-white/5 backdrop-blur-sm border border-[#5a1c5a81] p-6 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-purple-800/40">
      <h3 className="text-lg font-semibold  flex items-center gap-2 mb-1">
        <MdSchool className="text-[#5a1c5a81]" /> Programming Hero
      </h3>
      <p className=" font-semibold">Additional Course</p>
      <p className="">Web Development</p>
      <p className="italic  mt-2">2023 (July - December)</p>
      <Link
        to="https://drive.google.com/file/d/19KYaO4wQdPsMMO3ky-jzsL4XJqM6CfS1/view"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#5a1c5a81] mt-4 text-white py-2 px-4 rounded-full transition-transform duration-300 hover:scale-105"
      >
        <MdDownloading className="text-xl" />
        Certificate
      </Link>
    </div>
  </div>
</section>
        </div>
    );
};

export default Education;