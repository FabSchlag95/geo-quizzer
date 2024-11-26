import L from "leaflet";
import regular from "../../assets/quizzer-icon.svg";
import previous from "../../assets/quizzer-icon-previous.svg";

export const quizzerIcon = new L.Icon({
  iconUrl: regular,
  iconAnchor: [55, 90],
  popupAnchor: null,
  className: "marker",
  iconSize: new L.Point(110, 100),
});

export const previousMarkerIcon = (color) => {
  const svg = `
    <svg viewBox="0 0 129 195" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_51_11)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M64.5 185.5C64.5 185.5 123 99 123 60.5C123 28.1913 96.8086 2 64.5 2C32.1913 2 5.99997 23 5.99997 60.5C5.99998 98 64.5 185.5 64.5 185.5ZM64.6969 56.043L54.5151 38H35.606L54.0302 69L34.9999 100L54.1515 100L64.6969 81.5937H65.1818L75.7272 100H94.9999L75.7272 69L94.2727 38H75.4848L65.1818 56.043H64.6969Z" fill="${color}"/>
    </g>
    <defs>
    <filter id="filter0_d_51_11" x="0.499969" y="0.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2.75"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.78 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_51_11"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_51_11" result="shape"/>
    </filter>
    </defs>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconAnchor: [25, 75],
    iconSize: [50,50],
  });
};
