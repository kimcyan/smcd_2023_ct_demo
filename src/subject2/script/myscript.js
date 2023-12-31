/* section 1 요소 생성 - 개수 고민 중 */
const magnetSp = document.querySelectorAll('.m-sp');

function multiplyNode(node, count) {
  for (let i = 0, copy; i < count - 1; i++) {
    copy = node.cloneNode(true);
    node.parentNode.insertBefore(copy, node);
  }
}

multiplyNode(document.querySelector('.m-inside'), 11);
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
  for (let j = 2; j < 9; j++) {
    magnetInside[i * 11 + j].classList.add('invisible');
  }
}

/* section 1 자기력 애니메이션 */
const degDefault = [
  54, 72, 90, 108, 126, 0, 54, 72, 90, 108, 126, 42, 57, 90, 123, 138, 0, 42,
  57, 90, 123, 138, 27, 40, 90, 140, 153, 0, 27, 40, 90, 140, 153, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
];

const section1 = document.querySelector('#section1');
let isMouseMoveListenerActive = false;

function rotateDefault() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 11; j++) {
      magnetInside[i * 11 + j].style.transform = `rotate(${
        degDefault[i * 11 + j]
      }deg)`;
      magnetInside[(6 - i) * 11 + (10 - j)].style.transform = `rotate(${
        degDefault[i * 11 + j]
      }deg)`;
    }
  }
}
rotateDefault();
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

/*--- section 2 카드 크기 조절 ---*/
const section7 = document.getElementById('section7');

function scaleSide() {
  const side = document.querySelectorAll('.cardbox-side');
  const back = document.querySelectorAll('.cardbox-back');
  const backWidth = back[0].offsetWidth;
  const backHeight = back[0].offsetHeight;
  for (let i = 0; side[i]; i += 2) {
    side[i].style.height = `${backHeight + 1}px`;
    side[i + 1].style.height = `${backHeight + 1}px`;
    side[i].style.transform = `translateZ(${
      side[0].offsetWidth / 2
    }px) translateX(${backWidth / 2}px) rotateY(90deg)`;
    side[i + 1].style.transform = `translateZ(${
      side[0].offsetWidth / 2
    }px) translateX(${(backWidth / 2) * -1}px) rotateY(90deg)`;
  }
  /*
  side.forEach((element) => {
    element.style.height = `${backHeight + 1}px`;
    element.style.transform = `translateZ(${
      side[0].offsetWidth / 2
    }px) translateX(${backWidth / 2}px) rotateY(90deg)`;
  });*/
  back.forEach((element) => {
    element.style.transform = `translateZ(${side[0].offsetWidth}px) rotateY(0deg)`;
  });
}

const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    scaleSide();
  }
});

observer.observe(section7);

$(document).ready(scaleSide);

