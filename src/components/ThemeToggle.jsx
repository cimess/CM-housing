import { useTheme } from "@/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-black/20 dark:bg-white/10 rounded-full p-1 transition-colors duration-300 border border-white/10 backdrop-blur-sm"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center text-xs"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        style={{
          x: theme === "dark" ? 24 : 0,
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
        }}
      >
        <FontAwesomeIcon
          icon={theme === "dark" ? faMoon : faSun}
          className={theme === "dark" ? "text-yellow-400" : "text-orange-500"}
        />
      </motion.div>
    </button>
  );
}
