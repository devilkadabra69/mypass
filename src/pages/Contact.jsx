import React from "react";
import { useForm } from "react-hook-form";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can handle form submission here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="mb-2">Address: River View Colony Telco, India</p>
          <p className="mb-2">Phone: +91-99XXXXX990</p>
          <p className="mb-2">Email: demo@demo.gmail.com</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Send us a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md w-full py-2 px-3"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter your email"
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md w-full py-2 px-3"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Your Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                placeholder="Enter your message"
                rows="4"
                className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md w-full py-2 px-3"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
