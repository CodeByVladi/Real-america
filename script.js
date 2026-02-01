// Elementos del DOM
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-menu a");
const contactForm = document.getElementById("contactForm");

// Toggle del menú móvil
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Cerrar menú cuando se hace clic en un enlace
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Efecto de scrolleo suave en la navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Manejo del formulario de contacto
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = new FormData(this);
    const nombre = this.querySelector('input[placeholder="Tu nombre"]').value;
    const email = this.querySelector('input[placeholder="Tu email"]').value;
    const asunto = this.querySelector('input[placeholder="Asunto"]').value;
    const mensaje = this.querySelector("textarea").value;

    // Validar que todos los campos estén llenos
    if (nombre && email && asunto && mensaje) {
      // Mostrar mensaje de éxito
      showNotification("¡Mensaje enviado exitosamente!", "success");

      // Limpiar el formulario
      this.reset();

      // En un caso real, aquí se enviaría la información a un servidor
      console.log("Formulario enviado:", { nombre, email, asunto, mensaje });
    } else {
      showNotification("Por favor, completa todos los campos", "error");
    }
  });
}

// Función para mostrar notificaciones
function showNotification(message, type) {
  // Crear elemento de notificación
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Estilos para la notificación
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

  // Agregar al DOM
  document.body.appendChild(notification);

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Agregar estilos para las animaciones de notificación
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Cambiar el color de la navbar cuando se hace scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Contar animación para las estadísticas
function animateCounter() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent);
    const duration = 2000; // 2 segundos
    const start = Date.now();

    function update() {
      const progress = (Date.now() - start) / duration;

      if (progress < 1) {
        if (counter.textContent.includes("º")) {
          // Para números ordinales
          counter.textContent = Math.ceil(progress * target) + "º";
        } else if (counter.textContent.includes("K")) {
          counter.textContent =
            (
              Math.ceil(progress * parseInt(counter.textContent)) / 1000
            ).toFixed(1) + "K";
        } else {
          counter.textContent = Math.ceil(progress * target);
        }
        requestAnimationFrame(update);
      } else {
        counter.textContent = counter.dataset.target || target;
      }
    }

    // Guarda el valor original
    counter.dataset.target = counter.textContent;

    // Inicia la animación cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          update();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Llamar cuando el DOM está listo
document.addEventListener("DOMContentLoaded", animateCounter);

// Agregar efecto de paralax suave (opcional)
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrollPosition = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Mejorar validación del formulario
if (contactForm) {
  const emailInput = contactForm.querySelector('input[placeholder="Tu email"]');
  if (emailInput) {
    emailInput.addEventListener("blur", function () {
      if (this.value && !isValidEmail(this.value)) {
        this.style.borderColor = "#ef4444";
      } else {
        this.style.borderColor = "";
      }
    });
  }
}

console.log("Script de Real America FC cargado correctamente");
