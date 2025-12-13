
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

  // Hide buttons with "Confirm CD" and remove empty space
  document.querySelectorAll("button, input[type='button'], input[type='submit']").forEach(btn => {
    if (
      (btn.innerText && btn.innerText.includes("Confirm CD")) ||
      btn.value === "Confirm CD"
    ) {
      const parent = btn.parentElement;

      // Hide button
      btn.style.display = "none";
      hiddenElements.push(btn);

      // Remove parent spacing to avoid empty line
      if (parent) {
        parent.style.margin = "0";
        parent.style.padding = "0";
        parent.style.height = "0";
        parent.style.display = "none";
        hiddenElements.push(parent);
      }
    }
  });

  // Remove empty col-5 div containing only &nbsp;
  document.querySelectorAll("div.col.col-5").forEach(div => {
    const span = div.querySelector("span.apex-grid-nbsp");
    if (
      span &&
      span.innerHTML.trim() === "&nbsp;" &&
      div.innerText.trim() === ""
    ) {
      div.remove();
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
    el.style.margin = "";
    el.style.padding = "";
    el.style.height = "";
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
