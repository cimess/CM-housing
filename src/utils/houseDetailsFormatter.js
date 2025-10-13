export function houseDetailsFormatter(house) {
  console.log('the formeter log',house)
  return {
      _id:house._id,
    userId: house.user._id,
    alt:house.alt,
    consultation:house.consultationFee,
    ownerEmail:house.user.email,
  
    houseType:house.houseType,
    images: Array.isArray(house.images) && house.images.length > 0
      ? house.images
      : ["/placeholder.jpg"],   // always fallback to array
    location: house.location,
    bedrooms: house.bedrooms,
    bathrooms: house.bathrooms,
    description: house.description,
    furnished: house.furnished ? "Furnished" : "Unfurnished",
    pet: house.petAllowed ? "Yes" : "No",
    amenities: house.amenities || [],
    duration: house.durationType === "short" ? 'Short-Let' : 'Full-Let',
    price:
      house.durationType === "short"
        ? `${house.pricePerNight}`
        : `${house.rentPrice}`,
    owner:
      house.roleOfLister === "agent"
        ? `${house.companyName}`
        : "Landlord",
        createdAt:house.createdAt,
        role:house.roleOfLister
  };
}
