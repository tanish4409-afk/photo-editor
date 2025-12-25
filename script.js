const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const grayscaleBtn = document.getElementById("grayscale");
const resetBtn = document.getElementById("reset");

let img = new Image();
let originalImageData = null;

upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

function applyFilters() {
    ctx.putImageData(originalImageData, 0, 0);
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
    `;
    ctx.drawImage(canvas, 0, 0);
}

brightness.addEventListener("input", applyFilters);
contrast.addEventListener("input", applyFilters);

grayscaleBtn.addEventListener("click", () => {
    ctx.filter = "grayscale(100%)";
    ctx.drawImage(canvas, 0, 0);
});

resetBtn.addEventListener("click", () => {
    brightness.value = 100;
    contrast.value = 100;
    ctx.filter = "none";
    ctx.putImageData(originalImageData, 0, 0);
});
