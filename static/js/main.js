const tagListForm = document.querySelector(".js-tagList"),
    createTagForm = document.querySelector(".js-createTag"),
    tagManageForm = document.querySelector(".js-tagList"), 
    todoInputForm = document.querySelector(".inputSize"),
    todoListForm = document.querySelector(".showTodoList"),
    todoEnrollForm = document.querySelector(".js-todoEnroll"),
    filterForm = document.querySelector(".js-filterForm");


let todoId = 0;
const list = [];
const todoObj = [

    /* example
    {
        todo:"AAA",
        tag:["aaa","bbb","ccc"],
        clickColor = "red",
        date:"2020.07.19",
        checked:true
    },
    
    {
        todo:"BBB",
        tag:["ddd","eee","fff"],
        clickColor = "blue",
        date:"2020.07.20",
        checked:false
    }
    */

];


let tagId = 0;
let loadStat = 0;
let colorCLickStatus = null;
let clickColor;

function delTag(event) {

    const delId = event.toElement.id;

    list.splice(delId,1);
    console.log(list);
    event.toElement.parentNode.remove();

    for(let i=parseInt(delId+1);i<=list.length;i++){
        document.getElementById(i).id = i-1;
    }
}

function enterCheck(val){
    
    if(event.keyCode == 13) {

        const value = event.target.value;

        if(value !== ""){

            const span = event.target.parentNode;

        list.push(value);
        event.target.remove();

        const tag = document.createElement("p");
        const delImg = document.createElement("img");

        tag.innerText = value;
        span.appendChild(tag);
    
        delImg.src = "https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png";
        delImg.classList.add("delImg");
        delImg.id = tagId;

        tagId++;

        delImg.addEventListener("click",delTag);        
        span.appendChild(delImg);
        span.classList.add("Tag");
        tagListForm.appendChild(span);

        }

    }
}

function createTag(element) {
    const span = document.createElement("span");
    const input = document.createElement("input");
    
    if(loadStat === 0){

        const tag = document.createElement("p");
        const delImg = document.createElement("img");

        tag.innerText = element;
        span.appendChild(tag);
    
        delImg.src = "https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png";
        delImg.classList.add("delImg");
        delImg.id = tagId;

        tagId++;

        delImg.addEventListener("click",delTag);        
        span.appendChild(delImg);
        span.classList.add("Tag");
        tagListForm.appendChild(span);

    } else {

        input.classList.add("tagInput");
        input.onkeypress = enterCheck;
        input.placeholder = "New Tag";
        span.classList.add("Tag");
        span.appendChild(input);
        tagListForm.appendChild(span);
        input.focus();
    }

}

function addNewForm() {

    createTag();

}

function readDB(){

    // ******** db 읽는 코드 추가 필요 ********

    if(list !== null){
        list.forEach(createTag);
        loadStat = 1;
    }

    createTagForm.addEventListener("click", addNewForm);
    

}

function colorMouseOver(){

    event.target.style.border = "0.1px solid white";

}

function colorMouseOut() {

    event.target.style.border = "0.1px solid black";

}

function colorMouseCLick() {

    if(colorCLickStatus !== null) {

        colorCLickStatus.style.border = "0.1px solid black";
        colorCLickStatus.addEventListener("mouseout",colorMouseOut);
        colorCLickStatus.addEventListener("mouseover",colorMouseOver);

    }

    colorCLickStatus = event.target;

    colorCLickStatus.removeEventListener("mouseout",colorMouseOut);
    colorCLickStatus.removeEventListener("mouseover",colorMouseOver);
    clickColor = colorCLickStatus.style.backgroundColor;
    colorCLickStatus.style.border = "8px solid #f8e1f4";

}


function colorEvent() {

    for(let i=1;i<=12;i++) {

        const color = document.querySelector(`#c${i}`);
        color.addEventListener("mouseover", colorMouseOver);
        color.addEventListener("mouseout", colorMouseOut);
        color.addEventListener("click", colorMouseCLick);

    }

}

function showtodoList(todo, tagList, bgColor, nowDate) {

    const todoForm = document.createElement("div");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const todoP = document.createElement("p");
    const span = document.createElement("span");
    const color = document.createElement("div");
    const img = document.createElement("img");

    const br = document.createElement("br");

    const section1 = document.createElement("div");
    const section2 = document.createElement("div");
    const dateForm = document.createElement("p");



    //section 나누기
    section1.classList.add("section1");
    section2.classList.add("section2");



    //section1 추가
    todoForm.classList.add("todo");
    checkBox.type = "checkbox";
    checkBox.id = `ch${todoId}`;

    label.htmlFor = `ch${todoId}`;
    todoId++;

    label.appendChild(span);

    todoP.innerHTML = todo;
    todoP.classList.add("todoP");

    if(bgColor !== null) {

        color.classList.add("colorForm");
        color.style.background = bgColor;

    }

    section1.appendChild(color);
    section1.appendChild(checkBox);
    section1.appendChild(label);
    section1.appendChild(todoP);
    

    //section2 추가
    const tagForm = document.createElement("p"); // tag 이미지 추가
    img.src = "../static/img/tag-window-50.png";
    img.classList.add("tagImg");
    

    if(tagList.length === 0) {
        tagForm.innerHTML = `none tag`;
    } else {
        tagForm.innerHTML = `${tagList[0]} more ${tagList.length-1}`;
    }


    dateForm.innerHTML = nowDate;
    section2.appendChild(dateForm);     
    section2.appendChild(br);
    section2.appendChild(img);
    section2.appendChild(tagForm);


    //div에 section 1,2 추가
    todoForm.appendChild(section1);
    todoForm.appendChild(section2);

    

    todoListForm.appendChild(todoForm);

}

function passTodoData() {

    const todo = todoInputForm.value;
    let tagList = [];
    let e;

    for(let i=0;i<tagManageForm.childElementCount;i++){
        e = document.getElementById(i).previousSibling;
        tagList.push(e.textContent);
    }

    const date = new Date();
    const nowDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;

    showtodoList(todo, tagList, clickColor, nowDate);

    // ******** DB에 데이터 전송 코드 필요 ********
    
    
    // ******** todolist 전반적인 obj 제작 필요 ********
    todoListAppend(todo, tagList, clickColor, nowDate, true);
    

}

function todoListAppend(todo,tagList,clickColor,date,checked) {

    const Obj = {
        todo,
        tagList,
        color: clickColor,
        date: date,
        checked
    }

    console.log(Obj);
    todoObj.push(Obj);
    console.log(todoObj);

}

function filterList() {

    // ******** filter 선택 기능 필요 ********    

    let filter;

    if(1) {

        

    }

}

function enrollEvent() {

    todoEnrollForm.addEventListener("click",passTodoData);
    filterForm.addEventListener("click",filterList);

}

function init(){

    
    readDB();
    colorEvent();

    enrollEvent();

<<<<<<< Updated upstream
    
=======
     
>>>>>>> Stashed changes
    let yourUrl = "/api/v1/List";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", yourUrl, true);
<<<<<<< Updated upstream
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        value: "value"
    }));


=======
    xhr.send(null);
>>>>>>> Stashed changes
}

init();
