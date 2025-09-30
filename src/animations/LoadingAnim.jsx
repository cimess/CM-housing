// LoadingAnimation.jsx
import { motion } from "framer-motion";

export default function LoadingAnimation({ size = 60, color = "#3498db" }) {
  return (
    <div className="flex justify-center items-center w-full h-[100vh]">
       <motion.div
      style={{
        width: size,
        height: size,
        border: "6px solid #ddd",
        borderTop: `6px solid ${color}`,
        borderRadius: "50%",
      }}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
    />
    </div>
   
  );
}
