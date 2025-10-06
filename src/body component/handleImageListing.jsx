


function HandleHouseListing({houses}) {
 
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {houses.map((house,index) => (
        <HouseListing
          key={index}
          {...house} // spread props (image, price, etc.)
        />
      ))}
    </div>
  );
}

export default HandleHouseListing;
