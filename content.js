let isCleaned = false;
const textsToHide = [
  "CDMS স্বয়ংক্রিয় ভাবে তৈরী খসড়া রিপোর্ট (CD) , এখনো পরিবর্তন যোগ্য, CD চূড়ান্ত করে প্রিন্ট করুন।"
];
let hiddenElements = [];
let originalOpacity = [];
let originalParentStyles = new Map();

// পেজ লোড হওয়ার সময় অ্যাকটিভ মোড চেক করা
chrome.storage.local.get('activeMode', (result) => {
  if (result.activeMode) {
    cleanCDPage();
  }
});

function cleanCDPage() {
  // পুরনো ডাটা রিসেট
  hiddenElements = [];
  originalOpacity = [];
  originalParentStyles.clear();

  // সব এলিমেন্টের অপাসিটি ১.০ করা
  document.querySelectorAll("*").forEach(el => {
    originalOpacity.push({ el, opacity: el.style.opacity });
    el.style.opacity = "1.0";
  });

  // নির্দিষ্ট টেক্সট লুকানো
  document.querySelectorAll("body *").forEach(el => {
    textsToHide.forEach(text => {
      if (el.innerText && el.innerText.trim() === text) {
        el.style.display = "none";
        hiddenElements.push(el);
      }
    });
  });

  // Confirm CD বাটন এবং প্যারেন্ট কন্টেইনার লুকানো
  document.querySelectorAll("button, input[type='button'], input[type='submit']").forEach(btn => {
    if (
      (btn.innerText && btn.innerText.includes("Confirm CD")) ||
      btn.value === "Confirm CD"
    ) {
      const parent = btn.parentElement;
      btn.style.display = "none";
      hiddenElements.push(btn);

      if (parent) {
        originalParentStyles.set(parent, {
          margin: parent.style.margin,
          padding: parent.style.padding,
          height: parent.style.height,
          display: parent.style.display
        });

        parent.style.margin = "0";
        parent.style.padding = "0";
        parent.style.height = "0";
        parent.style.display = "none";
      }
    }
  });

  // খালি স্পেস ডিভ লুকানো
  document.querySelectorAll("div.col.col-5").forEach(div => {
    const span = div.querySelector("span.apex-grid-nbsp");
    if (
      span &&
      span.innerHTML.trim() === "&nbsp;" &&
      div.innerText.trim() === ""
    ) {
      div.style.display = "none"; 
      hiddenElements.push(div);
    }
  });

  isCleaned = true;
}

function restorePage() {
  // অপাসিটি ফিরিয়ে আনা
  originalOpacity.forEach(({ el, opacity }) => {
    el.style.opacity = opacity;
  });

  // প্যারেন্ট স্টাইল ফিরিয়ে আনা
  originalParentStyles.forEach((styles, parent) => {
    parent.style.margin = styles.margin;
    parent.style.padding = styles.padding;
    parent.style.height = styles.height;
    parent.style.display = styles.display;
  });

  // লুকানো এলিমেন্ট দেখানো
  hiddenElements.forEach(el => {
    el.style.display = ""; 
  });

  // সব রিসেট
  hiddenElements = [];
  originalOpacity = [];
  originalParentStyles.clear();
  isCleaned = false;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clean_cd_page") {
    if (!isCleaned) {
      cleanCDPage();
    } else {
      restorePage();
    }
  } else if (request.action === "active_mode_toggle") {
    if (request.activeMode) {
      cleanCDPage();
    } else {
      restorePage();
    }
  }
});
