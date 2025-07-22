// src/pages/user/Contact.jsx
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
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary mb-6">Contact Us</h1>
      <p className="max-w-xl text-lg text-gray-700 text-center mb-8">
        Have a question, feedback, or need help? Fill out the form below and our team will get back to you as soon as possible.
      </p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-8 w-full max-w-lg space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Type your message here..."
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary-dark transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
      <div className="mt-12 text-center text-gray-500 text-sm">
        Or email us directly at <a href="mailto:support@shopease.com" className="text-primary underline">support@shopease.com</a>
      </div>
    </div>
  );
};

export default Contact;
