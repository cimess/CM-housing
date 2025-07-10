

import Shortlet from '@/shortlet/shortlet-house';
import room1 from '../assets/images/shortlet/pexels-andreaedavis-32839361.jpg';
import room2 from '../assets/images/shortlet/pexels-artofxx-325140257-32853136.jpg';
import room3 from '../assets/images/shortlet/pexels-artyusufpatel-32854961.jpg';
import room4 from '../assets/images/shortlet/pexels-chaitaastic-1918291.jpg';
import room5 from '../assets/images/shortlet/pexels-fotoaibe-1571468.jpg';
import room6 from '../assets/images/shortlet/pexels-fotoaibe-1643384.jpg';
import room7 from '../assets/images/shortlet/pexels-fotoaibe-813692.jpg';
import room8 from '../assets/images/shortlet/pexels-john-tekeridis-21837-1428348.jpg';
import room9 from '../assets/images/shortlet/pexels-mariya-b-555701080-32877365.jpg';
import room10 from '../assets/images/shortlet/pexels-pixabay-271624.jpg';
import room11 from '../assets/images/shortlet/pexels-pixabay-275484.jpg';


 const exportImages={
   shortlet:[room1,room2,room3,room4,room5,room6,room7,room8,room9,room10,room11],
   src:['www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com',],
   owner:["Mr Francis","T&T","T&T","Mr Francis","Mr Emma","Mr Francis","Osas Housing","Osas Housing","Mr Lucky","Mr Jude","Mr Francis",],
   location:["Abuja","Lagos","Edo","Abuja","Kwara","Kano","Ogun","Osun","Kogi","Abuja",'Jos'],
   pet:["Yes","No","Yes","Yes","Yes","No","Yes","Yes","Yes","Yes","Yes",],
   bedrooms:['1','2','1','4','2','1','2','1','1','1','1'],
   bathrooms:['1','2','1','4','2','1','2','1','1','1','1',],
   description:["two bedroom room flat with kitchen and nice dining ",'Pet-friendly cottage for large group holidays in picturesque Symonds Yat, offering an idyllic retreat from the hustle and bustle of everyday life for 26 people in 11 ensuite bedrooms.','Thicket Priory is nestled in the North Yorkshire countryside, however only 20 minutes drive from the center of York! The perfect celebration get-away!','With pink wisteria-clad walls, oak-panelled billiards room and croquet on the lawn, Nedging Hall is exactly as a Suffolk country house should be.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.'],
   duration:["1","3","2","3","5","4","3","1","3","3","2",],
   price:["19000","2400","17000","10000","50000","16000","70000","80000","11000","20000","12000",],
   alt:['a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room','a picture of a room',]
}


export const Listing=exportImages.shortlet.map((img,i)=>({
   image:exportImages.shortlet[i],
   src:exportImages.src[i],
   pet:exportImages.pet[i],
   price:exportImages.price[i],
   bedrooms:exportImages.bedrooms[i],
   bathrooms:exportImages.bathrooms[i],
   duration:exportImages.duration[i],
   alt:exportImages.alt[i],
   location:exportImages.location[i],
   owner:exportImages.owner[i],
description:exportImages.description[i]
}))