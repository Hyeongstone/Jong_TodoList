const tagListForm = document.querySelector(".js-tagList"),
    createTagForm = document.querySelector(".js-createTag"),
    tagManageForm = document.querySelector(".js-tagList"), 
    todoInputForm = document.querySelector(".inputSize"),
    //todoListForm = document.querySelector(".showTodoList"),
    todoEnrollForm = document.querySelector(".js-todoEnroll"),
    filterForm = document.querySelector(".js-filterForm"),
    showTodoForm1 = document.querySelector(".js-showTodoForm1"),
    showTodoForm2 = document.querySelector(".js-showTodoForm2");

let filterName= "";
let filterClass = [];
let fieldFormSw = 1;
let todoId = 0;

const list = [];
const todoObj = [
    
    /*
    {
        todo:"BBB",
        tag:["ddd","eee","fff"],
        clickColor = "blue",
        date:"2020.07.19",
        checked:false
    },

    {
        todo:"CCC",
        tag:["ggg","hhh","iii"],
        clickColor = "blue",
        date:"2021.07.20",
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
    
        input.classList.add("tagInput");
        input.onkeypress = enterCheck;
        input.placeholder = "New Tag";
        span.classList.add("Tag");
        span.appendChild(input);
        tagListForm.appendChild(span);
        input.focus();
    

}

function addNewForm() {

    createTag();

}

function readDB(){

    // ******** db 읽는 코드 추가 필요 ********
    /*
    todo:"AAA",
        tag:["aaa","bbb","ccc"],
        clickColor = "red",
        date:"2020.07.18",
        checked:true
    */
    //example
    const Data = [

        {
            filter: "2018",
            content: [

                {
                    todo: "AAA",
                    content: ["a","b",'c'],
                    clickColor: "red",
                    date: "2018.01.01",
                    checked: false
                },

                {
                    todo: "BBB",
                    content: ["a",'b'],
                    clickColor: "blue",
                    date: "2018.02.02",
                    checked: false
                },

                {
                    todo: "CCC",
                    content: ["a",'b'],
                    clickColor: "blue",
                    date: "2018.02.02",
                    checked: false
                }

            ]
        },
        
        {
            filter: "2019",
            content: [

                {
                    todo: "CCC",
                    content: ["a","b"],
                    clickColor: "red",
                    date: "2019.01.01",
                    checked: false
                },

                {
                    todo: "DDD",
                    content: ["a","b"],
                    clickColor: "blue",
                    date: "2019.02.02",
                    checked: true
                }

            ]
        },
        
        {
            filter: "2020",
            content: [

                {
                    todo: "CCC",
                    content: ["a","b"],
                    clickColor: "red",
                    date: "2020.01.01",
                    checked: false
                },

                {
                    todo: "DDD",
                    content: ["a","b"],
                    clickColor: "blue",
                    date: "2020.02.02",
                    checked: true
                }

            ]
        },

        {
            filter: "2021",
            content: [

                {
                    todo: "CCC",
                    content: ["a","b"],
                    clickColor: "red",
                    date: "2020.01.01",
                    checked: false
                },

                {
                    todo: "DDD",
                    content: ["a","b"],
                    clickColor: "blue",
                    date: "2020.02.02",
                    checked: true
                }

            ]
        }
        

    ];

    filterName = "date:year";

    console.log(Data);

    Data.forEach(function(d) {
        
        // filter head? title? 부분 생성
        makeFieldSet(d.filter);

        const a = [
            d.filter,
            document.getElementById(d.filter.substring(0,4))
        ];
        
        filterClass.push(a);
        console.log("push!!");

        console.log("AAAAAAAAAAAAAAAAAAAAA");

        d.content.forEach(function(dCon) {

            console.log("BBBBBBBBBBBBBBBBBBBB");

            // filter content 부분 생성
            //console.log(dCon, dCon.content);
            const o = {
                todo: dCon.todo,
                content: dCon.content,
                clickColor: dCon.clickColor,
                date: dCon.date,
                checked: dCon.checked
            };
            todoObj.push(o);
            console.log(filterClass.length);
            showtodoList(dCon.todo, dCon.content, dCon.clickColor, dCon.date, dCon.checked, true);
        });

        if(fieldFormSw === 1) fieldFormSw = 2;
        else fieldFormSw = 1;

    });

    createTagForm.addEventListener("click", addNewForm);
    
}

