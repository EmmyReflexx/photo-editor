let imageState = [{
  saturation: 1,
  contrast: 1,
  brightness: 1,
  sepia: 0,
  grayscale: 0,
  blur: 0,
}];
let imageStateIndex = imageState.length - 1;

function addSaturation() {

  renderSaturationFilter()

  const uploadedImage = document.getElementById('uploadedImage')
  // if (!uploadedImage) {
  //   return alert('Please upload an image first')
  // }

  const saturationState = imageState[imageStateIndex].saturation
  let saturationStateIndex = saturationState.length - 1;
  // console.log(saturationStateIndex)
  let saturateState = saturationState[saturationStateIndex];

  console.log(saturationState)

  editorToolsDisplay.classList.add('tools-close')
  inputElements.classList.add('tools-open')

  rangeInputDiv.innerHTML = `<input type="range" name="input-range" id="inputRange" value="${saturationState[saturationStateIndex]}" max="2" min="0.1" step="0.1">`
  rangeInputValue.innerHTML = `Value: ${(saturateState) * 100}%`

  const inputRange = document.getElementById('inputRange')

  inputRange.addEventListener('change', () => {
    saturationState.push(inputRange.value)
    console.log(saturationState)
    uploadedImage.style.filter = `saturate(${saturateState})`;
    // console.log(saturationStateIndex)
    // console.log(imageState)
  })

  inputRange.addEventListener('input', () => {
    rangeInputValue.innerHTML = `Value: ${Math.floor((inputRange.value) * 100)}%`;
    const uploadedImage = document.getElementById('uploadedImage');
    uploadedImage.style.filter = `saturate(${inputRange.value})`;
  })
  console.log(saturationStateIndex)

  renderSaturationFilter()
}


function renderSaturationFilter() {
  const saturationState = imageState[imageStateIndex].saturation
  let saturationStateIndex = saturationState.length - 1;
  // console.log(saturationStateIndex)
  let saturateState = Math.floor(saturationState[saturationStateIndex])

  const uploadedImage = document.getElementById('uploadedImage')
  console.log(saturationStateIndex)
}

push.addEventListener('click', () => {
  saturationState.push(input.value)
  console.log(saturationState)
  console.log(imageState)
})


const input = document.getElementById('input');
const push = document.getElementById('push')

const saturationState = imageState[imageStateIndex].saturation
let saturationStateIndex = saturationState.length - 1;
// console.log(saturationStateIndex)
let saturateState = saturationState[saturationStateIndex];



