const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft; // Store the initial scroll position
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // Only scroll if mouse is pressed
  e.preventDefault();
  
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; // '3' is the scroll speed multiplier
  slider.scrollLeft = scrollLeft - walk; // Update the container's scroll position
});