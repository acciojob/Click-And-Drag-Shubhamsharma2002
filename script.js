// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

// Position the items in an initial layout grid or spread upon load
// so they do not stack on top of each other at top: 0, left: 0
items.forEach((item, index) => {
  const itemsPerRow = 5;
  const row = Math.floor(index / itemsPerRow);
  const col = index % itemsPerRow;
  
  item.style.left = `${col * 220 + 20}px`;
  item.style.top = `${row * 150 + 20}px`;
  item.style.height = '120px'; // Set a concrete height for independent movement
});

let activeItem = null;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

// Listen for interactions on individual items
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    activeItem = item;
    container.classList.add('active');
    
    // Get mouse pointer position relative to viewport
    startX = e.clientX;
    startY = e.clientY;
    
    // Parse current positioning coordinates
    initialLeft = parseInt(item.style.left) || 0;
    initialTop = parseInt(item.style.top) || 0;
  });
});

// Move behavior attached to global window for seamless tracking
window.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  // Calculate cursor displacement delta
  const deltaX = e.clientX - startX;
  const deltaY = e.clientY - startY;

  // Potential new coordinates
  let newLeft = initialLeft + deltaX;
  let newTop = initialTop + deltaY;

  // Establish boundaries using container limitations
  const maxLeft = container.clientWidth - activeItem.clientWidth;
  const maxTop = container.clientHeight - activeItem.clientHeight;

  // Bound limits constraint: Restrict within 0 and maximum threshold
  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;
  
  if (newTop < 0) newTop = 0;
  if (newTop > maxTop) newTop = maxTop;

  // Apply positions safely
  activeItem.style.left = `${newLeft}px`;
  activeItem.style.top = `${newTop}px`;
});

// Reset tracking states when tracking session finishes
window.addEventListener('mouseup', () => {
  if (activeItem) {
    container.classList.remove('active');
    activeItem = null;
  }
});