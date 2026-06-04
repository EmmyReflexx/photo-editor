import { undoState, redoState } from "./editing-engine.js"; 
import { imageState } from "../script.js";

export function safetyChecks() {
  // Limit undo history
  if (undoState.length > 50) {
    undoState.splice(0, 10); // Remove oldest 10 if too many
    console.debug("Cleaned up undo history (over 50 states)");
  }

  // Limit redo history

  if (redoState.length > 30) {
    redoState.splice(0, 10);
    console.debug("Cleaned up redo history (over 30 states)");
  }
  
  if (imageState.length === 0 || !imageState[imageState.length - 1]) {
    console.error("No valid image state available");
    return;
  }

  let imageStateIndex = imageState.length - 1;

  const currentState = imageState[imageStateIndex];
  if (!currentState.saturation || !currentState.brightness || !currentState.contrast) {
    console.error("Image state missing required properties");
    return;
  }
}