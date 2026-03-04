const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // 🔴 Check if email already exists
    const emailExists = users.find((user) => user.email === email);

    if (emailExists) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "login.html";
  });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (validUser) {
      localStorage.setItem("currentUser", JSON.stringify(validUser));
      alert("Login Successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid Email or Password");
    }
  });
}
