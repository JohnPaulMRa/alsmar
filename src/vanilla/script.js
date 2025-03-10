// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const userButton = document.getElementById("userButton");
const authModal = document.getElementById("authModal");
const closeAuthModal = document.getElementById("closeAuthModal");
const signInContainer = document.getElementById("signInContainer");
const signUpContainer = document.getElementById("signUpContainer");
const switchToSignUp = document.getElementById("switchToSignUp");
const switchToSignIn = document.getElementById("switchToSignIn");
const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const loginError = document.getElementById("loginError");
const signupError = document.getElementById("signupError");
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");
const enableCamera = document.getElementById("enableCamera");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");
const cameraFeed = document.getElementById("cameraFeed");
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const toggleRecognition = document.getElementById("toggleRecognition");
const gestureOverlay = document.getElementById("gestureOverlay");
const gestureText = document.getElementById("gestureText");
const confidenceText = document.getElementById("confidenceText");
const confidenceFill = document.getElementById("confidenceFill");
const calibrateButton = document.getElementById("calibrateButton");
const calibrationOverlay = document.getElementById("calibrationOverlay");
const calibrationFill = document.getElementById("calibrationFill");
const saveButton = document.getElementById("saveButton");
const saveGesture = document.getElementById("saveGesture");
const tipsBox = document.getElementById("tipsBox");
const emptyHistory = document.getElementById("emptyHistory");
const gestureList = document.getElementById("gestureList");
const savedTranslationsSection = document.getElementById(
  "savedTranslationsSection",
);
const translationsList = document.getElementById("translationsList");
const passwordToggles = document.querySelectorAll(".toggle-password");

// State
let isRecognitionActive = false;
let isCalibrating = false;
let stream = null;
let recognitionInterval = null;
let recentGestures = [];
let savedTranslations = [];
let currentUser = null;

// Check if user is logged in
function checkUserLogin() {
  const storedUser = localStorage.getItem("asl-current-user");
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      updateUserUI();
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("asl-current-user");
    }
  }
}

// Update UI based on user login state
function updateUserUI() {
  if (currentUser) {
    userButton.innerHTML = `<div class="avatar-circle">${getUserInitials()}</div>`;
  } else {
    userButton.innerHTML = '<i class="fas fa-user"></i>';
  }
}

// Get user initials for avatar
function getUserInitials() {
  if (!currentUser?.name) return "U";
  return currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDarkTheme = document.body.classList.contains("dark-theme");
  themeToggle.innerHTML = isDarkTheme
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
  localStorage.setItem("asl-theme", isDarkTheme ? "dark" : "light");
});

// Check saved theme preference
function loadThemePreference() {
  const savedTheme = localStorage.getItem("asl-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

// Mobile Menu
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});

// Auth Modal
userButton.addEventListener("click", () => {
  if (currentUser) {
    // Show user dropdown (not implemented in this simplified version)
    logout();
  } else {
    authModal.classList.add("active");
  }
});

closeAuthModal.addEventListener("click", () => {
  authModal.classList.remove("active");
});

switchToSignUp.addEventListener("click", () => {
  signInContainer.classList.add("hidden");
  signUpContainer.classList.remove("hidden");
});

switchToSignIn.addEventListener("click", () => {
  signUpContainer.classList.add("hidden");
  signInContainer.classList.remove("hidden");
});

// Password visibility toggle
passwordToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.getAttribute("data-target");
    const passwordInput = document.getElementById(targetId);
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggle.innerHTML =
      type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
  });
});

// Sign In Form
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    loginError.textContent = "Please fill in all fields";
    return;
  }

  // In a real app, this would validate with a backend
  // For demo, we'll simulate login with localStorage
  const users = JSON.parse(localStorage.getItem("asl-users") || "[]");
  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    loginError.textContent = "Invalid email or password";
    return;
  }

  // Store login session
  currentUser = {
    name: user.name,
    email: user.email,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem("asl-current-user", JSON.stringify(currentUser));
  updateUserUI();
  authModal.classList.remove("active");
});

