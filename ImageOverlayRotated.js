import { MapLayer, withLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet-imageoverlay-rotated";

import {
  createElementObject,
  createLayerComponent,
  extendContext,
  updateMediaOverlay,
} from "@react-leaflet/core";

function createImageOverlayRotated(
  { url, topLeft, topRight, bottomLeft, ...options },
  ctx
) {
  const overlay = new L.imageOverlay.rotated(
    url,
    topLeft,
    topRight,
    bottomLeft,
    {
      interactive: false,
      ...options,
    }
  );
  return createElementObject(
    overlay,
    extendContext(ctx, {
      overlayContainer: overlay,
    })
  );
}
function updateImageOverlayRotated(overlay, props, prevProps) {
  //updateMediaOverlay(overlay, props, prevProps);
  if (
    props.topLeft !== prevProps.topLeft ||
    props.topRight !== prevProps.topRight ||
    props.bottomLeft !== prevProps.bottomLeft
  ) {
    overlay.reposition(props.topLeft, props.topRight, props.bottomLeft);
  }
  if (props.url !== prevProps.url) {
    overlay.setUrl(props.url);
  }
}
const useImageOverlayRotatedElement = createElementHook(
  createImageOverlayRotated,
  updateImageOverlayRotated
);
const useImageOverlayRotated = createPathHook(useImageOverlayRotatedElement);
export const ImageOverlayRotated = createContainerComponent(
  useImageOverlayRotated
);
