const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const container = document.querySelector('.container');
const headerText = document.querySelector('.header_text');
const gifImage = document.querySelector('.gif_container img');

let noClickCount = 0;
const PADDING = 20;

/**
 * Positions the No button absolutely within the container bounds
 * so it can start moving around on click.
 */
function initNoButtonPosition() {
    if (!noButton || !container) return;
    const cRect = container.getBoundingClientRect();
    const bRect = noButton.getBoundingClientRect();
    
    noButton.style.position = 'absolute';
    noButton.style.left = (bRect.left - cRect.left) + 'px';
    noButton.style.top = (bRect.top - cRect.top) + 'px';
}

/**
 * Moves the No button to a random spot inside the container.
 */
function moveNoButtonAway() {
    if (!noButton || !container) return;
    
    const cRect = container.getBoundingClientRect();
    const bRect = noButton.getBoundingClientRect();
    
    // Calculate boundaries to keep button inside container
    const maxLeft = cRect.width - bRect.width - PADDING;
    const maxTop = cRect.height - bRect.height - PADDING;
    
    const newLeft = PADDING + Math.random() * Math.max(0, maxLeft - PADDING);
    const newTop = PADDING + Math.random() * Math.max(0, maxTop - PADDING);
    
    noButton.style.left = newLeft + 'px';
    noButton.style.top = newTop + 'px';
}

// ----- No button click logic -----
noButton.addEventListener('click', () => {
    noClickCount++;

    // Switch to absolute positioning on the first click
    if (noClickCount === 1) {
        initNoButtonPosition();
    }
    
    // Move the button every time it is clicked
    moveNoButtonAway();

    // Increase Yes button scale by 0.4 each click
    const scaleFactor = 1 + noClickCount * 0.4;
    yesButton.style.transform = `scale(${scaleFactor})`;

    // Change Yes button color to green
    yesButton.style.backgroundColor = '#28a745';

    // Update header text based on click count
    const texts = [
        "Are you sure?",
        "Are you don't want to think again",
        "No second guessing",
        "No regrets"
    ];

    if (noClickCount <= texts.length) {
        headerText.textContent = texts[noClickCount - 1];
    } else {
        headerText.textContent = "No regrets";
    }

    // Shrink GIF size (min 40%)
    let newGifWidthPercent = Math.max(40, 100 - noClickCount * 15);
    gifImage.style.maxWidth = newGifWidthPercent + '%';

    // Hide No button when Yes becomes very large
    if (scaleFactor > 2.5) {
        noButton.classList.add('hidden');
    }
});

// ----- Yes button final logic -----
yesButton.addEventListener('click', () => {
    if (noClickCount >= 4) {
        // Success state
        gifImage.src = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnRvaGZkY3hpd3prN3duZnRqY3Nxcjh0NnJsenk0aGF4a3E4a3N6MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ieJXRlUHIGnkVWqhIh/giphy.gif";
        gifImage.style.maxWidth = "100%";
        headerText.textContent = "thank you , I just joking, Im busy by the way";
        
        // Reset Yes button appearance
        yesButton.style.transform = 'scale(1)';
        yesButton.style.backgroundColor = '#ff6b81';
        noButton.classList.add('hidden');
    } else {
        alert("Yay! You clicked Yes!");
    }
});
