
let isCleaned = false;
const textsToHide = [
  "CDMS স্বয়ংক্রিয় ভাবে তৈরী খসড়া রিপোর্ট (CD) , এখনো পরিবর্তন যোগ্য, CD চূড়ান্ত করে প্রিন্ট করুন।"
];
let hiddenElements = [];
let originalOpacity = [];

function cleanCDPage() {
  // Store original opacity and set everything to full opacity
  originalOpacity = [];
  document.querySelectorAll("*").forEach(el => {
    originalOpacity.push({ el, opacity: el.style.opacity });
    el.style.opacity = "1.0";
  });

  // Hide elements containing specific texts
  document.querySelectorAll("body *").forEach(el => {
    textsToHide.forEach(text => {
      if (el.innerText && el.innerText.trim() === text) {
        el.style.display = "none";
        hiddenElements.push(el);
      }
    });
  });

  // Hide buttons with "Confirm CD"
  document.querySelectorAll("button, input[type='button'], input[type='submit']").forEach(btn => {
    if (btn.innerText.includes("Confirm CD") || btn.value === "Confirm CD") {
      btn.style.display = "none";
      hiddenElements.push(btn);
    }
  });

  isCleaned = true;
}

function restorePage() {
  // Restore original opacity
  originalOpacity.forEach(({ el, opacity }) => {
    el.style.opacity = opacity;
  });

  // Show previously hidden elements
  hiddenElements.forEach(el => {
    el.style.display = "";
  });

  hiddenElements = [];
  originalOpacity = [];
  isCleaned = false;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clean_cd_page") {
    if (!isCleaned) {
      cleanCDPage();
    } else {
      restorePage();
    }
  }
});
