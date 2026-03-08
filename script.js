document.addEventListener("DOMContentLoaded", function () {

  /* ===== AOS ===== */
  if (typeof AOS !== "undefined") {
    AOS.init({
      once: true,
      duration: 1300,
      offset:120,
      easing: "ease-out-cubic"
    });
  }

  /* ===== HERO SWIPER ===== */
  if (typeof Swiper !== "undefined") {
    new Swiper(".hero-swiper", {
      effect: "fade",
      loop: true,
      speed: 1800,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false
      }
    });
  }

  /* ===== TYPEWRITER EFFECT ===== */
  const texts = [
    "+91 96899 99793",
    "Call for Free Quote",
    "24/7 Available"
  ];

  const el = document.getElementById("typewriter");

  let i = 0, j = 0;
  const typingSpeed = 95;
  const erasingSpeed = 55;

  function type() {
    if (j < texts[i].length) {
      el.textContent += texts[i][j++];
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, 2000);
    }
  }
   
  function erase() {
    if (j > 0) {
      el.textContent = texts[i].substring(0, --j);
      setTimeout(erase, erasingSpeed);
    } else {
      i = (i + 1) % texts.length;
      setTimeout(type, 500);
    }
  }



  if (!el) {
  console.warn("Typewriter element not found");
  } else {
  type();
  }

  

 



/*Reviews slider logic*/
if (document.querySelector(".review-swiper")) {
  new Swiper(".review-swiper", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 20,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 2
      }
    }
  });
}


/* Counter animation */
const counters = document.querySelectorAll(".count");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.target);

  const initialText = counter.textContent;
  const isK = initialText.includes("k");
  const isPercent = initialText.includes("%");
  const isPlus = initialText.includes("+") && !isK;

  const duration = 4000;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    if (isK) {
      counter.textContent = value + "k+";
    } else if (isPercent) {
      counter.textContent = value + "%";
    } else if (isPlus) {
      counter.textContent = value + "+";
    } else {
      counter.textContent = value;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (isK) {
        counter.textContent = target + "k+";
      } else if (isPercent) {
        counter.textContent = target + "%";
      } else if (isPlus) {
        counter.textContent = target + "+";
      } else {
        counter.textContent = target;
      }
    }
  };

  requestAnimationFrame(update);
};

/* Trigger once when About section enters view */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(counter => animateCounter(counter));
        observer.disconnect();
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  }
);

const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
  observer.observe(aboutSection);
}

/* MOBILE FALLBACK */
if (counters.length) {
  setTimeout(() => {
    counters.forEach(counter => {
      if (
        counter.textContent === "0" ||
        counter.textContent === "0+" ||
        counter.textContent === "0k+" ||
        counter.textContent === "0%"
      ) {
        animateCounter(counter);
      }
    });
  }, 2000);
}

/*
/* Trigger once when About section enters view 
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      counters.forEach(counter => animateCounter(counter));
      observer.disconnect();
    }
  },
  { threshold: 0.5 }
);

const aboutSection = document.querySelector(".about-section");
if (aboutSection) {
  observer.observe(aboutSection);
}*/


/*====================Customer Care===========================*/
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwzKd-rq3kivBYgRbMTZLXzrBF6x0Ypqg56mOyEG-gWRwkuk8KvehKxGRHbhKUj7Lma/exec";

const form = document.getElementById("submit-to-google-sheet");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    
    formData.append(
      "ex",
      document.getElementById("ex").checked ? "Yes" : "No"
    );

    fetch(scriptURL, {
      method: "POST",
      body: formData
    })
      .then(() => {
        Swal.fire("Done", "Submitted Successfully.", "success");
        form.reset();
      })
      .catch(() => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  });
}


// Load Lottie animation
const loaderAnimation = lottie.loadAnimation({
  container: document.getElementById("loader-lottie"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  path: "Warehouse_Delivery.json" // your JSON file
});

// Minimum loader time (UX polish)
const MIN_LOADER_TIME = 4500; // 4.5s
const startTime = Date.now();

window.addEventListener("load", () => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(MIN_LOADER_TIME - elapsed, 0);

  setTimeout(() => {
    gsap.to("#global-loader", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        document.getElementById("global-loader").remove();
      }
    });
  }, remaining);
});
document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("navMenu");
    const bsCollapse = bootstrap.Collapse.getInstance(nav);
    if (bsCollapse) bsCollapse.hide();
  });
});

window.toggleLocations = function(btn){

const dropdown = btn.nextElementSibling;

dropdown.classList.toggle("open");

}

/* ================= LOCATIONS SWIPER ================= */

if (document.querySelector(".locationSwiper")) {

const locationSwiper = new Swiper(".locationSwiper", {

slidesPerView:3,
spaceBetween:25,
loop:true,
grabCursor:true,

autoplay:{
delay:3500,
disableOnInteraction:false
},

pagination:{
el:".swiper-pagination",
clickable:true
},



breakpoints:{
320:{slidesPerView:1},
640:{slidesPerView:2},
1024:{slidesPerView:3}
}

});

}


});
