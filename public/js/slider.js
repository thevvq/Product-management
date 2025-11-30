document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const dotsContainer = document.querySelector(".dots");
    let current = 0;
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    const imageWidth = images[0].clientWidth;

    // Tạo dots
    images.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            current = i;
            updateSlide();
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll(".dot");

    function updateSlide() {
        currentTranslate = -current * imageWidth;
        prevTranslate = currentTranslate;
        slides.style.transition = "transform 0.3s ease"; // animate khi snap
        slides.style.transform = `translateX(${currentTranslate}px)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[current].classList.add("active");
    }

    // Auto-slide
    let autoSlide = setInterval(() => {
        if (!isDragging) {
            current = (current + 1) % images.length;
            updateSlide();
        }
    }, 3000);

    // --- Swipe bằng chuột / cảm ứng ---
    slides.addEventListener("mousedown", dragStart);
    slides.addEventListener("touchstart", dragStart);
    slides.addEventListener("mouseup", dragEnd);
    slides.addEventListener("mouseleave", dragEnd);
    slides.addEventListener("touchend", dragEnd);
    slides.addEventListener("mousemove", dragAction);
    slides.addEventListener("touchmove", dragAction);

    function dragStart(e) {
        isDragging = true;
        startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
        slides.style.transition = "none"; // bỏ transition khi kéo
        animationID = requestAnimationFrame(animation);
    }

    function dragAction(e) {
        if (!isDragging) return;
        const currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
        currentTranslate = prevTranslate + currentX - startX;
    }

    function dragEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        // Xác định slide gần nhất sau khi thả
        if (movedBy < -imageWidth / 4 && current < images.length - 1) current += 1;
        if (movedBy > imageWidth / 4 && current > 0) current -= 1;

        updateSlide();
    }

    function animation() {
        slides.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }

    updateSlide();
});
