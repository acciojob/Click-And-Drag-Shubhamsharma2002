const container = document.querySelector(".items");
const items = document.querySelectorAll(".item");

container.style.position = "relative";

items.forEach((item) => {
  // Current position save karo
  const rect = item.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  item.style.position = "absolute";
  item.style.left =
    rect.left - parentRect.left + container.scrollLeft + "px";
  item.style.top = rect.top - parentRect.top + "px";
  item.style.margin = "0";
});

let currentItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item) => {
  item.addEventListener("mousedown", (e) => {
    currentItem = item;

    currentItem.style.zIndex = "1000";

    const itemRect = currentItem.getBoundingClientRect();

    offsetX = e.clientX - itemRect.left;
    offsetY = e.clientY - itemRect.top;

    e.preventDefault();
  });
});

document.addEventListener("mousemove", (e) => {
  if (!currentItem) return;

  const containerRect = container.getBoundingClientRect();

  let left =
    e.clientX - containerRect.left - offsetX + container.scrollLeft;
  let top = e.clientY - containerRect.top - offsetY;

  // Boundary Check
  const maxLeft =
    container.scrollWidth - currentItem.offsetWidth;
  const maxTop =
    container.clientHeight - currentItem.offsetHeight;

  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));

  currentItem.style.left = left + "px";
  currentItem.style.top = top + "px";
});

document.addEventListener("mouseup", () => {
  if (currentItem) {
    currentItem.style.zIndex = "";
  }
  currentItem = null;
});