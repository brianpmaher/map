import "./style.css";

import Camera from "@arcgis/core/Camera";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TileLayer from "@arcgis/core/layers/TileLayer";
import { defineCustomElements } from "@arcgis/map-components/dist/loader";

defineCustomElements(window, {
  resourcesUrl: "https://js.arcgis.com/map-components/4.30/assets",
});

document.addEventListener("DOMContentLoaded", () => {
  const sceneEl = document.querySelector("arcgis-scene")!;
  sceneEl.camera = new Camera({
    position: {
      latitude: 45,
      longitude: -100,
      z: 7_000_000,
    },
  });

  const transportationLayer = new TileLayer({
    url: "https://server.arcgisonline.com/arcgis/rest/services/Reference/World_Transportation/MapServer",
    id: "streets",
    opacity: 0.7,
  });

  const housingLayer = new TileLayer({
    url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
    id: "ny-housing",
  });

  const graphicsLayer = new GraphicsLayer({
    elevationInfo: { mode: "on-the-ground" },
  });

  sceneEl.addLayers([transportationLayer, housingLayer, graphicsLayer]);
});
