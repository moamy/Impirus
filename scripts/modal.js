// Get the modal (Windows XP window)
var modal = document.getElementById("modal");
let modalActive = false;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get modal carousel elements
const carousel = document.getElementById('carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slides;
let slideWidth;
let totalSlides;
let currentIndex;
let index;

// Your own array :o !! These images are included in the "Click me" section.
const itemsClickMe = 
[
    '../assets/based/4.png',
    '../assets/111skin.jpg',
    '../assets/glasses.png',
    '../assets/livingThings/pbo.png',
    '../assets/livingThings/rp.png',
    '../assets/livingThings/lg.png',
    '../assets/based/whitebg.png',
    '../assets/LaPerse_still.jpg',
    '../assets/based/6.png',
    '../assets/BasedBalm_still.jpg',
    '../assets/21.jpeg',
    '../assets/dolce.jpg',
    '../assets/based/usp.png',
    '../assets/based/peelfinal.png',

    '../assets/livingThings/wl.png',
    '../assets/vr.jpg',
    '../assets/based/peelfinal.png',
    '../assets/based/3comp.png'
];
/*
THESE are all the items that can be displayed in the modal. 
If you want to edit/add projects to show in the modal, then you must edit/expand this list (among other steps).
A more detailed explanation can be found in documentation/README.md
*/
const items = [
    [
        ['../assets/webDeveloper.png'], 
        "Meet the Web Developer", 
        ["<p>Hello!<br><br>My name is Moa, and this website was developed by me. Web design credits go to both Impirus Studio and me, Moa Myrén. If you want a similar website made for you, i.e. for partnership, please contact me through E-mail. <br><br>Thank you for viewing my work, as well as Impirus Studio<br><br>- Moa Myrén<br><br><b>For contact:</b></p><a href='mailto: moamyrs@gmail.com' class='webDevButtons'>Mail: moamyrs@gmail.com</a><a href='https://www.linkedin.com/in/moa-myr%C3%A9n-449947316/' class='webDevButtons'>LinkedIn: moamyrs@gmail.com </a>"],
        "A photo of the web developer"
    ],
    [
        ['../assets/livingThings/lg.png',
        '../assets/livingThings/pbo.png', 
        '../assets/livingThings/rp.png',
        '../assets/livingThings/wl.png'], 
        "Living Things Renders", 
        [
            "Description for first living thing render",
            "Description for second living thing render",
            "Description for third living thing render",
            "Description for fourth living thing render"
        ],
        "3D renders for Living Things"
    ],
    [
        ['../assets/based/3comp.png',
        '../assets/based/4.png', 
        '../assets/based/6.png',
        '../assets/based/peelfinal.png',
        '../assets/based/usp.png',
        '../assets/based/whitebg.png'], 
        "based_bodyworks.png", 
        [
            "In a dark, cosmic setting, the product is showcased floating between two rugged, illuminated rocks, creating an ethereal and captivating visual effect. The deep blue background, speckled with subtle starlight, adds a touch of mystery and elegance, making the product appear otherworldly and highly desirable",
            "In a lush, jungle setting, reviews showcase a shampoo and conditioner bundle with product ingredients, coconut and aloe vera, subtly in the background. The scene features the bottles standing amidst vibrant greenery and dewy foliage.",
            "Bundle products displayed on an ancient pillar against a dramatic sky and clouds backdrop. This composition exudes a sense of timeless elegance and distinction, ideal for highlighting unique selling points.",
            "Texture powder presented against a gradient background, featuring a transparent coating delicately peeling off the product, revealing its unique texture and appeal.",
            "Texture powder on a pillar, surrounded by ethereal floating rocks. The powder is depicted in motion, with a captivating visual of particles dispersing from its base, evoking a sense of dynamic energy and unique textural quality.",
            "Conditioner gently tilted against a backdrop of soft light. Ideal for a striking product listing that highlights the product's elegant presentation."
        ],
        "3D renders for Based Bodyworks"
    ],
    [
        ['../assets/21.jpeg'], 
        "laneige.png", 
        ["The purpose of this render for Laneige was to focus on a minimalist scene and detailed texturing. These two combined offer a more elegant approach to your classic white background front angle product images."],
        "3D render for LANEIGE"
    ],
    [
        ['../assets/111skin.jpg'], 
        "111_skin.png", 
        ["The purpose of this render for 111SKIN was to emphasize the luxurious and sophisticated nature of the product. The black diamond cream is set against a rich, dark fabric background that highlights its elegance and exclusivity. Detailed texturing and the play of light and shadow enhance the product's premium appeal, providing a striking contrast that draws attention to its sleek, glossy packaging. This approach creates a captivating visual that goes beyond the traditional product shot, adding a layer of depth and allure to the presentation."],
        "3D render for 111 Skin"
    ],
    [
        ['../assets/BasedBalm_still.jpg'], 
        "based_balm.png", 
        ["The purpose of this render for Based Balm was to capture the essence of its all-natural ingredients and its connection to nature. Set amidst a lush, green environment, the product is depicted as harmoniously blending with its natural surroundings. The soft, natural light filtering through the foliage enhances the organic appeal of the packaging, emphasizing its purity and commitment to natural ingredients. This scene creates an inviting, earthy ambiance that highlights the product's core values and appeals to those seeking nature-inspired skincare solutions."],
        "3D render for Based Balm"
    ],
    [
        ['../assets/vr.jpg'], 
        "apple_pro_vision.png", 
        ["Apple Pro Vision virtual headset", "second description"],
        "3D renders of Apple Vision Pro",
        ['../assets/thumbnails/vrThumbnail.png']
    ],
    [
        ['../assets/LaPerse_still.jpg'], 
        "la_perse.png", 
        ["The purpose of this render for La Perse was to evoke a sense of mystery and elemental beauty. Positioned on a pedestal within a cave setting, the product is surrounded by rugged rocks and illuminated by dramatic, dark lighting. The subtle noise in the image emphasizes the dust in the air, enhancing the raw, natural atmosphere. This unique approach highlights the product's connection to the earth and its potent, natural ingredients, presenting La Perse as a luxurious face care solution emerging from the depths of nature."],
        "3D render for LA PERSE"
    ],
    [
        ['../assets/glasses.png'], 
        "theia_bio.png", 
        ["The purpose of this render for the blue light glasses was to showcase their innovative design and functionality in a minimalist setting. Set against a sleek black background, the transparent and bendable frame of the glasses is highlighted, emphasizing their flexibility and modern aesthetic. This simplistic approach draws attention to the unique qualities of the product, presenting it as a stylish and practical solution for eye protection in the digital age."],
        "3D render of a pair of glasses"
    ],
    [
        ['../assets/dolce.jpg'], 
        "dolce_and_gabbana.png", 
        ["A cologne bottle is perched atop a mountain under a picturesque sky. Droplets from the product create ripples in the water below, surrounded by lush vegetation. This 3D render showcases a perfume from Dolce & Gabbana."]
    ],
    [
        ['../assets/videos/naturateVertical.mp4'], 
        "naturate_animation.mp4", 
        ["Introducing Naturate, a concept brand created through 3D rendering. This video features a sleek jar floating among natural stones. The minimalist design highlights Naturate’s commitment to purity and simplicity. The render is intended to evoke a sense of harmony between natural elements and modern design, emphasizing the brand's dedication to using raw, organic materials."],
        "A 3D animation of a product from Naturate with floating rocks.",
        ['../assets/thumbnails/bottleThumbnail.png']
    ],
    [
        ['../assets/videos/dome.mp4'], 
        "dome_health.mp4", 
        ["Introducing Dome Health, a leading brand in the field of nootropics. This captivating video showcases this innovative product, with each pill elegantly floating among glowing synapses. The dynamic animation highlights the core benefits of these nootropics—enhanced focus, improved cognitive function, and heightened mental clarity. As the video progresses, the sleek design and fluid movement of the pills through the neural pathways symbolize the seamless integration of Dome Health's nootropics into your daily routine. The visual representation of synapses emphasizes the connection between the product and the brain's natural functions, reinforcing the idea of achieving peak mental performance through science and wellness."],
        "A 3D Animation for a product from Dome Health and Theia Bio",
        ['../assets/thumbnails/domeThumbnail.png']
    ],
    [
        ['../assets/videos/soulbrew.mp4'], 
        "soulbrew.mp4", 
        ["Description"],
        "A 3D Animation for a product from Soulbrew",
        ['../assets/thumbnails/soulbrewThumbnail.png']
    ],
    [
        ['../assets/videos/luxeText.mp4'], 
        "luxe_sphere3.mp4", 
        ["Introducing the LX-3 Luxe Sphere, a futuristic product concept I designed featuring Ectoplasm® fabric. This captivating video showcases the LX-3's fluid, mesmerizing display of motion and light. The Adaptive Dynamics of the Ectoplasm® fabric allows it to adjust its form seamlessly, while embedded energy spheres in the Interactive Core provide a responsive tactile experience that enhances both play and deep thinking. The video highlights the lightweight yet durable construction of the LX-3, made from high-resilience materials for longevity and endurance across diverse environments. Whether used as a standalone object or integrated into your living space, the LX-3 Luxe Sphere elevates ambiance and stimulates creativity. Ideal for modern interiors, zero-gravity habitats, or as a centerpiece for interactive art installations, this product exemplifies the perfect blend of advanced material science and artistic design, bringing a touch of futuristic elegance to any setting."],       
        "An abstract animation of a textured sphere",
        ['../assets/thumbnails/sphereThumbnail.png']
    ],
    [
        ['../assets/step1.png',
        '../assets/step2.png', 
        '../assets/step3.png',
        '../assets/step4.png'], 
        "Partnership Tutorial", 
        [
            "Our process begins with a personalized consultation call, where we take the time to understand your specific needs and vision. If you're requesting an animation, we'll also create a storyboard that outlines different frames and sequences. This is your opportunity to share your brand’s goals, target audience, and the unique aspects of your product. Our experienced team will ask detailed questions to ensure we capture every nuance of your vision. By the end of this call, you’ll have a clear understanding of how we can transform your ideas into stunning 3D visuals.",
            "Once we have a solid understanding of your needs, we’ll ask you to provide images of your product from multiple angles, flat label images, and any reference images that illustrate how you'd like the final image or animation to look. These references will serve as the foundation for our 3D artists to create accurate and detailed digital models. The more detailed and clear the references, the more precise our final 3D render will be.",
            "With your product images and references in hand, our artists get to work. Using our 3D software, we meticulously recreate your product in digital form, paying close attention to every detail to ensure accuracy and realism. Throughout this stage, you have unlimited calls to check in and review the progress, so you can see your product coming to life step by step.",
            "After each project is finalised we present it for your review. We value your feedback and will make any necessary adjustments to ensure the final render meets your expectations perfectly. You are entitled to three revisions for free, ensuring that every detail aligns with your vision. Once you are completely satisfied, we deliver the final high-quality 3D stills and animations in your desired format, ready for use in marketing, advertising, or any other application you have in mind."
        ],
        "A guide describing the interaction that follows every partnership." 
    ]
];


// When the user clicks on the close button in the modal (x), the modal will close. 
span.onclick = function () {
    closeModal();
}

// When the user clicks anywhere outside of the modal, the modal will close.
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    } 
}

