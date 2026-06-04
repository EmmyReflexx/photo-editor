document.addEventListener("DOMContentLoaded", function () {
  const dropZone = document.getElementById("photoContainer");
  const fileInput = document.getElementById("photoInput");
  const uploadArea = document.getElementById("uploadArea");
  const imageContainer = document.getElementById("imageContainer");
  const themeToggle = document.getElementById("themeToggle");
  const currentYear = document.getElementById("currentYear");
  
  // Set current year in footer
  currentYear.textContent = new Date().getFullYear();
  
  // Theme toggle functionality
  themeToggle.addEventListener("change", function() {
    if (this.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true;
  }
  
  // Image upload functionality
  uploadArea.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (e) => processFile(e.target.files[0]));

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
    processFile(e.dataTransfer.files[0]);
  });

  // Initialize filter sliders
  const brightnessSlider = document.getElementById("brightnessSlider");
  const saturationSlider = document.getElementById("saturationSlider");
  const contrastSlider = document.getElementById("contrastSlider");
  const sepiaSlider = document.getElementById("sepiaSlider");
  const blurSlider = document.getElementById("blurSlider");
  
  const brightnessValue = document.getElementById("brightnessValue");
  const saturationValue = document.getElementById("saturationValue");
  const contrastValue = document.getElementById("contrastValue");
  const sepiaValue = document.getElementById("sepiaValue");
  const blurValue = document.getElementById("blurValue");
  
  const resetBtn = document.getElementById("resetBtn");
  const saveBtn = document.getElementById("saveBtn");
  
  let currentImage = null;
  let currentFilters = {
    brightness: 100,
    saturation: 100,
    contrast: 100,
    sepia: 0,
    blur: 0
  };
  
  // Update slider value displays
  brightnessSlider.addEventListener("input", function() {
    brightnessValue.textContent = `${this.value}%`;
    currentFilters.brightness = this.value;
    applyFilters();
  });
  
  saturationSlider.addEventListener("input", function() {
    saturationValue.textContent = `${this.value}%`;
    currentFilters.saturation = this.value;
    applyFilters();
  });
  
  contrastSlider.addEventListener("input", function() {
    contrastValue.textContent = `${this.value}%`;
    currentFilters.contrast = this.value;
    applyFilters();
  });
  
  sepiaSlider.addEventListener("input", function() {
    sepiaValue.textContent = `${this.value}%`;
    currentFilters.sepia = this.value;
    applyFilters();
  });
  
  blurSlider.addEventListener("input", function() {
    blurValue.textContent = `${this.value}px`;
    currentFilters.blur = this.value;
    applyFilters();
  });
  
  // Reset filters
  resetBtn.addEventListener("click", function() {
    brightnessSlider.value = 100;
    saturationSlider.value = 100;
    contrastSlider.value = 100;
    sepiaSlider.value = 0;
    blurSlider.value = 0;
    
    brightnessValue.textContent = "100%";
    saturationValue.textContent = "100%";
    contrastValue.textContent = "100%";
    sepiaValue.textContent = "0%";
    blurValue.textContent = "0px";
    
    currentFilters = {
      brightness: 100,
      saturation: 100,
      contrast: 100,
      sepia: 0,
      blur: 0
    };
    
    applyFilters();
  });
  
  // Save button (placeholder functionality)
  saveBtn.addEventListener("click", function() {
    if (!currentImage) {
      alert("Please upload an image first.");
      return;
    }
    
    // In a real app, this would save the image with filters applied
    alert("In a full implementation, this would save your edited image. For now, you can right-click the image and select 'Save Image As'.");
  });
  
  function applyFilters() {
    if (!currentImage) return;
    
    const filterString = `brightness(${currentFilters.brightness}%) saturate(${currentFilters.saturation}%) contrast(${currentFilters.contrast}%) sepia(${currentFilters.sepia}%) blur(${currentFilters.blur}px)`;
    currentImage.style.filter = filterString;
  }

  function processFile(file) {
    if (!file) return;
    
    if (!file.type.match("image.*")) {
      alert("Please select a valid image file (JPEG, PNG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      imageContainer.innerHTML = `
        <img class="uploaded-image" src="${e.target.result}" alt="Uploaded preview">
        <button id="changeImage" class="action-button">
          <i class="fas fa-exchange-alt"></i> Change Image
        </button>
      `;

      currentImage = document.querySelector(".uploaded-image");
      applyFilters();
      
      document.getElementById("changeImage").addEventListener("click", resetUploader);
    };

    reader.readAsDataURL(file);
  }

  function resetUploader() {
    uploadArea.innerHTML = `
      <div class="upload-icon">
        <i class="fas fa-cloud-upload-alt"></i>
      </div>
      <div class="upload-text">Drag & Drop your image here or <span class="browse-text">browse</span></div>
      <div class="upload-hint">Supports JPG, JPEG, PNG (Max 5MB)</div>
    `;
    fileInput.value = "";
    currentImage = null;
    
    // Reset filters
    resetBtn.click();
  }
});