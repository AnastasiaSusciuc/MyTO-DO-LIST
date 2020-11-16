const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");


const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "linethrough";

const list = document.getElementById("list");
const input = document.getElementById("input");

let LIST, id;

let data = localStorage.getItem("TODO");


if(data)
{
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST);  // gets the list from the local repo
}
else
{
    LIST = []; // if there are no elements in the repo, one repo is created
    id = 0;
}

function loadList(array)
{
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash); }); // loads the list to the UI
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

const options = {weekday : "short", month:"long", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// adds a to do to
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, item);
}

// adds an item when the user presses 'enter'
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
    
        if(toDo)
        {
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
        });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


function completeToDo(item){
    item.classList.toggle(CHECK);
    item.classList.toggle(UNCHECK);
    item.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[item.id].done = LIST[item.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// triggers an event when 'clicking' depending on the current state of a ToDo 
list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value;
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});


















