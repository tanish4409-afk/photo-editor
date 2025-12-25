const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let originalImage = null;
let currentFilter = "none";

upload.addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => img.src = reader.result;
  reader.readAsDataURL(file);
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
};

function setFilter(filter) {
  currentFilter = filter;
  ctx.filter = filter;
  ctx.drawImage(canvas, 0, 0);
}

function blurImage() {
  ctx.filter = "blur(3px)";
  ctx.drawImage(canvas, 0, 0);
}

function sharpenImage() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] += 10;
    d[i+1] += 10;
    d[i+2] += 10;
  }
  ctx.putImageData(imageData, 0, 0);
}

function cropImage() {
  const w = canvas.width / 2;
  const h = canvas.height / 2;
  const cropped = ctx.getImageData(
    canvas.width / 4,
    canvas.height / 4,
    w,
    h
  );
  canvas.width = w;
  canvas.height = h;
  ctx.putImageData(cropped, 0, 0);
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = canvas.toDataURL();
  link.click();
}

function resetImage() {
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.filter = "none";
  ctx.putImageData(originalImage, 0, 0);
}
