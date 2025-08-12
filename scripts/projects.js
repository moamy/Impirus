// The "Click me" section consists of a canvas element. 
// So all logic that mentions "canvas" has to do with the "click me" section.
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let imageIndex = 0;
const placedImages = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Animates every image being placed on the canvas to float down. 
function animateImage(img, startX, startY, endX, endY, duration) {
    const startTime = performance.now();
    
    function animationStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
        placedImages.forEach(({ img, x, y }) => {
            ctx.drawImage(img, x, y);
        });

        ctx.drawImage(img, x, y);
        
        if (progress < 1) {
            requestAnimationFrame(animationStep);
        } else {
            placedImages.push({ img, x: endX, y: endY });
            if (placedImages.length > 15) { // Removes the oldest placed photos. 
                // The current boundary is set to 15 pictures at a time. Adjust as needed, but do NOT make it an insane amount.
                const oldImage = placedImages.shift();
                ctx.clearRect(oldImage.x, oldImage.y, oldImage.img.width, oldImage.img.height);
                ctx.fillStyle = 'rgba(0,0,0,0)'; // Assuming white background, adjust if needed
                ctx.fillRect(oldImage.x, oldImage.y, oldImage.img.width, oldImage.img.height);
                
                // Redraw remaining images
                placedImages.forEach(({ img, x, y }) => {
                    ctx.drawImage(img, x, y);
                });
            }
        }
    }
    
    requestAnimationFrame(animationStep);
}

// Handles the placing of every image on the canvas. 
function placeImage(x, y) {
    const img = new Image();
    img.src = itemsClickMe[imageIndex % itemsClickMe.length];
    img.onload = () => {
        const startX = x - img.width / 2; // Messing with this value will make them fall from different angles
        const startY = y - img.height + (img.height / 3); // This value will effect how far the squares fall !! 
        // You can also mess with it and make it start from the bottom and float up.
        
        const endX = x - img.width / 2; // This value will make the image land exactly where the user clicks, probably shouldnt be messed with
        const endY = y - img.height / 2; // This value will make the image land exactly where the user clicks, probably shouldnt be messed with
        animateImage(img, startX, startY, endX, endY, 200); // This will effect how FAST they fall
        imageIndex++;
    };
}

// Captures the coordinates of where the user is clicking on the canvas, and sends them to the placeImage() method.
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    placeImage(x, y);
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const moreInfo = document.getElementById('moreInfo');
const arrowDown = document.getElementById('arrowDown');
const canvasH2 = document.getElementById('canvasH2');

// For mobile users, the text will say "TAP ME" instead of "CLICK ME"
function checkPhone() {
    const isMobileOrTablet = mobileAndTabletCheck();
    const canvasH2 = document.getElementById('canvasH2'); // Make sure this element exists

    if (isMobileOrTablet) {
        if (canvasH2) {
            canvasH2.innerHTML = "TAP ME";
        } else {
            console.warn("Element with id 'canvasH2' not found.");
        }
    }
}

// Makes the arrow on the canvas appear + float after some seconds
function arrowAnimation(){
    setTimeout(() => {
        moreInfo.classList.add('fadeIn');
        moreInfo.style.display = "flex";
    }, 5000); // Appears after 5 seconds
    setTimeout(() => {
        arrowDown.classList.add('floatUpDown');
    }, 8000); // Starts floating up and down after 8 seconds (three seconds after it appears)
}

// Check if the URL contains a specific project and open the modal with that item. 
// Makes links like "SEE DOME COMMERCIAL NOW" work. 
document.addEventListener('DOMContentLoaded', function() {
    const itemParam = getUrlParameter('item');
    if (itemParam) {
        const itemIndex = parseInt(itemParam, 10);
        if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < items.length) {
            updateCarousel(items[itemIndex][0], items[itemIndex][2], items[itemIndex][3])
            openModal(items[itemIndex]);
        }
    }
});

function toggleCarouselNav(bool){
    if(bool){ document.querySelector(".carouselNav").style.display = "flex"; }
    else { document.querySelector(".carouselNav").style.display = "none"; }
}