// When the user presses Escape, the modal will close. 
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && modalActive) {
        closeModal();
    }
});

// This method closes the modal
function closeModal() {
    document.body.style.overflowY = "scroll";
    modal.style.display = "none";
    modalActive = false;
}

// This method changes the slide in the carousel
function goToSlide(ind) {
    if (ind < 0 || ind >= totalSlides) return;
    carousel.style.transform = `translateX(-${ind * slideWidth}px)`;
    // Update the visible paragraph
    const paragraphs = document.querySelectorAll('.carousel-paragraph');
    paragraphs.forEach((paragraph, idx) => {
        paragraph.style.display = idx === ind ? 'block' : 'none';
    });
    if (paragraphs.length === 1) {
        paragraphs[0].style.display = 'block';
    }
}

window.goToSlide = goToSlide;

// This section enables you to change slide by pressing the arrow buttons.
document.addEventListener('DOMContentLoaded', function () {
    // Previous button click event
    prevButton.addEventListener('click', () => {
        resize();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    });

    // Next button click event
    nextButton.addEventListener('click', () => {
        resize();
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    });

    initHammer(); // Initialize hammer (swiping on mobile)
});

// Resize carousel slides whenever the user resizes the browser window
window.addEventListener('resize', () => {
    if (slides != null) {
        resize();
    }
});

