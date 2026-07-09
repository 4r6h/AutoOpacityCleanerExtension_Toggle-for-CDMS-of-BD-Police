let clickTimer = null;

chrome.action.onClicked.addListener((tab) => {
  if (clickTimer) {
    clearTimeout(clickTimer);
    clickTimer = null;
    // ডাবল ক্লিক শনাক্ত
    handleDoubleClick(tab);
  } else {
    clickTimer = setTimeout(() => {
      clickTimer = null;
      // একক ক্লিক শনাক্ত
      handleSingleClick(tab);
    }, 300); // ৩০০ মিলিসেকেন্ডের মধ্যে ২য় ক্লিক করলে ডাবল ক্লিক
  }
});

async function handleDoubleClick(tab) {
  const result = await chrome.storage.local.get('activeMode');
  const newMode = !(result.activeMode || false);
  await chrome.storage.local.set({ activeMode: newMode });

  // বর্তমান ট্যাবে মোড পরিবর্তন জানানো
  chrome.tabs.sendMessage(tab.id, { 
    action: "active_mode_toggle", 
    activeMode: newMode 
  }).catch(() => {
    // CDMS পেজ না থাকলে এরর ইগনোর করা হবে
  });
}

async function handleSingleClick(tab) {
  const result = await chrome.storage.local.get('activeMode');
  if (result.activeMode) {
    // অ্যাকটিভ মোড চালু থাকলে একক ক্লিক কিছু করবে না
    return;
  }
  // অ্যাকটিভ মোড বন্ধ থাকলে আগের মতো টগল করবে
  chrome.tabs.sendMessage(tab.id, { action: "clean_cd_page" });
}