// Sign Up Form
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signupError.textContent = "";

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword",
  ).value;

  if (!name || !email || !password || !confirmPassword) {
    signupError.textContent = "Please fill in all fields";
    return;
  }

  if (password !== confirmPassword) {
    signupError.textContent = "Passwords do not match";
    return;
  }

  if (password.length < 6) {
    signupError.textContent = "Password must be at least 6 characters";
    return;
  }

  // In a real app, this would create a user in a backend
  // For demo, we'll store in localStorage
  const users = JSON.parse(localStorage.getItem("asl-users") || "[]");

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    signupError.textContent = "Email already in use";
    return;
  }

  // Add new user
  const newUser = {
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  localStorage.setItem("asl-users", JSON.stringify(users));

  // Auto login after signup
  currentUser = {
    name: newUser.name,
    email: newUser.email,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem("asl-current-user", JSON.stringify(currentUser));
  updateUserUI();
  authModal.classList.remove("active");
});

// Logout function
function logout() {
  localStorage.removeItem("asl-current-user");
  currentUser = null;
  updateUserUI();
}

// Tabs
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");

    // Update active tab button
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show corresponding tab content
    tabContents.forEach((content) => content.classList.remove("active"));
    document.getElementById(`${tabName}Tab`).classList.add("active");
  });
});

// Camera Setup
enableCamera.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    video.srcObject = stream;
    cameraPlaceholder.classList.add("hidden");
    cameraFeed.classList.remove("hidden");
  } catch (err) {
    console.error("Error accessing camera:", err);
    alert(
      "Camera access denied. Please enable camera access in your browser settings.",
    );
  }
});

// Toggle Recognition
toggleRecognition.addEventListener("click", () => {
  if (!isRecognitionActive) {
    startRecognition();
  } else {
    stopRecognition();
  }
});

// Start Recognition
function startRecognition() {
  if (!stream) return;

  isRecognitionActive = true;
  toggleRecognition.innerHTML = '<i class="fas fa-video"></i> Stop Recognition';
  toggleRecognition.classList.add("destructive");
  gestureOverlay.classList.remove("hidden");
  tipsBox.classList.remove("hidden");
  saveButton.disabled = false;

  // Simulate gesture detection
  simulateGestureDetection();
}

// Stop Recognition
function stopRecognition() {
  isRecognitionActive = false;
  toggleRecognition.innerHTML =
    '<i class="fas fa-hand-paper"></i> Start Recognition';
  toggleRecognition.classList.remove("destructive");
  gestureOverlay.classList.add("hidden");
  tipsBox.classList.add("hidden");
  saveButton.disabled = true;

  clearInterval(recognitionInterval);
}

// Simulate Gesture Detection
function simulateGestureDetection() {
  const gestures = [
    "Hello",
    "Thank you",
    "Yes",
    "No",
    "Please",
    "Sorry",
    "Help",
    "Friend",
    "Family",
    "Love",
    "Happy",
    "Sad",
  ];

  // Initial detection
  detectRandomGesture();

  // Continuous detection
  recognitionInterval = setInterval(() => {
    if (isRecognitionActive) {
      detectRandomGesture();
    } else {
      clearInterval(recognitionInterval);
    }
  }, 3000);

  function detectRandomGesture() {
    const randomGesture = gestures[Math.floor(Math.random() * gestures.length)];
    const randomConfidence = Math.floor(Math.random() * 30) + 70; // 70-100%

    gestureText.textContent = randomGesture;
    confidenceText.textContent = `Confidence: ${randomConfidence}%`;
    confidenceFill.style.width = `${randomConfidence}%`;

    // Set confidence color
    if (randomConfidence >= 90) {
      confidenceText.style.color = "#10b981"; // success-color
      confidenceFill.style.backgroundColor = "#10b981";
    } else if (randomConfidence >= 70) {
      confidenceText.style.color = "#f59e0b"; // warning-color
      confidenceFill.style.backgroundColor = "#f59e0b";
    } else {
      confidenceText.style.color = "#ef4444"; // error-color
      confidenceFill.style.backgroundColor = "#ef4444";
    }

    // Add to recent gestures
    addToRecentGestures(randomGesture);
  }
}