function resize() {
    if (slides.length > 0) {
        slideWidth = slides[0].clientWidth;
        goToSlide(currentIndex);
    }
}

// This fills the modal with content to show, just to avoid it being empty when entering the site. 
// Needed to avoid "null" errors.
function initialiseCarousel(index) {
    if (!modalActive) {
        if (index >= 0 && index < items.length) {
            if(items[index][4] != null){ // Checks whether the project has a thumbnail for a video
                updateCarousel(items[index][0], items[index][2], items[index][3], 0, items[index][4]);
            } else {
                updateCarousel(items[index][0], items[index][2], items[index][3], 0, null);
            }

        } else {
            console.error('Index out of bounds');
        }
    }
}

// Hides the carousel arrow buttons. Used when there's only one slide to show. 
function hideCarouselNav() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
}

// Actually implements the content in the modal (Which project is  being currently shown)
function updateCarousel(images, descriptions, alt, ind, thumbnail) {
    // Set currentIndex before clearing the carousel
    currentIndex = ind;
    // Clear current slides
    carousel.innerHTML = '';
    const paragraphContainer = document.getElementById('modalPar');
    paragraphContainer.innerHTML = ''; // Clear current paragraphs

    // Loop through the images array and create new slides
    images.forEach((imageSrc, ind) => {
        let project;
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        // If the content is a video -> create a video element rather than an image element.
        if (imageSrc.includes("mp4") || imageSrc.includes("mov") || imageSrc.includes("webm")) {
            project = document.createElement('video');
            project.src = imageSrc;
            project.controls = true;
            project.preload = "none";
            if(thumbnail != null){
                project.poster = thumbnail;
            }
        } else { // If content is an image -> create image element.
            project = document.createElement('img');
            project.src = imageSrc;
            project.alt = alt;
        }
        slide.appendChild(project);
        carousel.appendChild(slide);

        // Create and append paragraph for this slide
        const paragraph = document.createElement('p');
        paragraph.className = 'carousel-paragraph';
        paragraph.innerHTML = descriptions[ind] || 'No description available';
        paragraph.innerHTML += "<span class='caret'></span>"; // Implements the blinking caret animation. 
        // Google "caret text" and go on images to see what I mean
        paragraphContainer.appendChild(paragraph);
    });

    // Update slides and slideWidth after updating carousel
    slides = document.querySelectorAll('.carousel-slide');
    totalSlides = slides.length;
    if (totalSlides > 0) {
        slideWidth = slides[0].clientWidth;
    }
    // Call goToSlide after resizing
    resize();
    goToSlide(ind);
}

