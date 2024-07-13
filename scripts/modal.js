// Get the modal
var modal = document.getElementById("modal");
let modalActive = false;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Carousel
const carousel = document.getElementById('carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slides;
let slideWidth;
let totalSlides;
let currentIndex;
let index;
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
    '../assets/livingThings/wl.png',
    '../assets/vr.jpg',
    '../assets/based/peelfinal.png',
    '../assets/based/3comp.png'
];
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
        "Based Bodyworks", 
        [
            "A bathroom setting featuring a showcase of shampoo ingredients.",
            "In a jungle setting, reviews showcase a shampoo and conditioner bundle with product ingredients subtly in the background",
            "Bundle products displayed on an ancient pillar against a dramatic sky and clouds backdrop. This composition exudes a sense of timeless elegance and distinction, ideal for highlighting unique selling points.",
            "Texture powder presented against a gradient background, featuring a transparent coating delicately peeling off the product, revealing its unique texture and appeal.",
            "Texture powder on a pillar, surrounded by ethereal floating rocks. The powder is depicted in motion, with a captivating visual of particles dispersing from its base, evoking a sense of dynamic energy and unique textural quality.",
            "Conditioner gently tilted against a backdrop of soft light. Ideal for a striking product listing that highlights the product's elegant presentation."
        ],
        "3D renders for Based Bodyworks"
    ],
    [
        ['../assets/21.jpeg'], 
        "LANEIGE", 
        ["The purpose of this render for Laneige was to focus on a minimalist scene and detailed texturing. These two combined offer a more elegant approach to your classic white background front angle product images."],
        "3D render for LANEIGE"
    ],
    [
        ['../assets/111skin.jpg'], 
        "111 Skin", 
        ["The purpose of this render for 111SKIN was to emphasize the luxurious and sophisticated nature of the product. The black diamond cream is set against a rich, dark fabric background that highlights its elegance and exclusivity. Detailed texturing and the play of light and shadow enhance the product's premium appeal, providing a striking contrast that draws attention to its sleek, glossy packaging. This approach creates a captivating visual that goes beyond the traditional product shot, adding a layer of depth and allure to the presentation."],
        "3D render for 111 Skin"
    ],
    [
        ['../assets/BasedBalm_still.jpg'], 
        "Based Balm", 
        ["The purpose of this render for Based Balm was to capture the essence of its all-natural ingredients and its connection to nature. Set amidst a lush, green environment, the product is depicted as harmoniously blending with its natural surroundings. The soft, natural light filtering through the foliage enhances the organic appeal of the packaging, emphasizing its purity and commitment to natural ingredients. This scene creates an inviting, earthy ambiance that highlights the product's core values and appeals to those seeking nature-inspired skincare solutions."],
        "3D render for Based Balm"
    ],
    [
        ['../assets/vr.jpg'], 
        "VR", 
        ["Apple Pro Vision virtual headset", "second description"],
        "3D renders of Apple Vision Pro",
        ['../assets/thumbnails/vrThumbnail.png']
    ],
    [
        ['../assets/LaPerse_still.jpg'], 
        "LA PERSE", 
        ["The purpose of this render for La Perse was to evoke a sense of mystery and elemental beauty. Positioned on a pedestal within a cave setting, the product is surrounded by rugged rocks and illuminated by dramatic, dark lighting. The subtle noise in the image emphasizes the dust in the air, enhancing the raw, natural atmosphere. This unique approach highlights the product's connection to the earth and its potent, natural ingredients, presenting La Perse as a luxurious face care solution emerging from the depths of nature."],
        "3D render for LA PERSE"
    ],
    [
        ['../assets/glasses.png'], 
        "Glasses", 
        ["The purpose of this render for the blue light glasses was to showcase their innovative design and functionality in a minimalist setting. Set against a sleek black background, the transparent and bendable frame of the glasses is highlighted, emphasizing their flexibility and modern aesthetic. This simplistic approach draws attention to the unique qualities of the product, presenting it as a stylish and practical solution for eye protection in the digital age."],
        "3D render of a pair of glasses"
    ],
    [
        ['../assets/dolce.jpg'], 
        "DOLCE & GABBANA", 
        ["A cologne bottle is perched atop a mountain under a picturesque sky. Droplets from the product create ripples in the water below, surrounded by lush vegetation. This 3D render showcases a perfume from Dolce & Gabbana."]
    ],
    [
        ['../assets/videos/naturateVertical.mp4'], 
        "NATURATE animation", 
        ["Description"],
        "A 3D animation of a product from Naturate with floating rocks.",
        ['../assets/thumbnails/bottleThumbnail.png']
    ],
    [
        ['../assets/videos/dome.mp4'], 
        "Dome Health animation", 
        ["Description for dome commercial"],
        "A 3D Animation for a product from Dome Health and Theia Bio",
        ['../assets/thumbnails/domeThumbnail.png']
    ],
    [
        ['../assets/videos/soulbrew.mp4'], 
        "Animation for Soulbrew", 
        ["Description"],
        "A 3D Animation for a product from Soulbrew",
        ['../assets/thumbnails/soulbrewThumbnail.png']
    ],
    [
        ['../assets/videos/sphereVid.mp4'], 
        "LUXE SPHERE 3", 
        ["Description"],
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
            "After the initial 3D model is created, we present it to you for review. We value your feedback and will make any necessary adjustments to ensure the final render meets your expectations perfectly. You are entitled to three revisions for free, ensuring that every detail aligns with your vision. Once you are completely satisfied, we deliver the final high-quality 3D stills and animations in your desired format, ready for use in marketing, advertising, or any other application you have in mind."
        ],
        "A guide describing the interaction that follows every partnership." 
    ]
];


// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    closeModal();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Add a key listener for the Escape button to close the modal
document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && modalActive) {
        closeModal();
    }
});

function closeModal() {
    document.body.style.overflowY = "scroll";
    modal.style.display = "none";
    modalActive = false;
}

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

// Make goToSlide available globally
window.goToSlide = goToSlide;

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

    initHammer(); // Initialize hammer
});

// Resize event listener
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

function initialiseCarousel(index) {
    if (!modalActive) {
        if (index >= 0 && index < items.length) {
            if(items[index][4] != null){
                updateCarousel(items[index][0], items[index][2], items[index][3], 0, items[index][4]);
            } else {
                updateCarousel(items[index][0], items[index][2], items[index][3], 0, null);
            }

        } else {
            console.error('Index out of bounds');
        }
    }
}

function hideCarouselNav() {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
}

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

        if (imageSrc.includes("mp4") || imageSrc.includes("mov") || imageSrc.includes("webm")) {
            project = document.createElement('video');
            project.src = imageSrc;
            project.controls = true;
            project.preload = "none";
            if(thumbnail != null){
                project.poster = thumbnail;
            }
        } else {
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
        paragraph.innerHTML += "<span class='caret'></span>";
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

function openModal(item, ind) {
    currentIndex = ind; // Set to the specified slide
    document.body.style.overflowY = "hidden";
    if(item[4] != null){
        updateCarousel(item[0], item[2], item[3], currentIndex, item[4]);
    } else {
        updateCarousel(item[0], item[2], item[3], currentIndex, null);
    }
    modal.style.display = "block";
    modalActive = true;

    if (document.getElementById('mouseOverlay') != null) {
        document.getElementById('mouseOverlay').style.display = "none";
    }
    document.getElementById('modalTitle').innerHTML = item[1];
    document.getElementById('modalH3').innerHTML = item[1];
    prevButton.style.display = "flex";
    nextButton.style.display = "flex";
    if (item[0].length <= 1) {
        hideCarouselNav();
    }
    resize();
}

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

// Example usage to initialize the carousel with the second item
initialiseCarousel(1);
