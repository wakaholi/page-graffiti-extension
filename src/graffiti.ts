const initEventHandler = async (event: KeyboardEvent): Promise<void> => {
  if (event.key !== "d" || !event.ctrlKey) {
    return;
  }

  if(document.getElementsByClassName("pge-draw-area").length === 1) {
    const drawArea = document.getElementsByClassName("pge-draw-area")[0];
    drawArea.remove();
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.classList.add('pge-draw-area');
  const height = document.body.scrollHeight;
  const width = document.body.scrollWidth;
  const cssTest = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: ${height}px; width: ${width}px;`;
  canvas.style.cssText = cssTest;
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  const lastPosition = { x: 0, y: 0 };
  let isDrag = false;

  const dragStart = () => {
    context?.beginPath();
 
    isDrag = true;
  }

  const dragEnd = () => {
    context?.closePath();
    isDrag = false;
  
    lastPosition.x = 0;
    lastPosition.y = 0;
  }

  const draw = (x: number, y: number) => {
    if(!isDrag || !context) {
      return;
    }
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 1;
    context.strokeStyle = 'black';
    if (lastPosition.x === 0 || lastPosition.y === 0) {
      context.moveTo(x, y);
    } else {
      context.moveTo(lastPosition.x, lastPosition.y);
    }
    context.lineTo(x, y);

    context.stroke();

    lastPosition.x = x;
    lastPosition.y = y;
  }



  canvas.addEventListener('mousedown', dragStart);
  canvas.addEventListener('mouseup', dragEnd);
  canvas.addEventListener('mouseout', dragEnd);
  canvas.addEventListener('mousemove', (event) => {
    draw(event.movementX, event.movementY);
  });
}

(function initialize() {
  console.log("page-graffiti-extension");

  document.addEventListener("keydown", initEventHandler);
})();