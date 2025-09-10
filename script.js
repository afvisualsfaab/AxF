
  
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");

    // Preloader hide after 3 sec
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 3000);
  });

  // Dots ko circle me arrange karna
  document.querySelectorAll('.dots-circle .dot').forEach((dot, i, all) => {
    let total = all.length;
    let angle = (i / total) * (2 * Math.PI);
    let radius = 40; // adjust circle size

    let x = 50 + radius * Math.cos(angle);
    let y = 50 + radius * Math.sin(angle);

    dot.style.left = x + "%";
    dot.style.top = y + "%";
  });



// ==== NAV ACTIVE LINK ON SCROLL ====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav .links a");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80; // navbar height ke barabar offset
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ==== SMOOTH SCROLL WITH OFFSET ====
navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    const offset = 80; // navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = target.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  });
});

// ==== OPTIONAL: SCROLL REVEAL ANIMATION ====
const revealElements = document.querySelectorAll(".tile, .btn, h2, p");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 60) {
      el.classList.add("show");
    }
  });
});
// Mobile menu toggle
const nav = document.querySelector(".nav");
const navLinksDiv = document.querySelector(".nav .links");

// Click anywhere on brand (or you can add hamburger button)
document.querySelector(".brand").addEventListener("click", () => {
  nav.classList.toggle("active");
});
 // Example conversion rates (static demo)
// NOTE: agar live rates chahiye to API use karni hogi
const rates = {
  USD: 1, PKR: 277, INR: 83, EUR: 0.92, GBP: 0.79, AUD: 1.53, CAD: 1.37,
  JPY: 147, CNY: 7.2, AED: 3.67, SAR: 3.75, TRY: 27, RUB: 95, BDT: 109,
  LKR: 326, NPR: 133, MYR: 4.7, THB: 35, ZAR: 19, BRL: 5, MXN: 17.5
};
const symbols = {
  USD:"$", PKR:"₨", INR:"₹", EUR:"€", GBP:"£", AUD:"A$", CAD:"C$", 
  JPY:"¥", CNY:"¥", AED:"د.إ", SAR:"﷼", TRY:"₺", RUB:"₽", BDT:"৳",
  LKR:"₨", NPR:"₨", MYR:"RM", THB:"฿", ZAR:"R", BRL:"R$", MXN:"Mex$"
};

// Fill dropdown dynamically
const select = document.getElementById("currency");
Object.keys(rates).forEach(cur=>{
  const opt = document.createElement("option");
  opt.value = cur;
  opt.textContent = `${cur} — ${symbols[cur]||cur}`;
  if(cur==="USD") opt.selected = true;
  select.appendChild(opt);
});

const prices = document.querySelectorAll(".price");

function convertPrices(){
  const cur = select.value;
  prices.forEach(p=>{
    const usd = parseFloat(p.dataset.usd);
    if(!usd) return;
    const v = usd * (rates[cur] || 1);
    const out = (["PKR","INR","JPY","CNY","LKR","NPR","BDT"].includes(cur))
      ? Math.round(v)
      : v.toFixed(2);
    p.textContent = (symbols[cur]||"") + out;
  });
}

select.addEventListener("change", convertPrices);

// Page load pe bhi run karo
convertPrices();


