// DOM Elements
const mainPage = document.getElementById('main-page');
const yipeePage = document.getElementById('yipee-page');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const teaseText = document.getElementById('tease-text');
const confettiContainer = document.getElementById('confetti-container');

// State
let yesScale = 1;
let noClickCount = 0;

// Tease messages that appear when clicking No
const teaseMessages = [
  "Are you sure?",
  "Really?",
  "Pleaseeeeee",
  "I'm BEGGING you",
  "Pweaseee",
  "Somyunggg pwease click yes 🥺",
  "why are you doing this to me :((",
  "I'M ON MY KNEES PLEASEEEEEE 🙏🙏🙏🙏",
  "babe will you please say yes 🥺🥺🥺",
  "last chance babeeeeee"
];

// Handle No button click - only grows the YES button, moves No button away
function handleNoClick() {
  noClickCount++;
  yesScale *= 1.35;
  
  // Apply scale to YES button
  yesBtn.style.transform = `scale(${yesScale})`;
  yesBtn.style.zIndex = '100';
  
  // Calculate No button position - moves toward corner as Yes grows
  // Start moving after first click, progressively move to bottom-right corner
  const maxOffset = 80; // percentage toward corner
  const progress = Math.min(noClickCount / 8, 1); // reaches max at 8 clicks
  
  const offsetX = progress * maxOffset;
  const offsetY = progress * maxOffset;
  
  noBtn.style.position = 'fixed';
  noBtn.style.right = `${5 + (progress * 5)}%`;
  noBtn.style.bottom = `${5 + (progress * 10)}%`;
  noBtn.style.top = 'auto';
  noBtn.style.left = 'auto';
  noBtn.style.zIndex = '50';
  
  // Make No button smaller as it retreats
  const noScale = Math.max(1 - (progress * 0.4), 0.6);
  noBtn.style.transform = `scale(${noScale})`;
  
  // Show tease message and move it down
  const messageIndex = Math.min(noClickCount - 1, teaseMessages.length - 1);
  teaseText.textContent = teaseMessages[messageIndex];
  
  // Move tease text down as Yes button grows
  teaseText.style.position = 'fixed';
  teaseText.style.bottom = `${10 + (progress * 15)}%`;
  teaseText.style.left = '50%';
  teaseText.style.transform = 'translateX(-50%)';
  teaseText.style.zIndex = '150';
  
  // If Yes button is huge enough, make it cover the entire screen
  if (yesScale > 15) {
    yesBtn.style.position = 'fixed';
    yesBtn.style.top = '50%';
    yesBtn.style.left = '50%';
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
    yesBtn.style.width = '100vw';
    yesBtn.style.height = '100vh';
    yesBtn.style.borderRadius = '0';
    noBtn.style.display = 'none';
    teaseText.style.display = 'none';
  }
}

// Handle Yes button click - show celebration
function handleYesClick() {
  mainPage.classList.add('hidden');
  yipeePage.classList.remove('hidden');
  createConfetti();
}

// Handle Try Again button click - reset everything
function handleTryAgain() {
  yipeePage.classList.add('hidden');
  mainPage.classList.remove('hidden');
  
  // Reset state
  yesScale = 1;
  noClickCount = 0;
  
  // Reset Yes button
  yesBtn.style.transform = 'scale(1)';
  yesBtn.style.position = '';
  yesBtn.style.top = '';
  yesBtn.style.left = '';
  yesBtn.style.width = '';
  yesBtn.style.height = '';
  yesBtn.style.borderRadius = '';
  yesBtn.style.zIndex = '';
  
  // Reset No button
  noBtn.style.position = '';
  noBtn.style.right = '';
  noBtn.style.bottom = '';
  noBtn.style.top = '';
  noBtn.style.left = '';
  noBtn.style.transform = '';
  noBtn.style.zIndex = '';
  noBtn.style.display = '';
  
  // Reset tease text
  teaseText.textContent = '';
  teaseText.style.display = '';
  teaseText.style.position = '';
  teaseText.style.bottom = '';
  teaseText.style.left = '';
  teaseText.style.transform = '';
  teaseText.style.zIndex = '';
  
  // Clear confetti
  confettiContainer.innerHTML = '';
}

// Create confetti animation
function createConfetti() {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#4caf50', '#ffeb3b', '#ff9800'];
  const shapes = ['circle', 'square', 'heart'];
  
  // Create 100 confetti pieces
  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = 2 + Math.random() * 3;
      const size = 8 + Math.random() * 12;
      
      confetti.style.left = `${left}%`;
      confetti.style.animationDuration = `${duration}s`;
      
      if (shape === 'heart') {
        confetti.classList.add('heart');
        confetti.innerHTML = '&#10084;';
        confetti.style.color = color;
        confetti.style.fontSize = `${size}px`;
      } else if (shape === 'circle') {
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = '50%';
      } else {
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
      }
      
      confettiContainer.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }, i * 30);
  }
}

// Event Listeners
yesBtn.addEventListener('click', handleYesClick);
noBtn.addEventListener('click', handleNoClick);
tryAgainBtn.addEventListener('click', handleTryAgain);