// Add to Recent Gestures
function addToRecentGestures(gesture) {
  recentGestures.unshift(gesture);
  if (recentGestures.length > 5) {
    recentGestures.pop();
  }

  updateGestureList();
}

// Update Gesture List
function updateGestureList() {
  if (recentGestures.length === 0) {
    emptyHistory.classList.remove("hidden");
    gestureList.classList.add("hidden");
    return;
  }

  emptyHistory.classList.add("hidden");
  gestureList.classList.remove("hidden");

  gestureList.innerHTML = "";

  recentGestures.forEach((gesture) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="flex items-center">
        <div class="gesture-icon">
          <i class="fas fa-hand-paper"></i>
        </div>
        <span class="font-medium">${gesture}</span>
      </div>
      <div class="gesture-actions">
        <button class="button icon save-gesture" data-gesture="${gesture}">
          <i class="fas fa-save"></i>
        </button>
        <button class="button icon copy-gesture" data-gesture="${gesture}">
          <i class="fas fa-copy"></i>
        </button>
      </div>
    `;
    gestureList.appendChild(li);
  });

  // Add event listeners to new buttons
  document.querySelectorAll(".save-gesture").forEach((button) => {
    button.addEventListener("click", () => {
      const gesture = button.getAttribute("data-gesture");
      saveTranslation(gesture);
    });
  });

  document.querySelectorAll(".copy-gesture").forEach((button) => {
    button.addEventListener("click", () => {
      const gesture = button.getAttribute("data-gesture");
      navigator.clipboard.writeText(gesture);
      alert(`Copied "${gesture}" to clipboard`);
    });
  });
}

// Calibration
calibrateButton.addEventListener("click", () => {
  if (isCalibrating) return;

  isCalibrating = true;
  calibrationOverlay.classList.remove("hidden");
  calibrationFill.style.width = "0%";

  let progress = 0;
  const calibrationInterval = setInterval(() => {
    progress += 10;
    calibrationFill.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(calibrationInterval);
      isCalibrating = false;
      calibrationOverlay.classList.add("hidden");
    }
  }, 500);
});

// Save Gesture
saveButton.addEventListener("click", () => {
  if (isRecognitionActive && gestureText.textContent) {
    saveTranslation(gestureText.textContent);
  }
});

saveGesture.addEventListener("click", () => {
  if (gestureText.textContent) {
    saveTranslation(gestureText.textContent);
  }
});

// Save Translation
function saveTranslation(text) {
  savedTranslations.push({
    text,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("asl-translations", JSON.stringify(savedTranslations));
  updateSavedTranslations();
}

// Update Saved Translations
function updateSavedTranslations() {
  if (savedTranslations.length === 0) {
    savedTranslationsSection.classList.add("hidden");
    return;
  }

  savedTranslationsSection.classList.remove("hidden");
  translationsList.innerHTML = "";

  savedTranslations.forEach((translation, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <p class="font-medium">${translation.text}</p>
        <p class="translation-time">${new Date(translation.timestamp).toLocaleString()}</p>
      </div>
      <button class="delete-button" data-index="${index}">
        Delete
      </button>
    `;
    translationsList.appendChild(li);
  });

  // Add event listeners to delete buttons
  document.querySelectorAll(".delete-button").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      savedTranslations.splice(index, 1);
      localStorage.setItem(
        "asl-translations",
        JSON.stringify(savedTranslations),
      );
      updateSavedTranslations();
    });
  });
}

// Load saved translations from localStorage
function loadSavedTranslations() {
  const saved = localStorage.getItem("asl-translations");
  if (saved) {
    savedTranslations = JSON.parse(saved);
    updateSavedTranslations();
  }
}

// Initialize
function init() {
  loadThemePreference();
  checkUserLogin();
  loadSavedTranslations();
}

// Run initialization
init();
