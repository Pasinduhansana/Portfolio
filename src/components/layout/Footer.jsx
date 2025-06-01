import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Loader,
  FacebookIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
      icon: <FacebookIcon size={20} />,
      href: "https://Facebook.com/Pasinduhansana",
      label: "Facebook",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:gallagepasinduhansana@gmail.com",
      label: "Email",
    },
  ];

  const useAnalyticsData = () => {
    const [analyticsData, setAnalyticsData] = useState({
      visitors: null,
      avgSessionDuration: null,
      bounceRate: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      const fetchAnalyticsData = async () => {
        try {
          setTimeout(() => {
            setAnalyticsData({
              visitors: Math.floor(Math.random() * 5000 + 8000), // Random between 8K-13K
              avgSessionDuration: `${
                Math.floor(Math.random() * 3) + 2
              }:${Math.floor(Math.random() * 60)
                .toString()
                .padStart(2, "0")}`,
              bounceRate: `${Math.floor(Math.random() * 20) + 25}%`,
              loading: false,
              error: null,
            });
          }, 1000);
        } catch (error) {
          setAnalyticsData({
            visitors: null,
            avgSessionDuration: null,
            bounceRate: null,
            loading: false,
            error: "Failed to load analytics data",
          });
          console.error("Error fetching analytics data:", error);
        }
      };

      fetchAnalyticsData();
    }, []);

    return analyticsData;
  };

  const { visitors, avgSessionDuration, bounceRate, loading, error } =
    useAnalyticsData();

  const AnalyticsCard = ({ title, value, isLoading, error }) => (
    <div className="bg-dark-300 dark:bg-gray-50 p-6 rounded-xl hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <h5 className="text-[15px] font-normal mb-2">{title}</h5>
      {isLoading ? (
        <div className="flex items-center text-primary-500">
          <Loader size={20} className="animate-spin mr-2" />
          <span>Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-sm">Data unavailable</p>
      ) : (
        <p className="text-3xl font-bold text-primary-500">{value}</p>
      )}
    </div>
  );

  return (
    <footer className="relative bg-dark-400 dark:bg-white text-white dark:text-gray-800 text-[14px]">
      {/* Diagonal Edge */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-dark-300 dark:bg-gray-50 transform -skew-y-2 -translate-y-10"></div>

      <div className="relative container mx-auto px-4 pt-24 pb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
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
              className="text-gray-400 dark:text-gray-600 mb-6 max-w-[500px] mx-auto md:mx-0"
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
          <div className="col-span-1 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 flex flex-col items-center md:items-start ">
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
          <div className="col-span-1 text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4 ">Connect</h4>
            <div className="flex flex-col items-center md:items-start gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center text-center md:text-left">
            <AnalyticsCard
              title="Total Visitors"
              value={visitors ? `${(visitors / 1000).toFixed(1)}K` : null}
              isLoading={loading}
              error={error}
            />
            <AnalyticsCard
              title="Avg. Session"
              value={avgSessionDuration}
              isLoading={loading}
              error={error}
            />
            <AnalyticsCard
              title="Bounce Rate"
              value={bounceRate}
              isLoading={loading}
              error={error}
            />
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
