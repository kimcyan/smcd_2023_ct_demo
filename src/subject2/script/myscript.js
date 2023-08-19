/* section 1 요소 생성 */
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

/* section 1 자기력 애니메이션 */
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

/*--- section 2 카드 애니메이션 ---*/
const section2 = document.getElementById('section2');
const cardboxWrap = document.querySelectorAll('.cardbox-wrap');
const cardbox = document.querySelectorAll('.cardbox');
const flipWrap = document.querySelectorAll('.flip-wrap');

/* section 2 진입 후 트리거 */
function section2handle() {
  const rect = section2.getBoundingClientRect();

  if (window.innerHeight / 2 > rect.top) {
    window.removeEventListener('scroll', section2handle);
    cardboxWrap.forEach((element, index) => {
      setTimeout(() => {
        element.style.animation = 'rotateAnimation 2s 1 forwards';
      }, 2000 + index * 200);
    });
    for (let i = 0; cardbox[index]; i++) {
      setTimeout(() => {
        element.style.animation = 'moveToBottom 1s 1 forwards';
      }, 4000 + (i / 3) * 200);
    }
    /*
    cardbox.forEach((element, index) => {
      for(let i = 0; cardbox[index]; i++)
      setTimeout(() => {
        element.style.animation = 'moveToBottom 1s 1 forwards';
      }, 4000);
    });*/
  }
}
window.addEventListener('scroll', section2handle);

function scaleSide() {
  const side = document.querySelectorAll('.cardbox-side');
  const back = document.querySelectorAll('.cardbox-back');
  const front = document.querySelectorAll('.cardbox-front');
  const backWidth = back[0].offsetWidth;
  const backHeight = back[0].offsetHeight;
  side.forEach((element) => {
    element.style.height = `${backHeight + 1}px`;
    element.style.transform = `translateZ(${
      side[0].offsetWidth / 2
    }px) translateX(${backWidth / 2}px) rotateY(90deg)`;
  });
  back.forEach((element) => {
    element.style.transform = `translateZ(${side[0].offsetWidth}px) rotateY(0deg)`;
  });
}

const container = document.getElementById('container');
const observer = new ResizeObserver((entries) => {
  for (let entry of entries) {
    scaleSide();
  }
});

// ResizeObserver를 해당 요소에 연결
observer.observe(container);
