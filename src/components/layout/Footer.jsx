import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/yourname", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://linkedin.com/in/yourname", label: "LinkedIn" },
    { icon: <Twitter size={20} />, href: "https://twitter.com/yourname", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-dark-400 dark:bg-white text-white dark:text-gray-800">
      {/* Diagonal Edge */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-dark-300 dark:bg-gray-100 transform -skew-y-2 -translate-y-10"></div>
      
      <div className="relative container mx-auto px-4 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold gradient-text mb-4"
            >
              JD
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gray-400 dark:text-gray-600 mb-6"
            >
              Creating modern, responsive web experiences with cutting-edge technologies.
            </motion.p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Projects', 'About', 'Skills', 'Contact'].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-600 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="grid grid-cols-2 gap-4">
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
                  className="flex items-center gap-2 text-gray-400 dark:text-gray-600 hover:text-primary-500 dark:hover:text-primary-600 transition-colors duration-300"
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl">
              <h5 className="text-lg font-semibold mb-2">Total Visitors</h5>
              <p className="text-3xl font-bold text-primary-500">10.2K</p>
            </div>
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl">
              <h5 className="text-lg font-semibold mb-2">Avg. Session</h5>
              <p className="text-3xl font-bold text-primary-500">4:30</p>
            </div>
            <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl">
              <h5 className="text-lg font-semibold mb-2">Bounce Rate</h5>
              <p className="text-3xl font-bold text-primary-500">32%</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-400 dark:text-gray-600">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;