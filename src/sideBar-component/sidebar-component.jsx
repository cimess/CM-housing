import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';
import NavLink from '@/home-component/navigation-link-component';
import { faFacebook,faTiktok, } from '@fortawesome/free-brands-svg-icons';
import ThemeToggle from "@/components/ThemeToggle";

const SlideInSidebar = ({ isOpen, setIsOpen }) => {
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
        className={`bg-background text-foreground border-r border-border rounded-r-2xl shadow-2xl absolute left-0 top-0 h-full w-[80%] md:w-[20%] transform p-4 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className="h-full flex flex-col relative">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold">CM-Housing</h2>
            <button
              className="w-8 h-8 rounded-full bg-secondary text-foreground flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8">
            {/* Navigation */}
            <div className='grid grid-cols-1 gap-y-2 font-medium' onClick={()=>toggleSidebar()}>
               <NavLink text='User Login' nav='/Login' style='bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors' />
               <NavLink text='House Owner' nav='/HouseOwner' style='bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors'/>
               <NavLink text='List your house' nav='/HouseRegister' style='bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors'/>
               <NavLink text='Sign in' nav='/Register' style='bg-secondary/50 hover:bg-primary/10 rounded-lg px-4 py-3 transition-colors' />
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

export default SlideInSidebar;
