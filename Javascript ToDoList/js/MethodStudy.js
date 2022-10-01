// setinterval() : 매번 일어나야 하는 무언가 ex) 매 2초마다 주식시장 api를 확인
// setInteval("함수", ms) 1000ms = 1sec  단, 바로 실행되지 않고 1초 후 첫 시작이 되고 계속 1초마다 반복된다.

// setTimeout() : interval과 같은 함수 단 , 1초 기다렸다가 한번만 실행.
// X.padStart() : padStart는 내가 갖고 있는 string 을 길게 만들어 주고 싶을 때 사용.
//                ex) "1".padStart(2, "0") === 01 
// X.padEnd()   : padStart와 같은 함수 단, 뒷자리에 추가됨.
//                ex) "1".padEnd(2, "0") === 10

// Math.Round() : 소숫점 반올림
// Math.ceil()  : 소숫점 올림
// Math.floor() : 소숫점 내림
// ex ) 0 ~ 10 까지의 랜덤 숫자 뽑기
// Math.floor(Math.random(10) * 10) + 1

// document.body.appendChild() : javascript에서 html body 에 code 추가

// event.preventDefault(); : 브라우저가 기본적으로 가지고 있는 event를 막아줌

// localStorage.setItem("Key","Value") : localStorage.setItem === 브라우저 상에 데이터 저장

// JSON.stringify() : javascript 코드를 String으로 형변환 시켜줌
//                    ex) JSON.stringify([1,2,3,4])를 입력했을 시, "[1,2,3,4]" 로 바꿔줌
// JSON.parse()     : JSON.stringify를 실행시켜서 나온 "[1,2,3,4]" 문자열을 배열로 만들 수 있음.
//                    ex) JOSN.parse("[1,2,3,4]") === [1,2,3,4] 배열로 만들어줌.

// 배열.forEach()        : Array의 각 item에 대해 함수를 실행하게 해줌


/*

******* Arrow function *******

(item) => console.log("this is the turn of ", item);

function sayHello(){
    console.log("this is the turn of ", item);
}

함수를 따로 지정해주는 것과, Arrow function을 사용하는 것과 동일한 결과를 나타냄
*/

// getCurrentPosition : 위치를 알려주는 메소드 (위도 , 경도)로 알려줌
//                      예외 발생 처리를 해줘야함.

// fetch() : 서버에 네트워크 요청을 보내고 새로운 정보를 받아오는 일을 할 수 있게해줌