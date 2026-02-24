const imgs = [
  "assets/UOMaps.jpg",
  "assets/UOMapsFull.jpeg",
  "assets/UOMapslogo.jpeg",
]; /*Just add the ad to this list, pls make sure you put in its whole address
also make sure it fits the size set in the css file*/
let currentIndex = 0;
const bannerElement = document.getElementById("adBanner");
setInterval(() => {
  currentIndex = (currentIndex + 1) % imgs.length;
  bannerElement.src = imgs[currentIndex];
}, 3000);
