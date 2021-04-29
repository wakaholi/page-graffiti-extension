const initEventHandler = (event: KeyboardEvent): void=> {
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
  canvas.height = document.body.scrollHeight * 2;
  canvas.width = document.body.scrollWidth * 2;
  const cssTest = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; height: ${document.body.scrollHeight}px; width: ${document.body.scrollWidth}px;`;
  canvas.style.cssText = cssTest;
  document.body.appendChild(canvas);

  const context = canvas.getContext('2d');
  // 解像度が低いと滲んでしまうため2倍のscaleをセットする
  context?.scale(2, 2);
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
    context.lineWidth = 2;
    context.strokeStyle = 'black';

    const canvasRect = canvas.getBoundingClientRect();

    // スクロールを加味する
    const rect = {
      left: canvasRect.left + window.pageXOffset,
      top: canvasRect.top + window.pageYOffset,
    };

    const canvasScale = {
      x: canvas.width / canvasRect.width,
      y: canvas.height / canvasRect.height,
    };

    lastPosition.x = (x - rect.left) * canvasScale.x;
    lastPosition.y = (y - rect.top) * canvasScale.y;
    context.lineTo(lastPosition.x / 2, lastPosition.y / 2);

    context.stroke();
  }
  canvas.addEventListener('mousedown', dragStart);
  canvas.addEventListener('mouseup', dragEnd);
  canvas.addEventListener('mouseout', dragEnd);
  canvas.addEventListener('mousemove', (event) => {
    draw(event.pageX, event.pageY);
  });
}

(function initialize() {
  console.log("page-graffiti-extension");

  document.addEventListener("keydown", initEventHandler);
})();