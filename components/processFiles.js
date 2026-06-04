import { imageState } from "../script.js";
import { imageContainerHTML } from "./imageContainer.js";
import { resetImageState, deleteImageState } from "./resetImage.js";

export let image = false;

export function processFile(file) {
  if (!file) return;

  if (!file.type.match("image.*")) {
    showError(
      "Invalid File Format",
      "Please select a valid image file (JPG, JPEG, PNG)."
    );
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showError(
      "File Too Large",
      "File size exceeds 5MB. Please choose a smaller image."
    );
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    imageContainer.innerHTML = `
            <img id="uploadedImage" class="uploaded-image" src="${e.target.result}" alt="Uploaded preview">
            <button id="changeImage" class="action-button">Change Image</button>
            <div>
          </div>
          `;
          image = true;

    document.getElementById("changeImage").addEventListener("click", resetUploader);
    checkExportAvailability()
  };

  reader.readAsDataURL(file);
}
function checkExportAvailability() {
  const uploadedImage = document.getElementById('uploadedImage');
  if (uploadedImage && uploadedImage.src) {
    exportBtn.disabled = false;
  } else {
    exportBtn.disabled = true;
  }
}

export function resetUploader() {
  deleteImageState()
  editorToolsDisplay.classList.remove('tools-close')
  inputElements.classList.remove('tools-open')
  inputSwitchElement.classList.remove('active')

  imageContainer.innerHTML = imageContainerHTML;

  const newUploadArea = document.getElementById("uploadArea");
  const newFileInput = document.getElementById("photoInput");
  newUploadArea.addEventListener("click", () => newFileInput.click());
  newFileInput.addEventListener("change", (e) =>
    processFile(e.target.files[0])
  );

  newUploadArea.click()
  checkExportAvailability()
}