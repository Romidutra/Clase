// Guardar usuario al registrarse
document.getElementById("registerBtn").addEventListener("click", function () {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("registroEmail").value;
  const pass1 = document.getElementById("registroPassword").value;
  const pass2 = document.getElementById("confirmPassword").value;

  if (pass1 !== pass2) {
    alert("❌ Las contraseñas no coinciden.");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

  if (usuarios.some(u => u.email === email)) {
    alert("❌ Ese correo ya está registrado.");
    return;
  }

  usuarios.push({ nombre, email, password: pass1 });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
  modal.hide();
  setTimeout(() => {
    alert("✅ Registro exitoso. ¡Bienvenid@!");
  }, 500);
});

// Validar login
document.querySelector("#loginModal form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuario = usuarios.find(u => u.email === email && u.password === password);

  if (usuario) {
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));
    const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
    modal.hide();
    setTimeout(() => {
      alert(`✅ ¡Bienvenido/a, ${usuario.nombre}!`);
      mostrarBienvenida(usuario.nombre);
    }, 500);
  } else {
    alert("❌ Usuario o contraseña incorrectos.");
  }
});

window.addEventListener("DOMContentLoaded", function () {
  const usuarioGuardado = localStorage.getItem("usuarioLogueado");
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    setTimeout(() => {
      mostrarBienvenida(usuario.nombre);
    }, 500);
  }
});

function mostrarBienvenida(nombre) {
  if (document.getElementById("avatarUsuario")) return;

  let avatarDiv = document.createElement("div");
  avatarDiv.id = "avatarUsuario";
  avatarDiv.style.position = "fixed";
  avatarDiv.style.top = "20px";
  avatarDiv.style.right = "30px";
  avatarDiv.style.zIndex = "9999";
  avatarDiv.style.display = "flex";
  avatarDiv.style.alignItems = "center";

  let inicial = nombre.trim().charAt(0).toUpperCase();
  let avatar = document.createElement("div");
  avatar.style.width = "44px";
  avatar.style.height = "44px";
  avatar.style.background = "#e0e0e0";
  avatar.style.borderRadius = "50%";
  avatar.style.display = "flex";
  avatar.style.justifyContent = "center";
  avatar.style.alignItems = "center";
  avatar.style.fontSize = "1.5rem";
  avatar.style.fontWeight = "bold";
  avatar.style.color = "#555";
  avatar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
  avatar.style.cursor = "pointer";
  avatar.textContent = inicial;

  let menu = document.createElement("div");
  menu.id = "menuUsuario";
  menu.style.position = "absolute";
  menu.style.top = "54px";
  menu.style.right = "0";
  menu.style.background = "#fff";
  menu.style.border = "1px solid #ddd";
  menu.style.borderRadius = "8px";
  menu.style.boxShadow = "0 4px 16px rgba(0,0,0,0.13)";
  menu.style.padding = "10px 0";
  menu.style.minWidth = "160px";
  menu.style.display = "none";
  menu.style.textAlign = "left";

  let nombreSpan = document.createElement("div");
  nombreSpan.textContent = nombre;
  nombreSpan.style.padding = "8px 20px";
  nombreSpan.style.fontWeight = "bold";
  nombreSpan.style.color = "#333";
  menu.appendChild(nombreSpan);

  let hr = document.createElement("hr");
  hr.style.margin = "6px 0";
  menu.appendChild(hr);

  let cerrarBtn = document.createElement("button");
  cerrarBtn.textContent = "Cerrar sesión";
  cerrarBtn.className = "dropdown-item";
  cerrarBtn.style.width = "100%";
  cerrarBtn.style.textAlign = "left";
  cerrarBtn.style.background = "none";
  cerrarBtn.style.border = "none";
  cerrarBtn.style.padding = "8px 20px";
  cerrarBtn.style.color = "#d32f2f";
  cerrarBtn.style.cursor = "pointer";
  cerrarBtn.onmouseover = () => cerrarBtn.style.background = "#f5f5f5";
  cerrarBtn.onmouseout = () => cerrarBtn.style.background = "none";
  cerrarBtn.onclick = () => {
    localStorage.removeItem("usuarioLogueado");
    avatarDiv.remove();
  };
  menu.appendChild(cerrarBtn);

  avatar.onclick = function (e) {
    e.stopPropagation();
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  };

  document.addEventListener("click", function (e) {
    if (menu.style.display === "block") menu.style.display = "none";
  });

  avatarDiv.appendChild(avatar);
  avatarDiv.appendChild(menu);
  document.body.appendChild(avatarDiv);
}
