const form = document.querySelector(".js-to-do"),
      input = document.querySelector(".js-add-to-do"),
      list = document.querySelector(".js-list");
// HTML class 요소 마다 변수에 넣어줌

let toDos = []; // 배열에 추가 또는 삭제를 해야 되기 때문에 const 대신 let으로 배열 선언해줌.

function persistToDos() {  // 값을 String으로 형변환 하고, Stringd으로 변환된 값들을 다시 배열로 바꿔주는 함수
  const stringToDo = JSON.stringify(toDos); // toDos 배열을 String으로 변환
  localStorage.setItem("toDos", stringToDo); // localStorage에 string으로 변환된 toDos의 값들을 배열로 재저장.
}

function saveToDo(text) { 
  const toDoObject = {  // 입력한 값들의 id / value를 명시해줌
    id: toDos.length + 1,
    value: text
  };
  toDos.push(toDoObject); // toDos배열안에 값들을 Add.
  persistToDos(); // 위 함수 재실행
}

function handleDelete(event) { // ❌버튼을 눌렀을 시, 그 값만 삭제 시키는 함수
                               // ❌버튼을 누른 값들의 고유 id값을 삭제시켜야 하기 때문
  const target = event.target; 
  const li = target.parentElement; // 부모 태그 찾기
  const ul = li.parentElement; // 부모 태그 찾기
  const toDoId = li.id;
  ul.removeChild(li); // first-child / last-child .. 등등 
  toDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(toDoId);
  }); // ❌ 버튼을 누른 id 값이 toDoId 와 같지 않는 값들만 리턴해줌.
  persistToDos(); // 리턴한 값들을 String 자료형으로 바꿔주는 함수 재실행.
}

function addToDo(text) { // 값을 입력했을 시, 저장 시키는 함수
  const toDo = document.createElement("li"); // HTML내에 li라는 요소를 만들어줌
  toDo.className = "toDo"; // li요소를 만든 CLASSNAME = "toDo" 이다
  toDo.id = toDos.length + 1;
  const deleteBtn = document.createElement("span"); // HTML내에 span 요소 추가
  deleteBtn.innerHTML = "❌"; // span이라는 요소를 ❌ 버튼으로 표시하게끔 바꿔줌
  deleteBtn.className = "toDo__button"; // span요소는 toDo__button이라는 CLASSNAME내에 추가
  deleteBtn.addEventListener("click", handleDelete); // click을 하게되면 event가 발생하는데, handleDelete()함수의 인자를 click event인자로 넘겨줌
  const label = document.createElement("label"); // HTML내에 label 요소 추가
  label.innerHTML = text; // label 요소를 브라우저 상에 text로 표기
  toDo.appendChild(deleteBtn); //toDo에 deleteBtn을 넣어줌
  toDo.appendChild(label); //toDo에 label을 넣어줌
  list.appendChild(toDo); // 그 후에, list에 deleteBtn, label이 들어간 toDo를 넣어줌
  saveToDo(text); // saveToDo 함수 실행시키는데 인자를 text로 넘겨줌
                  // text는 label요소값을 넘겨주는것임.
}

function onSubmit(event) {
  event.preventDefault(); // form태그는 기본적으로 가지고있는 event가 있는데,
                          // 값을 입력시, 새로고침이나 다음페이지로 자동으로 넘어가는 event를 가지고 있기 때문에,
                          // 그 이벤트를 막아주는 preventDefault() 메소드 사용
  const value = input.value; // 입력한 값을 value 변수에 넣어주기
  input.value = ""; // 값을 입력한 뒤, "";로 초기화를 해줘야 입력한 값이 브라우저상에 남아있지 않음
  addToDo(value); // 입력한 값을 인자로 addToDo()함수에 넘겨줌.
}

function loadToDos() { // 입력한 값을 브라우저상에 표기하기 위해 필요한 함수
  const loadedToDos = localStorage.getItem("toDos"); // localStorage.getItem 메소드를 이용해서 toDos 배열안에
                                                     // 있는 값을 불러와 loadedToDos변수에 넣어줌.
  if (loadedToDos !== null) { // 즉, 입력한 값이 있다면
    const parsedToDos = JSON.parse(loadedToDos); // 그 문자열을 자바스크립트 객체로 변환 (stringify와 반대개념임)
    parsedToDos.forEach(function(toDo) { // forEach는 배열을 순회하는 방법 ( java에서 for반복문 같은 개념 ),
                                        /*
                                            ** foreach 예시**
                                            const number = [1,2,3,4];

                                            for(let i = 0; i < numbers.length; i ++ ){
                                              console.log(numbers[i]);
                                            }
                                            ================================================
                                            *     numbers 배열안의 요소들 출력

                                            numbers.forEach(number => console.log(number)); 
                                            ================================================
                                            *     numbers 배열안의 인덱스/요소 출력

                                            numbers.forEach((number,index) =>{
                                              console.log(index, number);
                                            });
                                            ================================================
                                        */
      addToDo(toDo.value); // 
    });
  }
  return;
}

function init() {
  loadToDos();
}

form.addEventListener("submit", onSubmit);

init(); // 자동으로 함수실행
