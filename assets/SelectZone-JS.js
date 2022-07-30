// const $ = document.querySelector.bind(document);

let rectangles = [];

// DOM elements
const screenshot = document.getElementById('screenshot');
const draw = document.getElementById('draw');
const marquee = document.getElementById('marquee');
const boxes = document.getElementById('boxes');

// Temp variables
let startX = 0;
let startY = 0;
const marqueeRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    color: 'white',
    label: '',
    text:null,
};

marquee.classList.add('hide');
screenshot.addEventListener('pointerdown', startDrag);

function startDrag(ev) {
    // middle button delete rect
    if (ev.button === 1) {
        const rect = hitTest(ev.layerX, ev.layerY);
        if (rect) {
            rectangles.splice(rectangles.indexOf(rect), 1);
            redraw();
        }
        return;
    }
    window.addEventListener('pointerup', stopDrag);
    screenshot.addEventListener('pointermove', moveDrag);
    marquee.classList.remove('hide');
    startX = ev.layerX;
    startY = ev.layerY;
    drawRect(marquee, startX, startY, 0, 0);
}

function stopDrag(ev) {
    marquee.classList.add('hide');
    window.removeEventListener('pointerup', stopDrag);
    screenshot.removeEventListener('pointermove', moveDrag);
    if (ev.target === screenshot && marqueeRect.width && marqueeRect.height) {
        // showData(marqueeRect);
        // marqueeRect.color = randomColor();
        let labelPrompt = prompt("Enter label", '');
        if (labelPrompt){
            marqueeRect.label = createText(labelPrompt);
            rectangles.push(Object.assign({}, marqueeRect));
            redraw();
        }
    }
}

function createText(text){
    let list = document.getElementById('elBox');
    let element = document.createElement('a');
    element.id = text+"-text";
    element.className = "list-group-item list-group-item-action";
    element.appendChild(document.createTextNode(text));
    list.appendChild(element);
    return text;
}

function randomColor(){
    let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function removeLast(){
    console.log('removing');
    let rectDeleted = rectangles.pop();
    let list = document.getElementById('elBox');
    let element = document.getElementById(rectDeleted.label+"-text");
    list.removeChild(element);
    redraw();
}

function showData(rect){
    console.log('height', rect.height)
    console.log('width', rect.width)
    console.log('x', rect.x)
    console.log('y', rect.y)
}

function moveDrag(ev) {
    let x = ev.layerX;
    let y = ev.layerY;
    let width = startX - x;
    let height = startY - y;
    if (width < 0) {
        width *= -1;
        x -= width;
    }
    if (height < 0) {
        height *= -1;
        y -= height;
    }
    Object.assign(marqueeRect, {x, y, width, height});
    drawRect(marquee, marqueeRect);
}

function hitTest(x, y) {
    return rectangles.find(rect => (
        x >= rect.x &&
        y >= rect.y &&
        x <= rect.x + rect.width &&
        y <= rect.y + rect.height
    ));
}

function redraw() {
    boxes.innerHTML = '';
    rectangles.forEach((data) => {
        rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        boxes.appendChild(drawRect(rect, data));
        boxes.appendChild(drawText(data));
    });
}

function drawRect(rect, data) {
    let {x, y, width, height, color} = data;
    width = !width ? 0 : width;
    height = !height ? 0 : height;
    x = !x ? 0 : x;
    y = !y ? 0 : y;
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'style', 'fill:#c5d45a' );
    return rect;
}

function drawText(data){
    let txtElem = document.createElementNS("http://www.w3.org/2000/svg", "text");
    txtElem.setAttributeNS(null,"x",data.x );
    txtElem.setAttributeNS(null,"y",data.y);
    txtElem.setAttributeNS(null,"font-size","18");
    txtElem.appendChild(document.createTextNode(data.label));
    return txtElem;
}
