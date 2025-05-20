const passwordInput = document.getElementById("password");
const strengthFill = document.getElementById("strength-fill");
const strengthText = document.getElementById("strength-text");
const glowWrapper = document.getElementById("glowWrapper");

document.getElementById("togglePassword").addEventListener("change", function () {
  passwordInput.type = this.checked ? "text" : "password";
});

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;

  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };

  let passedCount = 0;
  for (let key in checks) {
    if (checks[key]) passedCount++;
    updateRequirement(key, checks[key]);
  }

  updateStrength(passedCount);
});

function updateRequirement(id, isValid) {
  const item = document.getElementById(id);
  const icon = item.querySelector(".icon");

  if (isValid) {
    item.classList.add("valid");
    icon.textContent = "✓";
  } else {
    item.classList.remove("valid");
    icon.textContent = "✗";
  }
}

function updateStrength(score) {
  const colors = ["#ff4d4d", "#ff8000", "#ffd11a", "#99e600", "#00e676"];
  const labels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const percent = (score / 5) * 100;

  strengthFill.style.width = `${percent}%`;
  strengthFill.style.background = colors[score];
  strengthText.textContent = labels[score];

  // Update glow border class
  for (let i = 0; i <= 4; i++) {
    glowWrapper.classList.remove(`strength-${i}`);
  }
  glowWrapper.classList.add(`strength-${score}`);
}
