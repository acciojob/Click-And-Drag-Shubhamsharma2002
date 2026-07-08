const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Track raw page coordinate directly, ignoring shifting layout offsets
  startX = e.pageX || e.clientX;
  scrollLeft = slider.scrollLeft;
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
  if (!isDown) return;
  e.preventDefault();
  
  const x = e.pageX || e.clientX;
  
  // Direct subtraction prevents animation scaling from changing the delta
  const walk = x - startX; 
  
  // Update scroll bar cleanly
  slider.scrollLeft = scrollLeft - walk;
});