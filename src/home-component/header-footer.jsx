     import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faEnvelope, faPhone, faMapMarkerAlt, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import logo from "../assets/images/logo/newIcon.png";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import NavLink from "./navigation-link-component";
import SlideInSidebar from "@/sideBar-component/sidebar-component";
import IsLoginFunction from "./login-homepage";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { Nav } from "./login-homepage";
import LogoutButton from "@/Page-component/logoutButton";
import { GsapFadeIn } from "@/animations/GsapWrapper";
import ThemeToggle from "@/components/ThemeToggle";

export default function Default({ children }) {
  const [state, setState] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isLogin } = useLoginAuth();
  const timeoutRef = useRef(null);
  const node = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (node.current && !node.current.contains(e.target)) {
        setState(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  function toggleDropdown() {
    setState((prev) => !prev);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setState(false);
    }, 5000);
  }

  const DropdownMenu = () => (
    <div className="absolute top-16 right-0 w-56 bg-white dark:bg-card border border-gray-100 dark:border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2">
      {!isLogin ? (
        <>
          <NavLink text="Login" nav="/Login" />
          <NavLink text="Sign Up" nav="/Register" />
        </>
      ) : (
        <>
          <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account
          </div>
          <NavLink text="List Property" nav="/HouseRegister" />
          <NavLink text="My Profile" nav="/Profile" />
          <NavLink text="Change Password" nav="/ResetPassword" />
          <div className="h-px bg-gray-100 dark:bg-white/10 my-1" />
          <LogoutButton />
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">

      {/* Floating Glass Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-300">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between">

          {/* Left: Hamburger (Mobile) & Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors md:hidden"
            >
              <FontAwesomeIcon icon={faBars} className="text-lg" />
            </button>
            <SlideInSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="CM Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-serif font-bold tracking-tight">
                CM<span className="text-primary">Housing</span>
              </span>
            </div>
          </div>

          {/* Center: Desktop Links (Optional - currently hidden/handled by sidebar, but could add here) */}
          <div className="hidden md:flex items-center gap-8">
             <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
             <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
             <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors">Properties</Link>
             <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-4 relative" ref={node}>
            <div className="hidden md:block">
               <IsLoginFunction />
            </div>

            <button
              onClick={toggleDropdown}
              aria-label="User menu"
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
            >
              <FontAwesomeIcon icon={faUser} />
            </button>

            {state && <DropdownMenu />}
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24 pb-10">
        {children}
      </main>

      {/* Fat Footer */}
      <footer className="bg-[#050505] text-white pt-20 pb-10 rounded-t-[3rem] mt-10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="CM Logo" className="w-12 h-12 grayscale brightness-200" />
              <span className="text-2xl font-serif font-bold">CM<span className="text-primary">Housing</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover the epitome of luxury living. We connect you with the most exclusive properties in Nigeria's prime locations.
            </p>
            <div className="flex gap-4">
              {[faFacebook, faInstagram, faTwitter, faLinkedin, faTiktok].map((icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-black transition-all duration-300">
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-gray-400">
              {['Home', 'About Us', 'Properties', 'Agents', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-primary" />
                <span>123 Luxury Lane, Victoria Island,<br />Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-primary" />
                <a href="tel:+2349065440424" className="hover:text-white transition-colors">+234 906 544 0424</a>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                <a href="mailto:info@cmhousing.com" className="hover:text-white transition-colors">info@cmhousing.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-serif font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get the latest property updates.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-primary/50 text-sm text-white placeholder:text-gray-600 transition-colors"
              />
              <button aria-label="Subscribe" className="absolute right-1 top-1 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CM-Housing Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
