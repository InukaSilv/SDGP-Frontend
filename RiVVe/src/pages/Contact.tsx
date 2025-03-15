import React, { useState, useEffect } from "react";
import {
  Send,
  Building2,
  Mail,
  Phone,
  Instagram,
  Facebook,
} from "lucide-react";
import Footer from "../components/footer/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load EmailJS SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.emailjs.init("C7KLbWo0B3hVsXjO9");
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // EmailJS parameters
    const serviceID = "default_service";
    const templateID = "template_4l990f7";
    const templateParams = {
      name: formData.name,
      email: formData.email,
      phoneno: formData.phoneno,
      subject: formData.subject,
      message: formData.message,
    };

    // Send email using EmailJS
    window.emailjs
      .send(serviceID, templateID, templateParams)
      .then(() => {
        setSubmitted(true);
        setIsLoading(false);
        setFormData({
          name: "",
          email: "",
          phoneno: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        setIsLoading(false);
        alert("Failed to send message. Please try again later.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div
        className="h-[400px] relative bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Contact Us
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
              Get in touch with our team for any questions about our hostels or
              assistance with your booking
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-16">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Let's Connect
            </h2>
            <p className="text-gray-400 text-lg">
              Whether you're a student or a hostel owner looking to join our
              marketplace, we're here to help make your journey easier.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                <Phone className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">Phone</h3>
                <p className="text-gray-400">+94 766 992535</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">Email</h3>
                <p className="text-gray-400">rivvelk@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                <Instagram className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">
                  Instagram
                </h3>
                <p className="text-gray-400">@rivve_lk</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                <Facebook className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">
                  Facebook
                </h3>
                <p className="text-gray-400">@rivvelk</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors duration-300">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xl text-white mb-2">
                  Business Hours
                </h3>
                <p className="text-gray-400">Monday - Sunday: 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600/5 rounded-2xl transform -rotate-6"></div>
          <div className="relative bg-gray-800 rounded-2xl p-8 shadow-xl">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                    placeholder="Your name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute -top-2.5 left-4 px-2 bg-gray-800 text-sm text-gray-400"
                  >
                    Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                  <label
                    htmlFor="email"
                    className="absolute -top-2.5 left-4 px-2 bg-gray-800 text-sm text-gray-400"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    id="phoneno"
                    name="phoneno"
                    value={formData.phoneno}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                    placeholder="Your phone number"
                  />
                  <label
                    htmlFor="phoneno"
                    className="absolute -top-2.5 left-4 px-2 bg-gray-800 text-sm text-gray-400"
                  >
                    Phone Number
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-white placeholder-gray-500"
                    placeholder="What's this about?"
                  />
                  <label
                    htmlFor="subject"
                    className="absolute -top-2.5 left-4 px-2 bg-gray-800 text-sm text-gray-400"
                  >
                    Subject
                  </label>
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="block w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors duration-200 text-white placeholder-gray-500 resize-none"
                    placeholder="Your message here..."
                  />
                  <label
                    htmlFor="message"
                    className="absolute -top-2.5 left-4 px-2 bg-gray-800 text-sm text-gray-400"
                  >
                    Message
                  </label>
                </div>
              </div>

              <button
                id="button"
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3 border-2 border-blue-500 rounded-lg text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Send Message
                  </>
                )}
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg flex items-center justify-center">
                  Thank you for your message! We'll get back to you soon.
                  #teamRiVVE
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
