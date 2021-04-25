(function initialize() {
  console.log("page-graffiti-extension起動〜");

  const drawElement = document.createElement("canvas");
  drawElement.classList.add('pge-draw-area');
  const height = document.body.scrollHeight;
  const width = document.body.scrollWidth;
  const cssTest = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: ${height}px; width: ${width}px;`;
  drawElement.style.cssText = cssTest;
  document.body.appendChild(drawElement);
})();