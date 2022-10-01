const clock = document.querySelector(".js-clock .clock__text");

function getTime() {
  const now = new Date(); // 변수에 Date 메소드 담기
  const hours = now.getHours(); // .getHours() 메소드로 현재시간 변수에 값 넣기
  const minutes = now.getMinutes(); // 위와 동일
  const time = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;  // 백틱 사용하기
       // 0을 넣어주지 않으면 예시 ex) 10:1 , 10:2 ... 이런식으로 출력됨
       // 0을 넣어줄 시 10:01 , 10:02 ... 출력
  clock.innerHTML = time; // clock 요소에 현재 시간 출력
  return;
}

function init() { // 자동 실행을 위한 함수.
  getTime();  // 함수 실행
  setInterval(getTime, 1000);
  /*
    setinterval() : 매번 일어나야 하는 무언가 ex) 매 2초마다 주식시장 api를 확인
    setInteval("함수", ms) 1000ms = 1sec  단, 바로 실행되지 않고 1초 후 첫 시작이 되고 계속 1초마다 * 반복 * 된다.
    setTimeout() : interval과 같은 함수 단 , 1초 기다렸다가 한번만 실행.
  */
  return;
}

init();
