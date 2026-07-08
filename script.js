const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  
  // Calculate exact initial click coordinates inside the container
  startX = e.pageX - slider.offsetLeft;
  
  // Cache the starting position of the horizontal scrollbar
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
  if (!isDown) return; // Stop the function from running if mouse isn't held down
  e.preventDefault();  // Stop default text selection or image dragging antics
  
  // Track cursor location relative to container while moving
  const x = e.pageX - slider.offsetLeft;
  
  // Determine how far the user has dragged (multiplied by a speed factor if desired)
  const walk = (x - startX) * 2; 
  
  // Update the container scroll mechanism (subtracting shifts it in natural dragging direction)
  slider.scrollLeft = scrollLeft - walk;
});