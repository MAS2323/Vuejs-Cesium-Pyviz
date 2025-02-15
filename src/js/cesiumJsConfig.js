import * as Cesium from "cesium";

const token = "ac3385d7bfe8301140eb2c35b0e415ee";
const tdtUrl = "https://t{s}.tianditu.gov.cn/";
const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

export const getViewer = {
  animation: false,
  baseLayerPicker: true,
  scene3DOnly: true,
  fullScreenButton: true,
  geocoder: true,
  timeline: true,
  vrButton: false,
  homeButton: false,
  infoBox: true,
  shouldAnimate: true,
  selectionIndicator: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  automaticallyTrackDataSourceClocks: false,
  sceneModePicker: false,
  terrain: Cesium.Terrain.fromWorldTerrain({ requestVertexNormals: true }),
  terrainExageration: 1.0,
};

const createImageryProvider = (layerType) => {
  return new Cesium.UrlTemplateImageryProvider({
    url: `${tdtUrl}DataServer?T=${layerType}&x={x}&y={y}&l={z}&tk=${token}`,
    subdomains: subdomains,
    tilingScheme: new Cesium.WebMercatorTilingScheme(),
    maximumLevel: 18,
  });
};

export const imageProviderUno = createImageryProvider("img_w");
export const imageProviderDos = createImageryProvider("cia_w");
export const imageProviderTres = createImageryProvider("ibo_w");

export function DateTimeFormatter(datetime) {
  const julianDT = new Cesium.JulianDate();
  Cesium.JulianDate.addHours(datetime, 8, julianDT);
  const date = Cesium.JulianDate.toGregorianDate(julianDT);
  return `${date.year}/${date.month}/${date.day} ${date.hour}:00`;
}

export function configureTimeline(viewer) {
  const date = Cesium.JulianDate.fromDate(new Date());
  viewer.timeline.zoomTo(
    Cesium.JulianDate.addHours(date, -24, new Cesium.JulianDate()),
    Cesium.JulianDate.addHours(date, 24, new Cesium.JulianDate())
  );
}
