document.addEventListener('DOMContentLoaded', function() {
    if(mobileAndTabletCheck()){
        document.getElementById("sectionBackground").remove();
    }
 }); 

window.addEventListener('load', function() {
    document.addEventListener('mousemove', function(e) {
        const logo = document.getElementById('landingAnimation');
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate rotation angle based on mouse position
        const rotateY = (clientX - innerWidth / 2) / innerWidth * 40; // Adjust the multiplier for intensity
        
        // Calculate tilt (rotateX) based on mouse position (inverted for tilt effect)
        const rotateX = (innerHeight / 2 - clientY) / innerHeight * 40; // Adjust the multiplier for intensity
    
        // Apply the transform with rotation and tilt (rotateX)
        logo.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
});
function wrapWordsWithSpan(elementId, spanClass) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found.`);
        return;
    }

    // Get the text content of the element
    const text = element.textContent;

    // Split the text into words (using regex to include punctuation marks)
    const words = text.split(/(\s+)/).filter(word => word.trim().length > 0);

    // Wrap each word in a span element
    const wrappedWords = words.map(word => {
        return `<span class="${spanClass}">${word}</span>`;
    }).join(' ');

    // Set the modified content back to the element
    element.innerHTML = wrappedWords;
}

// Call the function to wrap words in the element with id "content"
wrapWordsWithSpan('vslHeading', 'word');

const words = document.querySelectorAll('.word');
const vslHeading = document.getElementById('vslHeading')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('wordAnimation');
        } 
        /* else {
            entry.target.classList.remove('wordAnimation');
        } */
    });
});

words.forEach((el) => observer.observe(el));

const video = document.getElementById('sectionBackground');

let scrollTimeout;

// Function to play the video
function playVideo() {
    if (video.paused) {
        video.play();
    }
}

// Function to pause the video
function pauseVideo() {
    if (!video.paused) {
        video.pause();
    }
}

// Event listener for scroll events
window.addEventListener('scroll', () => {
    playVideo(); // Play the video when scrolling

    // Clear any existing timeout to avoid pausing the video too soon
    clearTimeout(scrollTimeout);

    // Set a timeout to pause the video if no scroll event occurs within 200 milliseconds
    scrollTimeout = setTimeout(pauseVideo, 100);
});

// Pause the video initially until the user starts scrolling
pauseVideo();

const zoom = document.querySelector('.zoom');
const minZoom = 0.5;
const maxZoom = 1.9; // Initial zoom level

window.addEventListener('scroll', () => {
    const vh = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;

    const whoAreWe = document.getElementById('whoAreWe');
    const whoAreWeRect = whoAreWe.getBoundingClientRect();
    const whoAreWeTop = whoAreWeRect.top + scrollTop;
    const whoAreWeHeight = whoAreWeRect.height;

    const start = whoAreWeTop - vh + (vh * 0.95); // Start zooming out when the top of the image is at 75% of the viewport height
    const stop = whoAreWeTop + whoAreWeHeight - (vh); // Stop zooming out when the bottom of the image is at 70% of the viewport height

    if (scrollTop > start && scrollTop < stop) {
        const progress = (scrollTop - start) / (stop - start);
        const scale = maxZoom - (progress * (maxZoom - minZoom));
        zoom.style.transform = `scale(${scale})`;
    } else if (scrollTop <= start) {
        zoom.style.transform = `scale(${maxZoom})`;
    } else if (scrollTop >= stop) {
        zoom.style.transform = `scale(${minZoom})`;
    }
});

// set up text to print in review section, each item in array is new line
var review1 = [
    "'Nathan is a highly skilled 3D product animator and video editor, and he works with great efficiency and dedication. He made a 3D animated video involving complex motion design for my company's supplement products and also edited a commercial. Throughout the process, he was highly responsive to feedback and made revisions swiftly and effectively. With his expert skills, he was able to not only realise what I envisioned for the video but also exceed my expectations. The end product is worthy of a professional design studio.", 
    "I highly recommend Nathan's design services, and he is a joy to work with.'"
];

var review2 = [
    "You will get more good reviews in the future, this is allowing you to implement them in ur website :)", 
    "I dont have Wongs face yet, thats why im using mine lmao'."
];

var iSpeed = 20; // time delay of print out

function typewriter(textArray, elementId) {
    var iIndex = 0; // start printing array at this position
    var iArrLength = textArray[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row

    function type() {
        sContents = ' ';
        iRow = Math.max(0, iIndex - iScrollAt);
        var destination = document.getElementById(elementId);
        
        while (iRow < iIndex) {
            sContents += textArray[iRow++] + '<br />';
        }
        destination.innerHTML = sContents + textArray[iIndex].substring(0, iTextPos) + "_";
        if (iTextPos++ == iArrLength) {
            iTextPos = 0;
            iIndex++;
            if (iIndex != textArray.length) {
                iArrLength = textArray[iIndex].length;
                setTimeout(type, 500);
            }
        } else {
            setTimeout(type, iSpeed);
        }
    }

    type();
}

typewriter(review1, "review1Text");

// VSL carousel
const vslCarousel = document.getElementById('vslCarousel');
let vslSlides = document.querySelectorAll('.vslCarouselSlide');
let vslSlideWidth = vslSlides[0].clientWidth;

let vslCurrentIndex = 0;

const vslLeftCNav = document.getElementById('vslPrev');
const vslRightCNav = document.getElementById('vslNext');
const vslTotalSlides = vslSlides.length;

let vslAutoSlideInterval;

document.addEventListener('DOMContentLoaded', function() {

    const needToResizeVslCarousel = getUrlParameter('resize');
    if (needToResizeVslCarousel) {
        resizeVsl();
    }

    vslSlideWidth = vslSlides[0].clientWidth;
    vslSlides = document.querySelectorAll('.vslCarouselSlide');

    // Optional: Auto slide every 5 seconds
    vslAutoSlideInterval = setInterval(() => {
        vslCurrentIndex = (vslCurrentIndex + 1) % vslTotalSlides;
        vslGoToSlide(vslCurrentIndex);
    }, 5000);

    // Previous button click event
    vslLeftCNav.addEventListener('click', () => {
        vslCurrentIndex = (vslCurrentIndex - 1 + vslTotalSlides) % vslTotalSlides;
        vslGoToSlide(vslCurrentIndex);
    });

    // Next button click event
    vslRightCNav.addEventListener('click', () => {
        vslCurrentIndex = (vslCurrentIndex + 1) % vslTotalSlides;
        vslGoToSlide(vslCurrentIndex);
    });

    // Pause auto-slide on manual navigation
    vslLeftCNav.addEventListener('click', () => clearInterval(vslAutoSlideInterval));
    vslRightCNav.addEventListener('click', () => clearInterval(vslAutoSlideInterval));
});

// Resize event listener
window.addEventListener('resize', () => {
    resizeVsl();
});

function resizeVsl(){
    vslSlideWidth = vslSlides[0].clientWidth;
    vslGoToSlide(vslCurrentIndex);
}

resizeVsl();

const vslCarouselBg = document.getElementById('vslImgContainer');

function vslFadeIn(){
    vslCarouselBg.classList.remove('whiteHoverAnimationEnd');
    vslCarouselBg.classList.add('whiteHoverAnimation');
}

function vslFadeOut(){
    vslCarouselBg.classList.remove('whiteHoverAnimation');
    vslCarouselBg.classList.add('whiteHoverAnimationEnd');
}

document.addEventListener('DOMContentLoaded', () => {
    vslCarouselBg.addEventListener('mouseenter', () => {
        vslFadeIn();
    });

    vslCarouselBg.addEventListener('mouseleave', () => {
        vslFadeOut();
    });
});

function initIndexHammer() {
    var element2 = document.getElementById("vslCarousel");
    var hammertime2 = new Hammer(element2);
    hammertime2.on("swiperight", function (event) {         
        vslSlideWidth = vslSlides[0].clientWidth;
        vslGoToSlide(vslCurrentIndex);
        vslCurrentIndex = (vslCurrentIndex - 1 + vslTotalSlides) % vslTotalSlides;
        vslGoToSlide(vslCurrentIndex);
        clearInterval(vslAutoSlideInterval);  
    });
    hammertime2.on("swipeleft", function (event) {         
        vslSlideWidth = vslSlides[0].clientWidth;
        vslGoToSlide(vslCurrentIndex);
        vslCurrentIndex = (vslCurrentIndex + 1) % vslTotalSlides;
        vslGoToSlide(vslCurrentIndex);
        clearInterval(vslAutoSlideInterval);
    });
}

function vslGoToSlide(index) {
    if (index < 0 || index >= vslTotalSlides) return;

    vslCarousel.style.transform = `translateX(-${index * vslSlideWidth}px)`;
    vslCurrentIndex = index;
}

vslSlideWidth = vslSlides[0].clientWidth;
vslGoToSlide(vslCurrentIndex);