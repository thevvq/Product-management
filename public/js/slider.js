document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const dotsContainer = document.querySelector(".dots");
    let current = 0;
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
        slides.style.transition = "transform 0.3s ease"; // animate khi chuyển
        slides.style.transform = `translateX(-${current * imageWidth}px)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[current].classList.add("active");
    }

    // Auto-slide
    setInterval(() => {
        current = (current + 1) % images.length;
        updateSlide();
    }, 5000);

    // Khởi tạo slide đầu tiên
    updateSlide();
});
