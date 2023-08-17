//https://stackoverflow.com/a/30268827
const magnetSp = document.querySelectorAll('.m-sp');

function multiplyNode(node, count) {
  for (let i = 0, copy; i < count - 1; i++) {
    copy = node.cloneNode(true);
    node.parentNode.insertBefore(copy, node);
  }
}

multiplyNode(document.querySelector('.m-inside'), 7);
multiplyNode(document.querySelector('.tr-repeat'), 7);

function insertSp(input, place) {
  let clonedNode = input.cloneNode(true);
  clonedNode.style.transform = 'rotate(90deg)';
  place.insertBefore(clonedNode, place.firstChild);
  clonedNode = input.cloneNode(true);
  clonedNode.style.transform = 'rotate(90deg)';
  place.appendChild(clonedNode);
}

const magnetTrs = document.querySelectorAll('.magnet-tr');

for (let i = 0; magnetTrs[i]; i++) {
  insertSp(magnetSp[i + 1], magnetTrs[i]);
}

const magnetInside = document.querySelectorAll('.m-inside');

for (let i = 3; i < 4; i++) {
  for (let j = 1; j < 6; j++) {
    magnetInside[i * 7 + j].classList.add('invisible');
  }
}

const degDefault = [
  60, 90, 120, 0, 60, 90, 120, 45, 90, 135, 0, 45, 90, 135, 30, 90, 150, 0, 30,
  90, 150, 0, 0, 0, 0, 0, 0, 0,
];

const section1 = document.querySelector('#section1');
let isMouseMoveListenerActive = false;

function rotateDefault() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 7; j++) {
      magnetInside[i * 7 + j].style.transform = `rotate(${
        degDefault[i * 7 + j]
      }deg)`;
      magnetInside[(6 - i) * 7 + (6 - j)].style.transform = `rotate(${
        degDefault[i * 7 + j]
      }deg)`;
    }
  }
  /*
  magnetInside.forEach((element) => {
    element.style.transform = '';
  });
  */
}

function rotateTowardsMouse(event) {
  magnetInside.forEach((insideElement) => {
    const insideRect = insideElement.getBoundingClientRect();
    const centerX = insideRect.left + insideRect.width / 2;
    const centerY = insideRect.top + insideRect.height / 2;

    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    const angleDeg = angle * (180 / Math.PI);

    insideElement.style.transformOrigin = `center`;
    insideElement.style.transform = `rotate(${angleDeg}deg)`;
  });
}
section1.addEventListener('mouseenter', () => {
  if (!isMouseMoveListenerActive) {
    section1.addEventListener('mousemove', rotateTowardsMouse);
    isMouseMoveListenerActive = true;
  }
});

section1.addEventListener('mouseleave', () => {
  if (isMouseMoveListenerActive) {
    section1.removeEventListener('mousemove', rotateTowardsMouse);
    isMouseMoveListenerActive = false;
    console.log('rotation to default');
    rotateDefault();
  }
});
