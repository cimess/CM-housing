import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark,faPlus } from '@fortawesome/free-solid-svg-icons';

import NavLink from '@/home-component/navigation-link-component';


import { faFacebook,faTiktok, } from '@fortawesome/free-brands-svg-icons';


const SlideInSidebar = ({ isOpen, setIsOpen }) => {
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    // Wrapper always mounted to allow animation
    <div
      className={` fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={toggleSidebar}
    >
      {/* Sidebar */}
      <div
        className={`bg-white rounded shadow-lg absolute left-0 top-0 h-full w-1/2  md:w-[20%] transform p-1 transition-transform duration-300 ease-in-out  ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } `}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
      >
        <div className=" h-full text-black flex items-start ">
          <div className=' h-fit   pt-2 grid grid-cols-1 gap-y-1 w-full'>
            <h2 className="text-xl font-bold mb-4 ml-1 ">CM-Housing</h2>
           <div className='grid grid-cols-1 gap-y-1 font-bold my-5'onClick={()=>toggleSidebar()}>
                 <NavLink text='User Login' nav='/Login' style='shadow-sm border border-gray-200' />
             <NavLink text='House Owner' nav='/HouseOwner' style='shadow-sm border border-gray-200'/>
             <NavLink text=' List your house' nav='/HouseRegister' style='shadow-sm border border-gray-200'/>
             <NavLink text=' Sign in' nav='/Register' style='shadow-sm border border-gray-200' />
             </div>


<div>
  <h2 >Search by Location</h2>
  <div className='  w-[95%] mx-auto mt-5 font-light'>
    <p className='hover-me hover-bg border-b border-gray-200 '>Lagos State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Abuja State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Osun State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Ogun State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Oyo State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Edo State</p>
    <p className='hover-me hover-bg border-b border-gray-200' >Kano State</p>
  </div>
</div>

<div>
    <div className="w-fit">
            <p className=" mx-3 text-center ">Contact Us</p>
          <div className="grid space-y-1  text-sm font-extralight">
            <span className='font-bold block'>email:</span> <a href="mailto:cimessthemanofvalor@gmail.com" className=" break-words ">
              cimessthemanofvalor@gmail.com</a>
        <span className='font-bold'>Phone :</span>     <a href="tel:+2349065440424" >+2349065440424</a>
              <a href="https://www.facebook.com/profile.php?id=100070880838814" > <FontAwesomeIcon icon={faFacebook}/> Facebook</a>
               <a href="https://www.tiktok.com/@aimuanthankgod?lang=en" > <FontAwesomeIcon icon={faTiktok}/> Tiktok</a>
                 
          </div>
           </div>
</div>
          </div>
          <button
            className=" p-3 w-2 h-2 rounded-full bg-black text-white flex items-center justify-center hover:bg-red-600 -ml-8 mt-2 "
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideInSidebar;
