export function showError(title, description) {
    imageContainer.innerHTML = `
          <div class="upload-area" id="uploadArea">
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
            <div class="error-message">
              <div class="error-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2" fill="none"/>
                  <path d="M12 8v4M12 16h.01" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="error-content">
                <div class="error-title">${title}</div>
                <div class="error-description">${description}</div>
              </div>
            </div>
          </div>
        `;

    const newUploadArea = document.getElementById("uploadArea");
    const newFileInput = document.getElementById("photoInput");
    newUploadArea.addEventListener("click", () => newFileInput.click());
    newFileInput.addEventListener("change", (e) =>
      processFile(e.target.files[0])
    );
  }

  export function updateThemeUI(theme) {
  const iconHTML =
    theme === "light"
      ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="currentColor"/>
              <path d="M12 2v4M12 18v4M22 12h-4M6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M17.66 6.34l-2.83 2.83M9.17 14.83l-2.83 2.83M17.66 17.66l-2.83-2.83M9.17 9.17L6.34 6.34" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>`
      : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>
            </svg>`;

  themeIcon.innerHTML = iconHTML;
  themeLabel.textContent = theme === "light" ? "Light" : "Dark";
}
