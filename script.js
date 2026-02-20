const canvas = document.getElementById("pcb-canvas");
const context = canvas.getContext("2d");

const frameCount = 168;
const images = [];
const imageSeq = {
    frame: 0
};

/* Set canvas size */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
}

window.addEventListener("resize", resizeCanvas);

/* Image file generator */
function currentFrame(index) {
    return `frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
}

/* Preload images */
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

/* Draw frame */
function render() {
    const img = images[imageSeq.frame];
    if (!img) return;

    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * scale,
        img.height * scale
    );
}

/* Scroll animation */
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    imageSeq.frame = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    requestAnimationFrame(render);
});

/* Start when first image loads */
images[0].onload = () => {
    resizeCanvas();
};
