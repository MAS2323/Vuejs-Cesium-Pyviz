<!-- # Componente principal del mapa -->
<template>
  <div class="cesium-container">
    <div id="cesiumContainer"></div>
  </div>
  <div>
    <DefaultLayout />
  </div>
</template>

<script setup>
import DefaultLayout from "./../layouts/DefaultLayout.vue";
import { onMounted } from "vue";
onMounted(function () {
  const viewer = new Cesium.Viewer("cesiumContainer", {
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
  });

  /**-------------------Campo del tiempo----------------------- */
  viewer._cesiumWidget._creditContainer.style.display = "none";
  viewer.timeline.makeLabel = DateTimeFormatter;
  function DateTimeFormatter(datetime) {
    const julianDT = new Cesium.JulianDate();
    Cesium.JulianDate.addHours(datetime, 8, julianDT);
    const date = Cesium.JulianDate.toGregorianDate(julianDT);
    let objDT =
      date.year + "/" + date.month + "/" + date.day + " " + date.hour + ":00";
    return objDT;
  }
  const date = Cesium.JulianDate.fromDate(new Date());
  viewer.timeline.zoomTo(
    Cesium.JulianDate.addHours(date, -24, new Cesium.JulianDate()),
    Cesium.JulianDate.addHours(date, 24, new Cesium.JulianDate())
  );
  const token = "ac3385d7bfe8301140eb2c35b0e415ee";
  const tdtUrl = "https://t{s}.tianditu.gov.cn/";
  const subdomains = ["0", "1", "2", "3", "4", "5", "6", "7"];

  /*------------------------------加载天地图--------------------------- */
  // 叠加天地图影像服务
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    })
  );

  // 叠加天地图影像主记服务
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    })
  );
  // 叠加天地图全球境界服务
  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: tdtUrl + "DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=" + token,
      subdomains: subdomains,
      tilingScheme: new Cesium.WebMercatorTilingScheme(),
      maximumLevel: 18,
    })
  );
  // 将三维球定位到中国 # esto es para que muestre el mapa de china por defecto
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(103.84, 31.15, 17850000),
  });

  /*-----------------------------渲染设置--------------------------------- */
  viewer.scene.globe.depthTestAgainstTerrain = true; // 开启地形深度测试
  viewer.scene.globe.showGroundAtmosphere = true; // 开启大气
  viewer.scene.globe.enableLighting = true; // 尹启光照
  viewer.scene.skyAtmosphere.show = true; // t
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true; // 视角不可穿透
  viewer.scene.highDynamicRange = true; // #ÄHDR

  // 阴影
  viewer.shadows = true; // 开启阴影
  Viewer.shadowMap.softShadows = true; // 软阴影
  viewer.shadowMap.darkness = 0.2; // 阴影颜色
  Viewer.shadowMap.cascadesEnabled = true; // 启用级联阴影
  viewer.shadowMap.numberOfCascades = 4; // 级联阴影层级
  viewer.shadowMap.maximumDistance = 50000; // 最大阴影距离
  Viewer.shadowMap.size = 8192; // 阴影贴图分辦率
  Viewer.shadowMap.normal0ffset = true; // 启用法线偏移
  viewer.shadowMap.fadingEnabled = true; // 启用阴影渐变

  // 抗锯齿
  if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
    viewer.resolutionScale = window.devicePixelRatio;
  }
  viewer.scene.fxaa = true; //开启快速近似抗锯齿
  viewer.scene.postProcessStages.fxaa.enabled = true; // 后处理开启抗锯齿
  // Ajusta el tamaño del canvas al tamaño de la ventana
  function resizeCesiumCanvas() {
    const canvas = viewer.scene.canvas;
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    viewer.scene.requestRender(); // Obliga a Cesium a volver a renderizar
  }

  // Llamar a la función de ajuste de tamaño en carga y en cambios de tamaño de ventana
  resizeCesiumCanvas();
  window.addEventListener("resize", resizeCesiumCanvas);
  window.viewer = viewer;
  this.loadscence();
});

async function loadscence() {
  //异步函数
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2876903); //加载Ion中的资产
    tileset.maximumScreenSpaceError = 2; //最大屏幕空间误差
    const translation = new Cesium.Cartesian3(0, -5, 0);
    tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation); //₴_|13z)]
    window.viewer.scene.primitives.add(tileset); //场景中添加模型
    window.viewer.zoomTo(tileset); //聚焦到模型位置
  } catch (error) {
    alert(error);
  }
}
loadscence();
</script>

<style scoped></style>
