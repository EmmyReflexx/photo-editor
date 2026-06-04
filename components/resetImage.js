import { imageState } from "../script.js";
import { undo, redo, renderImageFilters, undoState, redoState } from "./editing-engine.js";

export function resetImageState() {
  const uploadedImage = document.getElementById('uploadedImage');
  if(!uploadedImage) return;

  const defaultState = {
    saturation: [1],
    contrast: [1],
    brightness: [1],
    sepia: 0,
    grayscale: 0,
    blur: 0,
  }

  imageState[0] = defaultState;

  renderImageFilters()
  // let undoStateIndex = undoState.length - 1;
  // let redoStateIndex = redoState.length - 1;

  // undoState.splice(0, undoStateIndex)
  // redoState.splice(0, redoStateIndex)
}


export function deleteImageState() {
  const defaultState = {
    saturation: [1],
    contrast: [1],
    brightness: [1],
    sepia: 0,
    grayscale: 0,
    blur: 0,
  }

  imageState[0] = defaultState;
  let undoStateIndex = undoState.length - 1;
  let redoStateIndex = redoState.length - 1;

  undoState.splice(0, undoStateIndex)
  redoState.splice(0, redoStateIndex)
}
