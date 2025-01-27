/**
 * Footer component
 * 
 * Displays the map provider and layer provider attribution.
 * 
 * @component
 */

const Footer = () => {
  return (
    <footer>
      <div>GeoQuizzer 2025</div>
      <div>
        <a
          href="https://leafletjs.com"
          title="A JavaScript library for interactive maps"
        >
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            className="leaflet-attribution-flag"
          >
            <path fill="#4C7BE1" d="M0 0h12v4H0z"></path>
            <path fill="#FFD500" d="M0 4h12v3H0z"></path>
            <path fill="#E0BC00" d="M0 7h12v1H0z"></path>
          </svg>
          Leaflet |{" "}
        </a>
        &copy;{" "}
        <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>{" "}
        contributors |{" "}
        <a>
          Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX,
          GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
          Community |{" "}
        </a>
        &copy; <a href="www.geoboundaries.org,">GeoBoundaries</a>{" "}
        | &copy;{" "}
        <a href="https://commons.wikimedia.org/wiki/Main_Page" target="_blank">
          WikiMedia
        </a>
      </div>
    </footer>
  );
};

export default Footer;
