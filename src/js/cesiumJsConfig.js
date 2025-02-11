const token = "ac3385d7bfe8301140eb2c35b0e415ee";
const tdtUrl = "https://t{s}.tianditu.gov.cn/";
const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

const targetLocation = {
  destination: Cesium.Cartesian3.fromDegrees(
    9.041914842288406,
    48.833119059728752,
    20
  ),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
  },
};

const getViewer = {
  animation: false,
  baseLayerPicker: true,
  scene3DOnly: true,
  fullScreenButton: true,
  geocoder: false,
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

const imageProviderUno = createImageryProvider("img_w");
const imageProviderDos = createImageryProvider("cia_w");
const imageProviderTres = createImageryProvider("ibo_w");

// const url = {
//   treeGlb: "./glbData/tree.glb",
// };

/**
 * Función para formatear la fecha en formato "yyyy/mm/dd hh:mm"
 * @param {Cesium.JulianDate} datetime - Fecha en formato JulianDate
 * @returns {string} - Fecha formateada
 */
export function DateTimeFormatter(datetime) {
  const julianDT = new Cesium.JulianDate();
  Cesium.JulianDate.addHours(datetime, 8, julianDT); // Ajustar la zona horaria si es necesario
  const date = Cesium.JulianDate.toGregorianDate(julianDT);
  return `${date.year}/${date.month}/${date.day} ${date.hour}:00`;
}

/**
 * Configura la línea de tiempo de Cesium con un rango de 48 horas.
 * @param {Cesium.Viewer} viewer - Instancia del visor de Cesium
 */
export function configureTimeline(viewer) {
  const date = Cesium.JulianDate.fromDate(new Date());
  viewer.timeline.zoomTo(
    Cesium.JulianDate.addHours(date, -24, new Cesium.JulianDate()), // 24 horas atrás
    Cesium.JulianDate.addHours(date, 24, new Cesium.JulianDate()) // 24 horas adelante
  );
}

export {
  targetLocation,
  getViewer,
  imageProviderTres,
  imageProviderDos,
  imageProviderUno,
};
// En tu archivo de configuración cesiumConfig.js
