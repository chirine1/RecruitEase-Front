const MapBox = () => {
  return (
    <div className="map-canvas">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3247.220205462936!2d11.0308056!3d35.5235556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzXCsDMxJzI0LjgiTiAxMcKwMDEnNTAuOSJF!5e0!3m2!1sfr!2stn!4v1713048974635!5m2!1sfr!2stn"
        width="600"
        height="450"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default MapBox;
