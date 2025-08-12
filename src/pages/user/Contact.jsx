import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
  <div className="mx-auto px-6 py-16 min-h-screen flex flex-col items-center justify-center bg-[#FFFFFF]" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-5xl font-bold text-newPrimary mb-8 animate-fade-in">Contact Us</h1>
      <p className="max-w-2xl text-xl text-[#000000] text-center mb-12 leading-relaxed">
        Have a question, feedback, or need help? Fill out the form below and our team will get back to you as soon as possible.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] rounded-lg shadow-lg p-10 w-full max-w-2xl space-y-6 border border-newPrimary/30"
      >
        <div>
          <label className="block mb-2 font-semibold text-newPrimary text-lg">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-newPrimary/50 rounded-lg px-4 py-3 bg-[#FFFFFF] text-newPrimary focus:ring-2 focus:ring-newPrimary focus:outline-none transition duration-300"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-newPrimary text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-newPrimary/50 rounded-lg px-4 py-3 bg-[#FFFFFF] text-newPrimary focus:ring-2 focus:ring-newPrimary focus:outline-none transition duration-300"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-semibold text-newPrimary text-lg">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-newPrimary/50 rounded-lg px-4 py-3 bg-[#FFFFFF] text-newPrimary focus:ring-2 focus:ring-newPrimary focus:outline-none transition duration-300"
            placeholder="Type your message here..."
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-newPrimary text-white py-3 rounded-lg font-bold hover:bg-[#FFFFFF] hover:text-newPrimary transition-colors duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      <div className="mt-16 text-center text-black text-base">
        Or email us directly at <a href="mailto:support@wahidfoods.com" className="text-newPrimary hover:text-black underline transition-colors duration-300 font-medium">support@wahidfoodssmc.com</a>
      </div>
    </div>
  );
};

export default Contact;