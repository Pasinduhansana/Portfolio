import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/Pasinduhansana",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/in/pasindu-hansana",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://twitter.com/Pasinduhansana",
      label: "Twitter",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:gallagepasinduhansana@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="relative bg-dark-400 dark:bg-white text-white dark:text-gray-800 text-[14px]">
      {/* Diagonal Edge */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-dark-300 dark:bg-gray-100 transform -skew-y-2 -translate-y-10"></div>

      <div className="relative container mx-auto px-4 pt-20 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold gradient-text mb-4"
            >
              Pasindu Hansana
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 dark:text-gray-600 mb-6 max-w-[500px]"
            >
              Young & dynamic individual experience in marketing & IT Sector
              focus on working with and organization that promicess a
              challenging career in a progressive environment with corperative
              work culture that fosters the steady growth of the organization &
              to leverage my strenght & knowledge to become a successful &
              valued individual.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 ">
              {["Home", "Projects", "About", "Skills", "Contact"].map(
                (link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-600 transition-colors duration-300 relative inline-block group"
                    >
                      {link}
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="grid grid-cols-1 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-600 transition-colors duration-300 relative group"
                >
                  {link.icon}
                  <span className="text-sm relative">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <h5 className="text-[15px] font-normal mb-2">Total Visitors</h5>
              <p className="text-3xl font-bold text-primary-500">10.2K</p>
            </div>
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <h5 className="text-[15px] font-normal mb-2">Avg. Session</h5>
              <p className="text-3xl font-bold text-primary-500">4:30</p>
            </div>
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">
              <h5 className="text-[15px] font-normal mb-2">Bounce Rate</h5>
              <p className="text-3xl font-bold text-primary-500">32%</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center text-gray-400 dark:text-gray-600">
          <p>&copy; {currentYear} Pasindu Hansana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
