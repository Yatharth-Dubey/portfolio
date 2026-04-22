let soundEnabled = true;

const clickAudio = new Audio("/sounds/click_web.mp3");
clickAudio.volume = 1;

const scrollAudio = new Audio("/sounds/scroll_web.wav");
scrollAudio.volume = 0.3;
scrollAudio.loop = true;

let isScrolling = false;
let scrollTimeout: any;

export const toggleSound = () => {
  soundEnabled = !soundEnabled;

  if (!soundEnabled) {
    scrollAudio.pause();
    isScrolling = false;
  }
};

export const isSoundEnabled = () => soundEnabled;

export const playClickSound = () => {
  if (!soundEnabled) return;
  clickAudio.currentTime = 0;
  clickAudio.play().catch(() => {});
};

export const handleScrollSound = () => {
  if (!soundEnabled) return;

  if (!isScrolling) {
    scrollAudio.currentTime = 0;
    scrollAudio.play().catch(() => {});
    isScrolling = true;
  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    scrollAudio.pause();
    isScrolling = false;
  }, 150);
};