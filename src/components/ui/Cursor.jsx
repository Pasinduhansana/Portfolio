import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Add event listeners for cursor movement
    window.addEventListener('mousemove', mouseMove);

    // Add event listeners for interactive elements
    const handleMouseEnter = () => setCursorVariant('hover');
    const handleMouseLeave = () => setCursorVariant('default');

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Cursor animations
  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      transition: {
        type: 'spring',
        mass: 0.1,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
      borderColor: '#0ea5e9',
      transition: {
        type: 'spring',
        mass: 0.1,
      },
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      transition: {
        type: 'spring',
        mass: 0.05,
      },
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 0.5,
      transition: {
        type: 'spring',
        mass: 0.05,
      },
    },
  };

  return (
    <>
      <motion.div
        className="custom-cursor-outer"
        variants={variants}
        animate={cursorVariant}
      />
      <motion.div
        className="custom-cursor-inner"
        variants={dotVariants}
        animate={cursorVariant}
      />
    </>
  );
};

export default Cursor;