

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const radios = document.querySelectorAll('input[name="plan"]');

const single = document.getElementById("singleContent");
const double = document.getElementById("doubleContent");

const toggles = document.querySelectorAll(".toggle");

single.classList.add("active");
double.classList.remove("active");

radios.forEach((radio, i) => {
  radio.addEventListener("change", () => {

   
    toggles.forEach(t => t.classList.remove("active"));
    toggles[i].classList.add("active");

    if (radio.value === "single") {
      single.classList.add("active");
      double.classList.remove("active");
    } else {
      double.classList.add("active");
      single.classList.remove("active");
    }

  });
});

const images = [
  "./assets/Perfume1.png",
  "./assets/Perfume2.png",
  "./assets/Perfume3.png"
];

let currentIndex = 0;

const mainImage = document.getElementById("mainImage");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");

mainImage.src = images[currentIndex];
updateDots();
updateButtons();

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === images.length - 1;
}

nextBtn.addEventListener("click", () => {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    mainImage.src = images[currentIndex];
    updateDots();
    updateButtons();
  }
})
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    mainImage.src = images[currentIndex];
    updateDots();
    updateButtons();
  }
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    mainImage.src = images[currentIndex];
    updateDots();
    updateButtons();
  });
});

function connectRadioToGallery(radioName) {
  const radios = document.querySelectorAll(`input[name="${radioName}"]`);

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.checked) {
        const card = radio.closest(".perfume-card");
        const imgSrc = card.querySelector("img").src;

        mainImage.src = imgSrc;

        const normalized = imgSrc.split('/').pop().toLowerCase();

        const index = images.findIndex(i =>
          i.toLowerCase().includes(normalized)
        );

        if (index !== -1) {
          currentIndex = index;
          updateGallery(index);
        }
      }
    });
  });
}

connectRadioToGallery("fragrance");
connectRadioToGallery("fragrance1");
connectRadioToGallery("fragrance2");


const cartBtn = document.querySelector(".cart-btn");

function getSelectedText(name) {
  const selected = document.querySelector(`input[name="${name}"]:checked`);
  if (!selected) return "";
  return selected.closest(".top").querySelector("span").innerText.trim();
}

function getPlan() {
  const selected = document.querySelector('input[name="plan"]:checked');
  return selected ? selected.value : "";
}

function getCartLink() {
  const plan = getPlan();

  let fragrance = "";

  if (plan === "single") {
    fragrance = getSelectedText("fragrance");
  } else if (plan === "double") {
    const f1 = getSelectedText("fragrance1");
    const f2 = getSelectedText("fragrance2");
    fragrance = `${f1}-${f2}`;
  }

  return `#?plan=${plan}&fragrance=${fragrance}`;
}

cartBtn.addEventListener("click", () => {
  const link = getCartLink();
  window.location.href = link;
});

document.querySelectorAll('input[type="radio"]').forEach(radio => {
  radio.addEventListener("change", () => {
    console.log(getCartLink());
  });
});
