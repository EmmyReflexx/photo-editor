import { imageState, imageStateIndex } from "../script.js";
import { safetyChecks } from "./saftyChecks.js";

export let Imagefilters;

export let undoState = []
export let redoState = []

let undoMap = []

export function renderImageFilters() {
  // if(!uploadedImage) return;

  safetyChecks()

  const undoBtn = document.getElementById('undoBtn')
  const redoBtn = document.getElementById('redoBtn')

  if (undoState.length > 0) {
    undoBtn.disabled = false
  } else if (undoState.length > 20) {
    undoState.shift()
  } else {
    undoBtn.disabled = true
  }
  if (redoState.length > 0) {
    redoBtn.disabled = false
  } else {
    redoBtn.disabled = true
  }

  const uploadedImage = document.getElementById('uploadedImage')

  let saturationStateIndex = imageState[imageStateIndex].saturation.length - 1;
  const saturateState = imageState[imageStateIndex].saturation[saturationStateIndex]

  let brightnessStateIndex = imageState[imageStateIndex].brightness.length - 1;
  const brightnessState = imageState[imageStateIndex].brightness[brightnessStateIndex]

  let contrastStateIndex = imageState[imageStateIndex].contrast.length - 1;
  const contrastState = imageState[imageStateIndex].contrast[contrastStateIndex]

  // if(!saturateState || !contrastState || !brightnessState) return;

  Imagefilters = `brightness(${brightnessState}) contrast(${contrastState}) saturate(${saturateState})`;

  uploadedImage.style.filter = Imagefilters;

  // console.log(Imagefilters)

  // if (imageState.length > 1) {
  //   imageState.shift()
  //   console.log(imageState)
  //   console.log('shifted')
  // }
}


// this function updates the tools section to show the editing elements and handles the editing logic

export function updateToolsSection(filterState, filterName, filter, styleName) {
  editorToolsDisplay.classList.add('tools-close')
  inputElements.classList.add('tools-open')

  rangeInputDiv.innerHTML = `<input type="range" name="input-range" id="inputRange" value="${filterState}" max="2" min="0.1" step="0.1">`

  rangeInputValue.innerHTML = `Value: ${(filterState) * 100}%`
  inputName.innerHTML = filterName

  const inputRange = document.getElementById('inputRange');
  const uploadedImage = document.getElementById('uploadedImage');


  inputRange.addEventListener('input', () => {
    rangeInputValue.innerHTML = `Value: ${Math.floor((inputRange.value) * 100)}%`


    const currentImageState = imageState[imageState.length - 1];
    const saturate = currentImageState.saturation[currentImageState.saturation.length - 1];
    const brightness = currentImageState.brightness[currentImageState.brightness.length - 1];
    const contrast = currentImageState.contrast[currentImageState.contrast.length - 1];
    const sepia = currentImageState.sepia[currentImageState.sepia.length - 1];

    // i applied all filters but updated the one being adjusted
    let tempFilters = "";
    if (styleName === 'saturate') {
      tempFilters = `brightness(${brightness}) contrast(${contrast}) saturate(${inputRange.value})`;

    } else if (styleName === 'brightness') {
      tempFilters = `brightness(${inputRange.value}) contrast(${contrast}) saturate(${saturate})`;

    } else if (styleName === 'contrast') {
      tempFilters = `brightness(${brightness}) contrast(${inputRange.value}) saturate(${saturate})`;

    }// else if (styleName === 'Sepia') {
    
  // }

    uploadedImage.style.filter = tempFilters;

    // console.log(tempFilters)
    // console.log(imageState)

  })

  inputRange.addEventListener('change', () => {
    filter.push(inputRange.value)
    renderImageFilters()
    saveState()
    // console.log(filter)
  })

  saveState()
}

// this function is for saving the state of the imageState to enable undo and redo
function saveState() {
  undoMap.push(JSON.stringify(imageState[imageStateIndex]))
  // console.log(undoMap)

  let undoMapIndex = undoMap.length - 1;
  // undoMap.forEach((state)=>{
  undoState.push(JSON.parse(undoMap[undoMapIndex]))
  // }) 
  // console.log(undoState)
  // console.log(undoMapIndex)
}

export function undo() {

  if (undoState.length === 1) return;
  editorToolsDisplay.classList.remove('tools-close')
  inputElements.classList.remove('tools-open')
  // console.clear()
  // console.log(imageState)
  let undoStateIndex = undoState.length - 1;

  // const stateToUndo = undoState[undoState.length - 1];

  redoState.push(undoState[undoStateIndex])

  undoState.pop()

  imageState[0] = (undoState[undoState.length - 1]);

  renderImageFilters()
}

export function redo() {
  if (redoState.length === 0) return;

  editorToolsDisplay.classList.remove('tools-close')
  inputElements.classList.remove('tools-open')

  editorToolsDisplay.classList.remove('tools-close')
  inputElements.classList.remove('tools-open')
  let redoStateIndex = redoState.length - 1;

  const stateToRedo = redoState[redoState.length - 1];

  undoState.push(redoState[redoStateIndex])


  imageState[0] = (redoState[redoState.length - 1]);

  redoState.pop()

  renderImageFilters()
  // console.log(renderImageFilters())
  // console.log(redoState())
}



// Add saturation function
export function addSaturation() {
  let saturate = imageState[imageStateIndex].saturation;
  let saturationStateIndex = imageState[imageStateIndex].saturation.length - 1;
  const saturateState = imageState[imageStateIndex].saturation[saturationStateIndex]
  updateToolsSection(saturateState, 'Saturate', saturate, 'saturate')
}

export function addContrast() {
  let contrast = imageState[imageStateIndex].contrast;
  let contrastStateIndex = imageState[imageStateIndex].contrast.length - 1;
  const contrastState = imageState[imageStateIndex].contrast[contrastStateIndex]
  updateToolsSection(contrastState, 'Contrast', contrast, 'contrast')
}

export function addBrightness() {
  let brightness = imageState[imageStateIndex].brightness;
  let brightnessStateIndex = imageState[imageStateIndex].brightness.length - 1;
  const brightnessState = imageState[imageStateIndex].brightness[brightnessStateIndex]
  updateToolsSection(brightnessState, 'Brightness', brightness, 'brightness')
}

// export function addSepia() {
//   let sepia = imageState[imageStateIndex].sepia;
//   let sepiaStateIndex = sepia.length
//   let sepiaState = sepia.sepiaStateIndex - 1

//   updateToolsSection(sepiaState, 'Sepia', sepia, 'sepia');
// }

// function displaySwitchTools(toolName) {

  // const currentImageState = imageState[imageState.length - 1];
  // const sepia = currentImageState.sepia[currentImageState.sepia.length - 1];

//   // const currentImageState = imageState[imageState.length - 1];
//   // const  = currentImageState.sepia[currentImageState.sepia.length - 1];

  
// }