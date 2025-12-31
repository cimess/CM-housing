import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faTiktok, } from '@fortawesome/free-brands-svg-icons';
import ThemeToggle from "@/components/ThemeToggle";
import { useLoginAuth } from "@/Authentication/Usecontext-logic";
import { Link } from "react-router-dom";

const SlideInSidebar = ({ isOpen, setIsOpen }) => {
  const { isLogin } = useLoginAuth();
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    // Wrapper always mounted to allow animation
    <div
      className={` fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    >
      {/* Sidebar */}
      <div
        className={`bg-background text-foreground border-r border-border rounded-r-2xl shadow-2xl absolute left-0 top-0 h-screen w-[80%] md:w-[20%] transform p-4 transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="flex-1 flex flex-col relative h-full min-h-0">

          <div className="flex items-center justify-between mb-8 shrink-0">
            <h2 className="text-2xl font-serif font-bold">CM-Housing</h2>
            <button
              className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="shrink-0">
            <UserProfileSection />
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 min-h-0 scrollbar-hide">
            {/* Navigation */}
            <div className='flex flex-col gap-2 font-medium' onClick={toggleSidebar}>
               <Link to='/' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                 Home
               </Link>

               {!isLogin && (
                 <>
                   <Link to='/Login' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     Login
                   </Link>
                   <Link to='/Register' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     Sign Up
                   </Link>
                 </>
               )}

               {isLogin && (
                 <>
                   <Link to='/MyAdvertComponent' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     My Dashboard
                   </Link>
                   <Link to='/MyMessagePage' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     My Messages
                   </Link>
                   <Link to='/HouseRegister' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     List Property
                   </Link>
                   <Link to='/Profile' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                     Edit Profile
                   </Link>
                 </>
               )}

                <Link to='/?filter=all' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                  All Properties
                </Link>
                <Link to='/?filter=shortLet' className='block w-full text-center bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors text-foreground'>
                  Short Let
                </Link>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center justify-between bg-secondary/30 p-4 rounded-xl">
              <span className="font-medium">Appearance</span>
              <ThemeToggle />
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Search by Location</h3>
              <div className='space-y-2 font-light'>
                {['Lagos', 'Abuja', 'Osun', 'Ogun', 'Oyo', 'Edo', 'Kano'].map((state) => (
                  <p key={state} className='p-2 hover:bg-secondary/50 rounded-lg cursor-pointer transition-colors border-b border-border/50 last:border-0'>
                    {state} State
                  </p>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                 <div>
                    <span className='font-bold block text-primary'>Email:</span>
                    <a href="mailto:cimessthemanofvalor@gmail.com" className="hover:underline break-words">cimessthemanofvalor@gmail.com</a>
                 </div>
                 <div>
                    <span className='font-bold block text-primary'>Phone:</span>
                    <a href="tel:+2349065440424" className="hover:underline">+234 906 544 0424</a>
                 </div>
                 <div className="flex gap-4 pt-2">
                    <a href="https://www.facebook.com/profile.php?id=100070880838814" className="text-2xl hover:text-primary transition-colors"><FontAwesomeIcon icon={faFacebook}/></a>
                    <a href="https://www.tiktok.com/@aimuanthankgod?lang=en" className="text-2xl hover:text-primary transition-colors"><FontAwesomeIcon icon={faTiktok}/></a>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const UserProfileSection = () => {
  const { isLogin, user } = useLoginAuth();

  if (!isLogin || !user) return null;

  return (
    <div className="mb-6 flex items-center gap-3 p-3 bg-secondary/30 rounded-xl">
      <div className="w-12 h-12 rounded-full overflow-hidden border border-primary/20 bg-background flex items-center justify-center">
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="font-bold text-lg text-primary">
            {user.firstname?.[0]?.toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <h3 className="font-bold text-sm">
          {user.firstname} {user.lastname}
        </h3>
        <p className="text-xs text-muted-foreground truncate max-w-[150px]">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default SlideInSidebar;
