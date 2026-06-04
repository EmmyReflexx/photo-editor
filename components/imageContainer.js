export let imageContainerHTML = `<div class="upload-area" id="uploadArea">
            <input type="file" name="photo" id="photoInput" accept=".jpg,.jpeg,.png" style="display: none;">
            <div class="upload-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                <circle cx="12" cy="13" r="4" stroke="var(--accent-color)" stroke-width="2" fill="var(--accent-color)" opacity="0.3"/>
                <path d="M12 13V13.01" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round"/>
                <path d="M17 8h.01" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="upload-text">Drag & Drop your image here or <span class="browse-text">browse</span></div>
            <div class="upload-hint">Supports JPG, JPEG, PNG (Max 5MB)</div>
          </div>
        `