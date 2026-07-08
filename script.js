const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

// Ensure container behaves correctly layout-wise
slider.style.overflowX = 'scroll';
slider.style.whiteSpace = 'nowrap';

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Track coordinate position relative to the viewport/page directly
  startX = e.pageX || e.clientX;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  
  // Get current position
  const currentX = e.pageX || e.clientX;
  
  // Calculate distance dragged (X decreases when dragging left)
  const walk = currentX - startX;
  
  // Subtracting a negative walk value forces scrollLeft to increase (scroll right)
  slider.scrollLeft = scrollLeft - walk;
});

// Create a unified clean-up function for releasing the mouse
const stopDragging = () => {
  isDown = false;
  slider.classList.remove('active');
};

slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mouseleave', stopDragging);