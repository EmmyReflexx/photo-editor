import { processFile, resetUploader } from "./components/processFiles.js";
import { showError, updateThemeUI } from "./components/functions.js";
import { renderImageFilters, Imagefilters, updateToolsSection, addSaturation, addBrightness, addContrast, undo, undoState, redo } from "./components/editing-engine.js";
import { exportEditedImage } from "./components/exportImage.js";
import { resetImageState, deleteImageState } from "./components/resetImage.js";
import { image } from "./components/processFiles.js";


const dropZone = document.getElementById("photoContainer");
const fileInput = document.getElementById("photoInput");
const uploadArea = document.getElementById("uploadArea");
const imageContainer = document.getElementById("imageContainer");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");
const uploadBtn = document.getElementById("uploadBtn");
const undoBtn = document.getElementById('undoBtn')
const redoBtn = document.getElementById('redoBtn')
const html = document.documentElement;


// Theme switching functionality
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
updateThemeUI(savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeUI(newTheme);
});


// Image drag and drop design and verification and collection before its rendered

uploadBtn.addEventListener("click", () => {
  if (uploadedImage) {
    fileInput.click()
  } else {
    resetUploader()
  }
})
uploadArea.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) =>
  processFile(e.target.files[0])
);

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("active");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("active");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("active");
  const files = e.dataTransfer.files;

  if (files.length > 1) {
    showError(
      "Too Many Files",
      "Please upload only one image at a time."
    );
    return;
  }

  processFile(files[0]);
});
// for exporting
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', exportEditedImage);

// This is the image editing section

const saturationTool = document.getElementById('saturationTool');
const contrastTool = document.getElementById('contrastTool');
const blurTool = document.getElementById('blurTool');
const brightnessTool = document.getElementById('brightnessTool');
const sepiaTool = document.getElementById('sepiaTool');
const editorTools = document.getElementById('editorTools');
const editorToolsAll = document.querySelectorAll('.editor-tool')
const defaultInputHtml = editorTools.innerHTML;
const editorToolsDisplay = document.getElementById('editorToolsDisplay')
const inputElements = document.getElementById('inputElements')
const inputSwitchElement = document.getElementById('inputSwitchElement')
const inputName = document.getElementById('inputName');
const rangeInputDiv = document.getElementById('rangeInputDiv')
const rangeInputValue = document.getElementById('rangeInputValue')
const inputRange = document.getElementById('inputRange')
const uploadedImage = document.getElementById('uploadedImage')


editorTools.addEventListener('click', (e) => {

  if (e.target && e.target.id === 'inputBackButton') {
    editorToolsDisplay.classList.remove('tools-close')
    inputElements.classList.remove('tools-open')
    inputSwitchElement.classList.remove('active')
  }
  if (e.target && e.target.id === 'switchBackButton') {
    editorToolsDisplay.classList.remove('tools-close')
    inputElements.classList.remove('tools-open')
    inputSwitchElement.classList.remove('active')
  }
})






// for undo and redo

undoBtn.addEventListener('click', () => {
  undo()
})
redoBtn.addEventListener('click', () => {
  redo()
})

// for exporting and updating the quslity value

const qualityValue = document.getElementById('qualityValue');
const qualitySlider = document.getElementById('qualitySlider');
const quality = parseInt(document.getElementById('qualitySlider').value) / 100;
qualitySlider.addEventListener('input', () => {
  qualityValue.innerHTML = `${qualitySlider.value}%`
})



// I am handeling all state data here

export let imageState = [{
  saturation: [1],
  contrast: [1],
  brightness: [1],
  sepia: 0,
  grayscale: 0,
  blur: 0,
}];

export let imageStateIndex = imageState.length - 1;

let saturate = imageState[imageStateIndex].saturation;
let saturationStateIndex = imageState[imageStateIndex].saturation.length - 1;
const saturateState = imageState[imageStateIndex].saturation[saturationStateIndex]

let brightness = imageState[imageStateIndex].brightness;
let brightnessStateIndex = imageState[imageStateIndex].brightness.length - 1;
const brightnessState = imageState[imageStateIndex].brightness[brightnessStateIndex]

let contrast = imageState[imageStateIndex].contrast;
let contrastStateIndex = imageState[imageStateIndex].contrast.length - 1;
const contrastState = imageState[imageStateIndex].contrast[saturationStateIndex]


// for reseting the image

const resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', () => {
  resetImageState()
  if(!image) return alert('Please upload an image first');
})


if (uploadedImage) renderImageFilters();

saturationTool.addEventListener('click', () => {
  if(!image) return alert('Please upload an image first');
  addSaturation()
})
contrastTool.addEventListener('click', () => {
  if(!image) return alert('Please upload an image first');
  addContrast()
})
brightnessTool.addEventListener('click', () => {
  if(!image) return alert('Please upload an image first');
  addBrightness()
})




// push.addEventListener('click', () => {
//   const uploadedImage = document.getElementById('uploadedImage')
//   if (!uploadedImage) return;
//   imageState[imageStateIndex].saturation.push(input.value)

//   console.log(imageState[imageStateIndex].saturation)
//   console.log(imageState)

//   renderImageFilters()
// })
