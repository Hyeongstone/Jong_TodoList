const tagListForm = document.querySelector(".js-tagList"),
    createTagForm = document.querySelector(".js-createTag"),
    tagManageForm = document.querySelector(".js-tagList"), 
    todoInputForm = document.querySelector(".inputSize"),
    todoListForm = document.querySelector(".showTodoList"),
    todoEnrollForm = document.querySelector(".js-todoEnroll");

const list = [];

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

    //addEventListener("submit",)
}

function addNewForm() {

    createTag();

}

function readDB(){

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

function showtodoList(todo, tagList, bgColor) {

    const div = document.createElement("div");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const p = document.createElement("p");
    const span = document.createElement("span");
    const color = document.createElement("div");

    div.classList.add("todo");

    checkBox.type = "checkbox";
    checkBox.id = "ch1";

    label.htmlFor = "ch1";
    label.appendChild(span);

    p.innerHTML = todo;

    div.appendChild(checkBox);
    div.appendChild(label);
    div.appendChild(p);

    tagList.forEach(function(element) {
        const pp = document.createElement("p");
        pp.innerHTML = element;
        pp.classList.add("Tag");

        div.appendChild(pp);

    });

    if(bgColor !== null) {

        color.classList.add("colorForm");
        color.style.background = bgColor;

    }

    div.appendChild(color);

    todoListForm.appendChild(div);

}

function passTodoData() {

    const todo = todoInputForm.value;
    let tagList = [];
    let e;

    for(let i=0;i<tagManageForm.childElementCount;i++){
        e = document.getElementById(i).previousSibling;
        tagList.push(e.textContent);
    }

    console.log(todo, tagList, clickColor);

    showtodoList(todo, tagList, clickColor);

}

function enrollEvent() {

    todoEnrollForm.addEventListener("click",passTodoData);

}

function init(){

    
    readDB();
    colorEvent();

    enrollEvent();   

}

console.log("Asdfsa");
init();
