const BASE_URL = "";

/* =======================
   AUTH HELPERS
======================= */

function getToken() {
  return localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* =======================
   SIGNUP
======================= */

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("All fields required");
    return;
  }

  // const res = await fetch(`${BASE_URL}/signup`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password })
  // });

  if (!res.ok) {
    alert("Signup failed");
    return;
  }

  alert("Signup successful");
  window.location.href = "login.html";
}

/* =======================
   LOGIN
======================= */

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // const res = await fetch(`${BASE_URL}/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password })
  // });

  if (!res.ok) {
    alert("Invalid credentials");
    return;
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  window.location.href = "chat.html";
}

/* =======================
   CHAT
======================= */

async function sendMessage() {
  const input = document.getElementById("message");
  const chatBox = document.getElementById("chat");
  const message = input.value.trim();

  if (!message) return;

  chatBox.innerHTML += `<div class="msg user">${message}</div>`;
  input.value = "";

  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    chatBox.innerHTML += `<div class="msg bot">Session expired. Please login again.</div>`;
    logout();
    return;
  }

  const data = await res.json();
  chatBox.innerHTML += `<div class="msg bot">${data.reply}</div>`;

  chatBox.scrollTop = chatBox.scrollHeight;
}

/* =======================
   PAGE GUARDS
======================= */

function protectChatPage() {
  if (!getToken()) {
    window.location.href = "login.html";
  }
}
