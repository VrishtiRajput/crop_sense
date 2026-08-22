// ============================================================
//  CropSense — Frontend Logic (app.js)
//  Handles image upload, drag-drop, API call to Flask backend,
//  and result rendering.
// ============================================================

let selectedFile = null;

// ──────────────────────────────────────────────
//  1. FILE HANDLING
// ──────────────────────────────────────────────

function handleFile(event) {
  const file = event.target.files[0];
  if (file) loadPreview(file);
}

function handleDragOver(event) {
  event.preventDefault();
  document.getElementById("dropzone").classList.add("drag-over");
}

function handleDrop(event) {
  event.preventDefault();
  document.getElementById("dropzone").classList.remove("drag-over");
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    loadPreview(file);
  } else {
    alert("Please drop a valid image file (JPG, PNG, WEBP).");
  }
}

function loadPreview(file) {
  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("previewImg").src = e.target.result;
    document.getElementById("dropzone").style.display = "none";
    document.getElementById("previewArea").style.display = "flex";
  };
  reader.readAsDataURL(file);
}

// ──────────────────────────────────────────────
//  2. MAIN ANALYSIS — sends image to Flask backend
// ──────────────────────────────────────────────

async function analyzeCrop() {
  if (!selectedFile) {
    alert("Please upload a crop image first.");
    return;
  }

  // Show loading, hide upload
  showSection("loadingSection");
  document.getElementById("analyzeBtn").disabled = true;

  try {
    // Build multipart form data
    const formData = new FormData();
    formData.append("image", selectedFile);

    // POST to Flask backend
    const response = await fetch("/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || "Server returned an error.");
    }

    renderResults(data);

  } catch (err) {
    showSection("errorSection");
    document.getElementById("errorMsg").textContent = err.message || "Unknown error occurred.";
  }
}

// ──────────────────────────────────────────────
//  3. RENDER RESULTS
// ──────────────────────────────────────────────

function renderResults(data) {
  const isHealthy = data.status === "Healthy";

  // ── Status Banner
  const banner = document.getElementById("statusBanner");
  banner.className = "status-banner " + (isHealthy ? "healthy" : "diseased");

  document.getElementById("statusEmoji").textContent = isHealthy ? "✅" : "🚨";
  document.getElementById("statusLabel").textContent  = isHealthy ? "Crop Status" : "Disease Detected";
  document.getElementById("statusTitle").textContent  = isHealthy
    ? "Your crop looks healthy!"
    : (data.disease_name || "Unhealthy Crop");

  // ── Thumbnail
  document.getElementById("resultImg").src = document.getElementById("previewImg").src;

  // ── Quick info chips
  document.getElementById("cropName").textContent       = data.crop || "Unknown";
  document.getElementById("confidenceValue").textContent = data.confidence || "—";

  if (!isHealthy && data.severity) {
    document.getElementById("severityChip").style.display = "block";
    document.getElementById("severityValue").textContent   = data.severity;
  }

  // ── Diagnosis
  document.getElementById("diagnosisText").textContent = data.diagnosis || "No diagnosis available.";

  // ── Severity bar
  if (!isHealthy && data.severity) {
    document.getElementById("severityBlock").style.display = "block";
    const level = data.severity.toLowerCase(); // "low" | "medium" | "high"
    const fill  = document.getElementById("sevFill");
    const label = document.getElementById("sevText");
    fill.className  = "sev-fill " + level;
    label.className = "sev-text " + level;
    label.textContent = data.severity;
  }

  // ── Recommendations
  const recList = document.getElementById("recList");
  recList.innerHTML = "";

  const recs = data.recommendations || ["No specific recommendations available."];
  recs.forEach((rec, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="rec-num">${i + 1}</span><span>${rec}</span>`;
    recList.appendChild(li);
  });

  // ── Show results
  showSection("resultsSection");
}

// ──────────────────────────────────────────────
//  4. HELPERS
// ──────────────────────────────────────────────

function showSection(id) {
  const sections = [
    "uploadSection",
    "loadingSection",
    "resultsSection",
    "errorSection",
  ];
  sections.forEach((s) => {
    document.getElementById(s).style.display = s === id ? "block" : "none";
  });
}

function resetApp() {
  selectedFile = null;

  // Clear inputs
  document.getElementById("fileInput").value = "";
  document.getElementById("previewImg").src   = "";
  document.getElementById("resultImg").src    = "";

  // Reset dropzone
  document.getElementById("dropzone").style.display  = "block";
  document.getElementById("previewArea").style.display = "none";
  document.getElementById("analyzeBtn").disabled      = false;

  // Reset severity block
  document.getElementById("severityBlock").style.display = "none";
  document.getElementById("severityChip").style.display  = "none";

  // Reset recommendations
  document.getElementById("recList").innerHTML = "";

  showSection("uploadSection");
}
