import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import image_path from "../../assets/Profile_PIC.jpeg";

const Hero = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Create transforms for parallax and face rotation effect
  const faceRotation = useTransform(scrollYProgress, [0, 1], [-25, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Container for the geometric shapes
  const shapeContainerRef = useRef(null);

  // Parallax effect for mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!shapeContainerRef.current) return;

      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      const shapes = shapeContainerRef.current.querySelectorAll(".shape");
      shapes.forEach((shape) => {
        const speed = shape.getAttribute("data-speed") || 20;
        const offsetX = (0.5 - x) * speed;
        const offsetY = (0.5 - y) * speed;

        shape.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={targetRef}
      className="section min-h-screen pt-20 flex items-center relative overflow-hidden"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content - left aligned */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{ y: textY }}
          className="order-2 lg:order-1"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-primary-500 font-medium mb-4"
          >
            Hello, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="heading-xl mb-6"
          >
            <span className="gradient-text">Pasindu Hansana</span>
            <br />
            Web Developer & Designer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-300 text-[16px] mb-8 max-w-lg"
          >
            I create beautiful, functional, and responsive websites using modern
            technologies. Specializing in creating unique digital experiences
            that blend innovation with usability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <button
              href="#projects"
              className="flex flex-row items-center h-[40px] btn btn-primary"
            >
              View My Work
              <ArrowRight size={18} />
            </button>
            <button
              href="#contact"
              className="flex flex-row items-center h-[40px] btn btn-outline"
            >
              Contact Me
            </button>
          </motion.div>
        </motion.div>

        {/* Face image with parallax effect - right aligned */}
        <motion.div
          className="relative order-1 lg:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Decorative shapes */}
          <div
            ref={shapeContainerRef}
            className="absolute inset-0 z-0 overflow-hidden"
          >
            <div
              className="shape absolute top-0 right-16 w-20 h-20 bg-primary-500/20 rounded-2xl rotate-12"
              data-speed="30"
            ></div>
            <div
              className="shape absolute bottom-1/4 right-0 w-16 h-16 bg-accent-500/10 rounded-full"
              data-speed="20"
            ></div>
            <div
              className="shape absolute top-1/3 left-0 w-24 h-24 bg-secondary-500/10 rounded-lg rotate-45"
              data-speed="40"
            ></div>
          </div>

          {/* Face image with rotation effect */}
          <motion.div
            className="relative z-10 mx-auto  max-w-sm lg:max-w-md xl:max-w-lg"
            style={{
              rotateY: faceRotation,
              scale: imgScale,
            }}
          >
            <img
              src={image_path}
              alt="Developer Portrait"
              className="w-full h-auto object-cover rounded-3xl max-h-[450px] max-w-[400px] shadow-2xl rotate-3 border-4 border-dark-200"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-30 rounded-3xl"></div>

            {/* Tech stack decorative elements */}
            <div className="absolute -left-6 -bottom-6 bg-dark-200 text-white p-4 rounded-xl shadow-lg border border-white/10 rotate-6">
              <div className="text-xs font-medium text-primary-400">
                Frontend
              </div>
              <div className="text-sm font-semibold">React & Next.js</div>
            </div>

            <div className="absolute -right-4 -top-4 bg-dark-200 text-white p-4 rounded-xl shadow-lg border border-white/10 -rotate-6">
              <div className="text-xs font-medium text-accent-400">UI/UX</div>
              <div className="text-sm font-semibold">Tailwind CSS</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="text-white/60 flex flex-col items-center cursor-pointer"
          onClick={() =>
            document
              .getElementById("projects")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
