import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { Input, Textarea } from '@material-tailwind/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ContactMe = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm('service_34ob7qt', 'template_2rj1a7j', form.current, {
        publicKey: 'LD3EefzuvWY-avuiH',
      })
      .then(() => {
        toast.success('Successfully Sent Your Message');
        setLoading(false);
        form.current.reset();
      })
      .catch((error) => {
        setLoading(false);
        if (error) {
          toast.error('Please Try Again', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      });
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto my-10 py-10 px-6 md:px-12  rounded-lg shadow-lg">
      <Helmet>
        <title>InfanPortfolio | Contact Us</title>
      </Helmet>

      <h2 data-aos="zoom-in" className="text-3xl mt-7  md:text-4xl uppercase font-bold text-center mb-10 drop-shadow-2xl text-white">
         Contact Me
      </h2>

      <form ref={form} onSubmit={sendEmail} className="bg-[#c2caf3] p-8 rounded-lg shadow-md">
        <div className="lg:flex gap-6">
          <div className="form-control md:w-1/2 mb-6 lg:mb-0">
            <Input
              type="text"
              label="NAME"
              placeholder="Your Name"
              name="user_name"
              className="p-3 font-mono font-semibold text-lg border-2 border-gray-300 rounded-md"
              required
              disabled={loading}
            />
          </div>

          <div className="form-control md:w-1/2">
            <Input
              type="email"
              label="YOUR EMAIL"
              name="user_email"
              placeholder="Your Email"
              className="p-3 font-mono font-semibold text-lg border-2 border-gray-300 rounded-md"
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-control mt-6">
          <Textarea
            name="message"
            label="Text Your Message"
            className="bg-transparent border-2 border-gray-300 font-mono font-semibold text-lg rounded-md p-3 resize-none"
            rows="5"
            required
            disabled={loading}
          />
        </div>

        <div className="form-control mt-8 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-transparent border-2 border-white backdrop-blur-xl  drop-shadow-2xl text-white p-3 rounded-full transform transition-transform duration-300 hover:scale-105"
          >
            {loading ? (
              <Skeleton width={140} height={28} baseColor="#444" highlightColor="#999" />
            ) : (
              'Send Your Message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactMe;
