const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const eraseBtn = document.getElementById("eraser-btn");

// html div = color-option인 요소들을 배열로 바꾸어줌
const colorOption = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1200; // 직사각형 가로값
const CANVAS_HEIGHT = 1200; // 직사각형 세로값

canvas.width = CANVAS_WIDTH; // 1200,1200 숫자로 넣어주기보단 변수에 값을 담아서 변수로 지정
canvas.height = CANVAS_HEIGHT; // 1200,1200 숫자로 넣어주기보단 변수에 값을 담아서 변수로 지정

ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";
let isPainting = false;
let isFilling = false; // 직사각형 색으로 채우기 true / false

function onMove(event){
    
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY); // 좌표 x,y로 어디서 어디까지 선을 그을지 설정
        ctx.stroke(); // stroke() 메소드를 써야 canvas위에 선이 그려짐
        return;
    }
    ctx.beginPath(); // 새로운 경로 만들기
    ctx.moveTo(event.offsetX, event.offsetY); // 마우스커서의 좌표를 받아 시작점 받기
}

function startPainting(){ // mousedown(마우스를 눌렀을 시)이 실행되었을 시 함수
    isPainting = true;
}

function cancelPainting(){  // mouseup(누른 마우스를 뗄 시)이 실행되었을 시 함수
    isPainting = false;
}

function onLineWidthChange(event){ // 선 굵기를 변경할때 호출되는 함수
    ctx.lineWidth = event.target.value;
    // 선굵기를 변경시 이벤트가 발생하고, 이벤트가 발생한 요소의 속성을 얻을 수 있다
    // 요소중 value값을 lineWidth(굵기)로 설정해줌.
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick(event){
    if(isFilling){
        isFilling = false; // 그리기 모드로 바꿨을 시
        modeBtn.innerText = "Fill"; 
    }else{
        isFilling = true; // 채우기 모드로 바꿨을 시
        modeBtn.innerText = "Draw";
    }
}

function onCanvansClick(event){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(event){ // 백지 상태로 가기
    ctx.fillStyle = "white"; // 채우기 색을 흰색으로 바꿔주기
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // 흰색인 사각형을 새로 만듬.
}

function onEraserClick(event){ // 지우는 함수
    ctx.strokeStyle = "white"; // stroke (라인) 색깔을 흰색으로 바꿔줌
    isFilling = false;
    modeBtn.innerText = "Fill"; // Erase를 선택시 innerText를 Fill로 바꿔줌
}

function onFileChange(event){ // 파일을 바꿀 시 함수
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    }
}

// EventListener **
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click",onCanvansClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraseBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);

colorOption.forEach(color => color.addEventListener("click", onColorClick));