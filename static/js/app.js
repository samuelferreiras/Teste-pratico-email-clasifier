import { setupUpload }   from "./upload.js";
import { classifyEmail } from "./fetcher.js";

const show = el => el.classList.remove("d-none");
const hide = el => el.classList.add("d-none");

document.addEventListener("DOMContentLoaded", () => {
  const form        = document.querySelector(".js-email-form");
  const textInput   = document.querySelector(".js-text-input");
  const fileInput   = document.querySelector(".js-file-input");
  const resultsBox  = document.querySelector(".js-results");
  const loadingBox  = document.querySelector(".js-loading");
  const errorBox    = document.querySelector(".js-error");
  const errorText   = document.querySelector(".js-error-text");
  const resetButton = document.querySelector(".js-reset-form");
  const dropzone    = document.querySelector(".js-dropzone");
  const template    = document.getElementById("result-template");

  setupUpload(dropzone, fileInput);

  form.addEventListener("submit", event => handleFormSubmit(event));
  if (resetButton) resetButton.addEventListener("click", handleReset);

  const handleFormSubmit = event => {
    event.preventDefault();
    hide(errorBox);
    hide(resultsBox);
    show(loadingBox);

    const formData = getFormData();
    if (!formData) {
      hide(loadingBox);
      return;
    }

    sendClassification(formData);
  };

  const getFormData = () => {
    const formData = new FormData();
    const text = textInput.value.trim();
    const file = fileInput.files[0];

    if (!text && !file) {
      showError("Por favor, informe um texto ou envie um arquivo.");
      return null;
    }

    if (file) {
      const allowed = ["txt", "pdf"];
      const ext = file.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) {
        showError("Formato não permitido. Use apenas arquivos .txt ou .pdf.");
        return null;
      }
      formData.append("file", file);
    }

    if (text) formData.append("text", text);

    return formData;
  };

  const isAllowedFile = file => {
    const allowed = ["txt", "pdf"];
    const ext = file.name.split('.').pop().toLowerCase();
    return allowed.includes(ext);
  };

  const sendClassification = async formData => {
    try {
      const data = await classifyEmail(formData);

      if (!Array.isArray(data) || data.length === 0) throw new Error("Resposta inválida do servidor.");

      renderResults(data);
      show(resultsBox);

    } catch (error) {
      console.error("[APP ERROR]", error);
      showError(error.message || "Erro ao classificar email.");
    } finally {
      hide(loadingBox);
    }
  };

  const renderResults = results => {
    resultsBox.innerHTML = "";
    results.forEach(result => resultsBox.appendChild(createResultCard(result)));
  };

  const createResultCard = result => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".js-category-badge").innerHTML =
      result.category === "Produtivo"
        ? '<span class="badge bg-success">Produtivo</span>'
        : '<span class="badge bg-warning text-dark">Improdutivo</span>';

    const confidencePercent = Math.round(result.confidence * 100);
    clone.querySelector(".js-confidence-display").innerHTML = `
      <div class="progress">
        <div class="progress-bar" style="width: ${confidencePercent}%"></div>
      </div>
      <p class="text-muted small mt-2">${confidencePercent}% de confiança</p>
    `;
    clone.querySelector(".js-response").textContent = result.suggested_response;
    return clone;
  };

  const handleReset = () => {
    form.reset();
    resultsBox.innerHTML = "";
    hide(resultsBox);
    hide(errorBox);
    textInput.focus();
  };

  const showError = message => {
    errorText.textContent = message;
    show(errorBox);
    hide(loadingBox);
  };
});