function makeFieldSet(text) {
    
    const fieldSet = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const div = document.createElement("sapn");

    legend.innerHTML = text;
    fieldSet.appendChild(legend);
    fieldSet.classList.add("field");

    div.appendChild(fieldSet);
    div.id = text;
    
    if(fieldFormSw === 1){
        showTodoForm1.appendChild(div);
    } else {
        showTodoForm2.appendChild(div);
    }

    //console.log(text);

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

function showtodoList(todo, tagList, bgColor, nowDate ,checked, status) {

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

    // ************* chked 데이터 처리 필요 **********************
    if(checked === true){

    } else {

    }

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
    

    if(tagList.length === 0 || tagList === undefined) {
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
    
    // 처음 출력인지 중간에 새로 만드는 것인지 확인
    if(status===false){

        console.log(filterName.substring(0,4) , filterClass);
        const str = filterName.substring(0,4);

        console.log(showTodoForm1.childNodes , showTodoForm2.childNodes);

        switch(str){
            case "date": date(); break;
            case "chec": checked(); break;
            case "colo": color(); break;
            case "tagd": tag(); break;
        }

        function date() {
            console.log("for date");
            
            const a = filterName.substring(5,);
            const d = nowDate.split(".");
            let standard = "";

            if(a === "year"){
                standard = d[0];
            } else if(a === "month"){
                standard = d[1];
            } else if(a === "day"){
                standard = d[2];
            }

            let s="";

            filterClass.forEach(element => {
                if(element[0] === standard){
                    s = element[1];
                }    
            });
            

            if(s === ""){
                // fieldset 리스트에 현재 기준이 존재하지 않는다면
                makeFieldSet(standard);
                const a = [
                    standard, document.getElementById(standard)
                ];
                s = a[1];

                console.log("filterClass: ",s,filterClass);
                
                filterClass.push(a);

                console.log(filterClass);
            }


            //console.log(standard);
            
            s.appendChild(todoForm);
        
        }

        function checked() {
            console.log("for checked");
        }

        function color() {
            console.log("for color");
        }

        function tag() {
            console.log("for tag");
        }

    } else {

        filterClass[filterClass.length-1][1].appendChild(todoForm);

    }
    

}

function passTodoData() {

    const todo = todoInputForm.value;
    let tagList = [];
    let e;

    // Data push
    for(let i=0;i<tagManageForm.childElementCount;i++){
        e = document.getElementById(i).previousSibling;
        tagList.push(e.textContent);
    }

    const date = new Date();
    const nowDate = `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;

    showtodoList(todo, tagList, clickColor, nowDate, true , false);

    
    // ******** DB에 데이터 전송 코드 필요 ********
    
    
    // ******** todolist 전반적인 obj push 기능 필요 ********
    todoListAppend(todo, tagList, clickColor, nowDate, true);
    
}

function todoListAppend(todo,tagList,clickColor,date,checked) {

    const Obj = {
        todo,
        content: tagList,
        color: clickColor,
        date: date,
        checked
    }

    /*
    console.log(Obj);
    todoObj.push(Obj);
    console.log(todoObj);
    */

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

    //console.log(filterName,filterClass);

    /*

    const todofilter = [
        
        {
            filter: "2018",
            content: [

                {
                    title: "AAA",
                    content: "aaa",
                    date: "2018.01.01"
                },

                {
                    title: "BBB",
                    content: "bbb",
                    date: "2018.02.02"
                }

            ]
        },

        {
            filter: "2019",
            content: [

                {
                    title: "CCC",
                    content: "ccc",
                    date: "2019.01.01"
                },

                {
                    title: "DDD",
                    content: "ddd",
                    date: "2019.02.02"
                }

            ]
        }
     
    let yourUrl = "/api/v1/List";
    ]

    console.log(todofilter);
    */

    

}

init();
