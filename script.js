// Signup handler
function handleSignup(event) {
  event.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById("signup-confirm-password").value;

  if (!username || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful! Now login.");
  window.location.href = "index.html";
}

// Login handler
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please sign up first.");
    return;
  }

  if (storedUser.username === username && storedUser.password === password) {
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials.");
  }
}
