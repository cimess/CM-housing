export function houseDetailsFormatter(house) {
  return {
    id: house._id,
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
    duration: house.durationType === "short" ? house.maxDuration : 12,
    price:
      house.durationType === "short"
        ? `${house.pricePerNight}`
        : `${house.rentPrice}`,
    owner:
      house.roleOfLister === "agent"
        ? `${house.companyName} (Agent)`
        : "Landlord",
  };
}
