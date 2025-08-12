// This block of code will hide (remove) the transparent cube video on mobile platforms. 
// It's added since transparency doesn't work on phones.
document.addEventListener('DOMContentLoaded', function() {
    if(mobileAndTabletCheck()){
        document.getElementById("sectionBackground").remove();
    } 
    
    
 }); 

 // This section makes the logo from the first section rotate/tilt after the users mouse. 
 window.addEventListener('load', function() {
    const logo = document.getElementById('landingAnimation');

    document.addEventListener('mousemove', function(e) {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate rotation angle of logo based on mouse position
      const rotateY = (clientX - innerWidth / 2) / innerWidth * 40; // Adjust the multiplier for rotation intensity
      
      // Calculate tilt (rotateX) of logo based on mouse position (inverted for tilt effect)
      const rotateX = (innerHeight / 2 - clientY) / innerHeight * 40; // Adjust the multiplier for tilt intensity

      // Apply the transform with rotation and tilt (rotateX)
      setTimeout(() => {
        // This if statement checks whether the user is hovering over the logo or not
        if (!logo.classList.contains('hover')) { // User is not hovering over logo
          logo.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        } else { // User is hovering over logo
          logo.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.15)`; // Adjust value within "scale()" to change sizing upon hover
        }
      }, 200);
    });
    // Increase the scale of the logo on hover 
    logo.addEventListener('mouseenter', function() {
      logo.classList.add('hover');
      logo.style.transform += ' scale(1.15)'; // Adjust value within "scale()" to change sizing upon hover
    });

    // Decrease the scale of the logo when they stop hovering 
    logo.addEventListener('mouseleave', function() {
      logo.classList.remove('hover');
      logo.style.transform = logo.style.transform.replace(' scale(1.15)', ''); // Adjust value within "scale()" to change sizing upon hover
    });
  });

// This method opens up the possibility of a floating animation for the first paragraph.
// (where the words float up upon scrolling)
function wrapWordsWithSpan(elementId, spanClass) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with id "${elementId}" not found.`);
        return;
    }

    // Get the text content of the heading
    const text = element.textContent;

    // Split the text into words (using regex to include punctuation marks)
    const words = text.split(/(\s+)/).filter(word => word.trim().length > 0);

    // Wrap each word in a span element (makes every word an inline block)
    const wrappedWords = words.map(word => {
        return `<span class="${spanClass}">${word}</span>`;
    }).join(' ');

    // Set the modified content back to the heading
    element.innerHTML = wrappedWords;
}

// Call the function to wrap words in heading
// If we don't do this process then the entire heading would float up as one big block, which would look strange....
wrapWordsWithSpan('vslHeading', 'word');

// This actually makes the words float up. 
// It senses that you have scrolled far enough down and adds the animation, word for word.
const words = document.querySelectorAll('.word');
const vslHeading = document.getElementById('vslHeading')
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('wordAnimation');
        } 
    });
});

words.forEach((el) => observer.observe(el));

//  This section makes the cube animation pause and play whenever you stop/continue scrolling.
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

// Establishes that whenever you scroll, they should play the cube video.
window.addEventListener('scroll', () => {
    playVideo(); // Play the video when scrolling

    // Clear any existing timeout to avoid pausing the video too soon
    clearTimeout(scrollTimeout);

    // Set a timeout to pause the video if no scroll event occurs within 100 milliseconds
    scrollTimeout = setTimeout(pauseVideo, 100); // Adjust this value to make it react slower/faster to the user having stopped scrolling.
});

// Pause the video initially until the user starts scrolling
pauseVideo();

// This section makes the zoom effect work on the blender workspace screenshot

const zoom = document.getElementById('zoom');
const minTranslateX = 0;
const maxTranslateX = 0;

let zoomedOut = false;

addEventListener('scroll', e => {
    const vh = window.innerHeight / 100;
    const scrollTop = document.documentElement.scrollTop;

    // Calculate the height of all elements above this part of the website
    const topHeight = document.querySelector('.top').offsetHeight;
    const wrapHeight = document.querySelector('.wrap').offsetTop;

    // Adjust the start and stop points based on the cumulative height
    const start = wrapHeight;
    const stop = start + (100 * vh); // Adjust the numeric value as needed to make the zooming in/out animation faster/slower

    if(!zoomedOut){
        if (scrollTop > start && scrollTop < stop) {
            // Calculate the scale value
            const scale = Math.max(2.3 - (scrollTop - start) / 400, 1); // adjust the value "200" to make it scale faster / slower
            
            // Calculate the value of which the image should move to the left / right. 
            // We need this since the image it zooms into is not perfectly horizontally centered.
            const translateX = Math.max(maxTranslateX - (scrollTop - start) / ((stop - start) / (maxTranslateX - minTranslateX)), minTranslateX);
    
            // Apply both scale and translateX (horizontal moving)
            zoom.style.transform = `scale(${scale}) translateX(${translateX}vw)`;
            
        }
    }
    if(scrollTop >= stop){
        zoomedOut = true;
        document.getElementById("zoom").style.position = "static";
    }
});

// Set up the text to print in the review section, each item in array is a new line
var review1 = [
    "'Nathan is a highly skilled 3D product animator and video editor, and he works with great efficiency and dedication. He made a 3D animated video involving complex motion design for my company's supplement products and also edited a commercial. Throughout the process, he was highly responsive to feedback and made revisions swiftly and effectively. With his expert skills, he was able to not only realise what I envisioned for the video but also exceed my expectations. The end product is worthy of a professional design studio.", 
    "I highly recommend Nathan's design services, and he is a joy to work with.'"
];

var iSpeed = 20; // time delay of print out, adjust to make the typing animation faster / slower.

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

/* To actually implement the typing animation, we call the method. 
The first argument takes a string array (see review1 for example), this will determine what is typed.
The second argument takes the id of the element in which you want to type out the text. 
*/
typewriter(review1, "review1Text");

// This logic makes the carousel with the tutorial slides work. 
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

    resizeVsl();

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

// This part makes the background fade (white <=> gray) whenever you hover over it. 
// It doesn't really have much purpose at the moment though, since the tutorial steps do not have any transparency.
// But might be cool in the future, who knows. 
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

// This logic makes it possible for mobile users to swipe through the tutorial carousel. 
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

// Changes the page in the tutorial carousel.
function vslGoToSlide(index) {
    if (index < 0 || index >= vslTotalSlides) return;

    vslCarousel.style.transform = `translateX(-${index * vslSlideWidth}px)`;
    vslCurrentIndex = index;
}

vslSlideWidth = vslSlides[0].clientWidth;
vslGoToSlide(vslCurrentIndex);