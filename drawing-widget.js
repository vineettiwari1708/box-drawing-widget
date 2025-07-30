
document.addEventListener("DOMContentLoaded", function () {
  // Floating Open Button
  const openBtn = document.createElement("button");
  openBtn.id = "open-drawing-widget";
  openBtn.innerHTML = `<i class="fas fa-pen"></i>`;
  Object.assign(openBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    fontSize: "24px",
    zIndex: "99999",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    cursor: "pointer"
  });
  document.body.appendChild(openBtn);

  // Drawing Widget Panel
  const widget = document.createElement("div");
  widget.id = "drawing-widget";
  Object.assign(widget.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "300px",
    zIndex: "99998",
    borderRadius: "12px",
    backgroundColor: "#fff",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    overflow: "hidden",
    display: "none",
    flexDirection: "column"
  });

  widget.innerHTML = `
    <div style="background: #f8f9fa; padding: 5px; display: flex; justify-content: space-between; align-items: center;">
      <button id="clear-drawing" style="padding: 4px 8px; font-size: 12px;">Clear</button>
      <button id="close-drawing-widget" style="
        background: rgba(0,0,0,0.6);
        color: white;
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        font-size: 18px;
        cursor: pointer;
      ">&times;</button>
    </div>
    <canvas id="drawing-canvas" width="300" height="260" style="touch-action: none; cursor: crosshair;"></canvas>
  `;
  document.body.appendChild(widget);

  // === Drawing Logic ===
  const canvas = widget.querySelector("#drawing-canvas");
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  let drawing = false;

  canvas.addEventListener("mousedown", () => (drawing = true));
  canvas.addEventListener("mouseup", () => (drawing = false));
  canvas.addEventListener("mouseleave", () => (drawing = false));
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("touchstart", e => {
    drawing = true;
    draw(e.touches[0]);
  });
  canvas.addEventListener("touchmove", e => {
    draw(e.touches[0]);
    e.preventDefault();
  });
  canvas.addEventListener("touchend", () => (drawing = false));

  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  // === Buttons ===
  const closeBtn = widget.querySelector("#close-drawing-widget");
  const clearBtn = widget.querySelector("#clear-drawing");

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "#fff";
    closeBtn.style.color = "#000";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "rgba(0,0,0,0.6)";
    closeBtn.style.color = "#fff";
  });

  clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  });

  openBtn.addEventListener("click", () => {
    widget.style.display = "flex";
    openBtn.style.display = "none";
  });

  closeBtn.addEventListener("click", () => {
    widget.style.display = "none";
    openBtn.style.display = "block";
  });
});
