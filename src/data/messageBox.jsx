import { image } from "@/assets/exportImagesInGroup"
import { exportImages } from "@/assets/exportImagesInGroup"


   // const profile=message;
   const location=exportImages.location[1]
   const description=exportImages.description
   const pet=exportImages.pet
   const bathrooms=exportImages.bathrooms
   const beds=exportImages.bedrooms
   

export const message=[
   {name:'solomon224',
      lastname:'osas',
      phone:'+23400000000',
      password:'password',
      website:'https://cm-housing.netlify.app',
      email:'mydev@gmail.com',
      title:'igbesa school b/s boys-quarters',
      message:['hello',],
      picture:image.room1[0],
      price:250000,
      location:location,
      description:description[0],
      pet:pet[0],
      bathrooms:bathrooms[0],
      bedrooms:beds[0],
      feedback:'this is the best house i have seen in a while price is the best i will give it 5 stars'
   },
    {name:'emmanuel',
      title:'iyana ipaja 2bedrooms-flat',
      message:['i just saw the landlord',],
      picture:image.room1[1],
      price:300000,
       location:location,
      description:description[1],
      pet:pet[1],
      bathrooms:bathrooms[1],
      bedrooms:beds[1],feedback:'the landlord is very friendly and the house got a nice toilet that what i was concern about thanks CM-housing '
   },
    {name:'faith32',
      title:'self-contain kwara-poly ',
      message:['good morning cimess housing','love'],
      picture:image.room3[1],
      price:100000,
       location:location,
      description:description[3],
      pet:pet[3],
      bathrooms:bathrooms[3],
      bedrooms:beds[3],feedback:'the price is way high solomon224 house is way to high pls dont patronise him'
   },
   {name:'loverboy2222',
      title:'ayobo duplex ',
      message:['too far from my work place ','love'],
      picture:image.room2[1],
      price:170000,
       location:location,
      description:description[4],
      pet:pet[4],
      bathrooms:bathrooms[4],
      bedrooms:beds[4]
   },
   {name:'kingston',
      title:'Delight Housing ',
      message:['it was a perfect house my wife loves it','love','sir'],
      picture:image.room9[0],
      price:90000,
       location:location,
      description:description[5],
      pet:pet[5],
      bathrooms:bathrooms[5],
      bedrooms:beds[5]
   },
   {name:'sm agent',
      title:'ajah 2 storey-building ',
      message:['hello','love'],
      picture:image.room5[1],
       location:location,
      description:description[6],
      pet:pet[6],
      bathrooms:bathrooms[6],
      bedrooms:beds[6]
   }
]