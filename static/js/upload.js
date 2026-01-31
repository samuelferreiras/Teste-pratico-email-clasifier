export function setupUpload(dropzone, fileInput) {
  const dropzoneDefault = dropzone.querySelector(".js-dropzone-default");
  const uploadFeedback  = dropzone.querySelector(".js-upload-feedback");
  const fileInfo        = dropzone.querySelector(".js-file-info");
  const fileName        = dropzone.querySelector(".js-file-name");
  const removeFile      = dropzone.querySelector(".js-remove-file");

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      dropzoneDefault.classList.add("d-none");
      uploadFeedback.classList.remove("d-none");
      fileInfo.classList.add("d-none");
      setTimeout(() => {
        uploadFeedback.classList.add("d-none");
        fileName.textContent = fileInput.files[0].name;
        fileInfo.classList.remove("d-none");
      }, 800);
    }
  });

  removeFile.addEventListener("click", e => {
    e.preventDefault();
    fileInput.value = "";
    fileInfo.classList.add("d-none");
    dropzoneDefault.classList.remove("d-none");
  });

  dropzone.addEventListener("dragover", e => {
    e.preventDefault();
    dropzone.classList.add("border-primary");
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.classList.remove("border-primary");
  });

  dropzone.addEventListener("drop", e => {
    e.preventDefault();
    dropzone.classList.remove("border-primary");
    const dt = new DataTransfer();
    for (const file of e.dataTransfer.files) {
      dt.items.add(file);
    }
    fileInput.files = dt.files;
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  });

  dropzone.addEventListener("click", e => {
    if (!e.target.classList.contains("js-remove-file")) {
      fileInput.click();
    }
  });
}
