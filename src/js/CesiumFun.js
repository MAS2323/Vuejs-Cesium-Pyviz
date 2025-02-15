import * as Cesium from "cesium";

/**
 * Calcula la distancia entre dos puntos en metros.
 * @param {Object} pointA - Primer punto con propiedades `longitude` y `latitude`.
 * @param {Object} pointB - Segundo punto con propiedades `longitude` y `latitude`.
 */
export const calculateDistance = (pointA, pointB) => {
  const cartesianA = Cesium.Cartesian3.fromDegrees(
    pointA.longitude,
    pointA.latitude
  );
  const cartesianB = Cesium.Cartesian3.fromDegrees(
    pointB.longitude,
    pointB.latitude
  );

  const distance = Cesium.Cartesian3.distance(cartesianA, cartesianB);
  alert(`La distancia es: ${distance.toFixed(2)} metros`);
};
