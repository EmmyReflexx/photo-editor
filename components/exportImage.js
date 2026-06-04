import { imageState, imageStateIndex } from "../script.js";

export function exportEditedImage() {
  const uploadedImage = document.getElementById('uploadedImage');

  // i checked if image exists
  if (!uploadedImage || !uploadedImage.complete) {
    alert('Please upload and wait for image to load!');
    return;
  }

  const canvas = document.getElementById('export-canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = uploadedImage.naturalWidth;
  canvas.height = uploadedImage.naturalHeight;

  let saturationStateIndex = imageState[imageStateIndex].saturation.length - 1;
  const saturateState = imageState[imageStateIndex].saturation[saturationStateIndex]

  let brightnessStateIndex = imageState[imageStateIndex].brightness.length - 1;
  const brightnessState = imageState[imageStateIndex].brightness[brightnessStateIndex]

  let contrastStateIndex = imageState[imageStateIndex].contrast.length - 1;
  const contrastState = imageState[imageStateIndex].contrast[contrastStateIndex]

  let Imagefilters = `brightness(${brightnessState}) contrast(${contrastState}) saturate(${saturateState})`;

  ctx.filter = Imagefilters;

  // i drew image here in the hidden canvas

  ctx.drawImage(uploadedImage, 0, 0);

  const format = document.getElementById('formatSelect').value;
  const qualityValue = document.getElementById('qualityValue');
  const qualitySlider = document.getElementById('qualitySlider');
  const quality = parseInt(document.getElementById('qualitySlider').value) / 100;
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}-${date.getMinutes().toString().padStart(2, '0')}`;

  let mimeType, fileExtension;

  switch (format) {
    case 'png':
      mimeType = 'image/png';
      fileExtension = 'png';
      break;
    case 'webp':
      mimeType = 'image/webp';
      fileExtension = 'webp';
      break;
    case 'jpeg':
    default:
      mimeType = 'image/jpeg';
      fileExtension = 'jpg';
  }

  const link = document.createElement('a');
  link.download = `edited-photo_${timestamp}.${fileExtension}`;

  if (format === 'jpeg' || format === 'webp') {
    link.href = canvas.toDataURL(mimeType, quality);
  } else {
    link.href = canvas.toDataURL(mimeType); // PNG doesn't support quality
  }

  // i triggered download here

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}