// This method opens the modal (displays the modal to the user)
function openModal(item, ind) {
    // Get the viewport height
    const viewportHeight = window.innerHeight;

    const modalContentHeight = modal.scrollHeight;

    // Get the distance from the top of the page to the footer
    const footerRect = footer.getBoundingClientRect();
    const distanceToFooterFromViewport = (footerRect.top);

    let topPosition = window.scrollY;

    // Check if the user is too close to the footer
    if ((viewportHeight - distanceToFooterFromViewport) < modalContentHeight) {
        // Adjust top position to ensure the modal is fully visible above the footer
        topPosition = window.scrollY - (modal.offsetHeight/2);
    }
    
    modal.style.top = `${topPosition}px`;
    currentIndex = ind; // Set to the specified slide
    document.body.style.overflowY = "hidden";
    if(item[4] != null){ // Checks whether the project has a thumbnail for a video
        updateCarousel(item[0], item[2], item[3], currentIndex, item[4]);
    } else {
        updateCarousel(item[0], item[2], item[3], currentIndex, null);
    }
    modal.style.display = "block";
    modalActive = true;

    if (document.getElementById('mouseOverlay') != null) {
        document.getElementById('mouseOverlay').style.display = "none";
    }
    /* document.getElementById('modalTitle').innerHTML = item[1];
    document.getElementById('modalH3').innerHTML = item[1]; */
    prevButton.style.display = "flex";
    nextButton.style.display = "flex";
    if (item[0].length <= 1) {
        hideCarouselNav();
    }
    resize();
    // Will scroll the user up to the modal that's being displayed
    scrollToTarget("modal");
}

// Scrolls the user up to a certain element on the page.
// Is currently used to scroll the user up to the modal, but can be used for other stuff
function scrollToTarget(target) {
    const targetElement = document.getElementById(target);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enables swiping through the carousel for mobile users
function initHammer() {
    var element = document.getElementById("carousel");
    var hammertime = new Hammer(element);
    hammertime.on("swiperight", function (event) {
        resize();
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    });
    hammertime.on("swipeleft", function (event) {
        resize();
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    });
}

// Initialize the carousel with content (does not matter which project is being displayed, the user will not see it)
initialiseCarousel(1);
