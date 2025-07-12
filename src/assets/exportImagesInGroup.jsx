

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
import room12 from '../assets/images/sub/alex-tyson-uACqYsS8hzQ-unsplash.jpg'
import room13 from '../assets/images/sub/collov-home-design-HxRvdKHVAYY-unsplash.jpg'
import room14 from '../assets/images/sub/collov-home-design-NTaF5rBmlyE-unsplash.jpg'
import room15 from '../assets/images/sub/lotus-design-n-print-rk_t-yyJak0-unsplash.jpg'
import room16 from '../assets/images/sub/neon-wang-XQZwgyecGXk-unsplash.jpg'
import room17 from '../assets/images/sub/pipcke-g_5UyVBIX_k-unsplash.jpg'
import room18 from '../assets/images/sub/spacejoy-4xRP0Ajk9ys-unsplash.jpg'
import room19 from '../assets/images/sub/spacejoy-5oWo6A2IKTc-unsplash.jpg'
import room20 from '../assets/images/sub/spacejoy-c0JoR_-2x3E-unsplash.jpg'
import room21 from '../assets/images/sub/spacejoy-ctyssSFmXmU-unsplash.jpg'
import room22 from '../assets/images/sub/spacejoy-NpF_OYE301E-unsplash.jpg'
import room23 from '../assets/images/sub/spacejoy-vPKNB_gc23Q-unsplash.jpg'
import room24 from '../assets/images/sub/spacejoy-YqFz7UMm8qE-unsplash.jpg'

const image={
   room1:[room1,room12],
   room2:[room2,room13],
   room3:[room3,room14],
   room4:[room4,room15],
   room5:[room5,room16],
   room6:[room6,room17],
   room7:[room7,room18],
   room8:[room8,room19],
   room9:[room9,room20],
   room10:[room10,room21],
   room11:[room11,room22],
   room12:[room12,room23],
}


 const exportImages={
   shortlet:[image.room1,image.room2,image.room3,image.room4,image.room5,image.room6,image.room7,image.room8,image.room9,image.room10,image.room11,image.room12],
   src:['www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com','www.fb.com',],
   owner:["Mr Francis","T&T","T&T","Mr Francis","Mr Emma","Mr Francis","Osas Housing","Osas Housing","Mr Lucky","Mr Jude","Mr Francis",],
   location:["Abuja","Lagos","Edo","Abuja","Kwara","Kano","Ogun","Osun","Kogi","Abuja",'Jos'],
   pet:["Yes","No","Yes","Yes","Yes","No","Yes","Yes","Yes","Yes","Yes",],
   bedrooms:['1','2','1','4','2','1','2','1','1','1','1'],
   bathrooms:['1','2','1','4','2','1','2','1','1','1','1',],
   description:["two bedroom room flat with kitchen and nice dining ",'Pet-friendly cottage for large group holidays in picturesque Symonds Yat, offering an idyllic retreat from the hustle and bustle of everyday life for 26 people in 11 ensuite bedrooms.','Thicket Priory is nestled in the North Yorkshire countryside, however only 20 minutes drive from the center of York! The perfect celebration get-away!','With pink wisteria-clad walls, oak-panelled billiards room and croquet on the lawn, Nedging Hall is exactly as a Suffolk country house should be.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.','A fine country house, venerable and serene, secluded in its ruff of ancient woodland.'],
   duration:["1","3","2","3","5","4","3","1","3","3","2","1"],
   price:["19000","2400","17000","10000","50000","16000","70000","80000","11000","20000","12000",'500'],
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