mapboxgl.accessToken = maptoken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/standard-satellite",
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const el = document.createElement("div");
el.className = "custom-marker";
el.style.backgroundImage = "url(/assets/compass.png)";
el.style.width = "40px";
el.style.height = "40px";
el.style.backgroundSize = "100%";
el.style.borderRadius = "50%";
el.style.backgroundColor = "#FF5A5F ";

// 2. Add marker to map
const marker1 = new mapboxgl.Marker(el)
  .setLngLat(listing.geometry.coordinates)
  .addTo(map);

// 3. Setup popup instance for hover interaction
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
  offset: 30,
  className: "my-class",
});

// 4. Add layer and hover listeners on map load
map.on("load", () => {
  // Add GeoJSON source
  map.addSource("circle-source", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {
        description: `<h4>${listing.title}</h4><b><p>Exact Location provided after Booking!</p></b>`,
      },
      geometry: {
        type: "Point",
        coordinates: listing.geometry.coordinates,
      },
    },
  });

  // Add translucent radius circle layer
  map.addLayer({
    id: "circle-layer",
    type: "circle",
    source: "circle-source",
    paint: {
      "circle-radius": 70,
      "circle-color": "#FF5A5F",
      "circle-opacity": 0.2,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#FF5A5F",
    },
  });

  // Show popup on mouse enter
  map.on("mouseenter", "circle-layer", (e) => {
    map.getCanvas().style.cursor = "pointer";

    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = e.features[0].properties.description;

    // Ensure map wraps correctly over anti-meridian
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  // Hide popup on mouse leave
  map.on("mouseleave", "circle-layer", () => {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
