import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ...existing code...
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch("https://formspree.io/f/mbloedoj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "gallagepasinduhansana@gmail.com",
      link: "mailto:gallagepasinduhansana@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+94 74 160 5140",
      link: "tel:+94741605140",
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Elpitiya, Sri Lanka",
      link: "https://maps.google.com",
    },
  ];

  return (
    <section
      id="contact"
      className="section bg-dark-300 dark:bg-gray-100 text-[14px]"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="section-title text-center mb-16">Get in Touch</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="prose prose-invert dark:prose-light max-w-none mb-8">
                <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
                <p className="text-gray-400 dark:text-gray-600">
                  I'm always open to discussing new projects, creative ideas or
                  opportunities to be part of your visions.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-dark-200 hover:shadow-sm dark:bg-white rounded-lg  hover:bg-dark-100 dark:hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <info.icon className="w-6 h-6 text-primary-500 mr-4" />
                    <div>
                      <h4 className="font-medium text-gray-200 dark:text-gray-800">
                        {info.title}
                      </h4>
                      <p className="text-gray-400 dark:text-gray-600">
                        {info.content}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-200 dark:bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 bg-dark-100 dark:bg-gray-50 rounded-lg border border-gray-700 dark:border-gray-200 focus:outline-none focus:border-primary-500"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 bg-dark-100 dark:bg-gray-50 rounded-lg border border-gray-700 dark:border-gray-200 focus:outline-none focus:border-primary-500"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    rows="5"
                    className="w-full px-4 py-3 bg-dark-100 dark:bg-gray-50 rounded-lg border border-gray-700 dark:border-gray-200 focus:outline-none focus:border-primary-500"
                    placeholder="Your message"
                  ></textarea>
                  {errors.message && (
                    <span className="text-red-500 text-sm">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-700 text-white py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                {submitStatus === "success" && (
                  <p className="text-green-500 text-center">
                    Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-500 text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
