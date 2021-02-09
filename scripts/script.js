const todo = document.getElementById("todo");

const newItemForm = document.getElementById("newItemForm");

const NEWpriority = document.createElement('label');
const NEWcheckbox = document.createElement('input');
const NEWname = document.createElement('input');
const NEWdate = document.createElement('input');
const NEWdesc = document.createElement('textarea');
const NEWgroup = document.createElement('input');
const NEWbuttonsDiv = document.createElement('div');
const NEWsaveItem = document.createElement('button');
const NEWcancelItem = document.createElement('button');

NEWpriority.addEventListener('click', () => {
    if(NEWcheckbox.checked){
        NEWpriority.classList.remove("grey");
    }else{
        NEWpriority.classList.add("grey");
    }
});

NEWcancelItem.addEventListener('click', () => {
    newItemForm.reset();
    NEWpriority.classList.add("grey");
});

function createForm(){
    NEWpriority.classList.add("urgency-icon");
    NEWpriority.innerHTML = "🔥"
    NEWpriority.classList.add("grey");
    NEWcheckbox.type = "checkbox"
    NEWcheckbox.classList.add("hidden");

    newItemForm.appendChild(NEWpriority);
    NEWpriority.appendChild(NEWcheckbox);

    NEWname.type = "text";
    NEWname.name = "task";
    NEWname.placeholder = "Task name"
    newItemForm.appendChild(NEWname);

    NEWdate.type = "date";
    NEWdate.name = "due date";
    newItemForm.appendChild(NEWdate);

    NEWdesc.classList.add("description");
    NEWdesc.name = "description";
    NEWdesc.placeholder = "Description";
    newItemForm.appendChild(NEWdesc);

    NEWgroup.classList.add("todo-group");
    NEWgroup.name = "group"
    NEWgroup.placeholder = "Group";
    NEWgroup.value = currentGroup;
    newItemForm.appendChild(NEWgroup);

    NEWbuttonsDiv.classList.add("buttons");
    
    NEWsaveItem.type = "button";
    NEWsaveItem.innerHTML = "Save";

    NEWcancelItem.type = "button";
    NEWcancelItem.innerHTML = "Cancel";

    newItemForm.appendChild(NEWbuttonsDiv);
    NEWbuttonsDiv.appendChild(NEWsaveItem);
    NEWbuttonsDiv.appendChild(NEWcancelItem);
}

const newItem = document.getElementById("newItem");
const closeItem = document.getElementById("closeItem");

newItem.addEventListener('click', () => {
    newItem.classList.add("hidden");
    closeItem.classList.remove("hidden");
    newItemForm.classList.remove("hidden");
    createForm();
});
closeItem.addEventListener('click', () => {
    newItem.classList.remove("hidden");
    closeItem.classList.add("hidden");
    newItemForm.classList.add("hidden");
    newItemForm.innerHTML = "";
});

NEWsaveItem.addEventListener("click", submitForm);

function submitForm(){
    const urgency = NEWcheckbox.checked;
    const name = NEWname.value;
    const due = NEWdate.value;
    const description = NEWdesc.value;
    const group = NEWgroup.value;
    let error = false;

    if(name == ""){
        NEWname.classList.add("error");
        error = true;
    }else{
        NEWname.classList.remove("error");
    }

    if(due == ""){
        NEWdate.classList.add("error");
        error = true;
    }else{
        NEWdate.classList.remove("error");
    }

    if(error) return;
    
    addTask(name, description, due, group, urgency);
    newItemForm.reset();
    NEWpriority.classList.add("grey");
}

function addTask(name, description, due, group, priority, status){
    tasks.push(new Task(name, description, due, group, priority, status, taskID));
    taskID++;
    render(currentGroup);
}

const undoWindow = document.getElementById("undo");
function displayUndo(){
    undoWindow.classList.remove("hidden");
}

function hideUndo(){
    undoWindow.classList.add("hidden");
}

function undo(){
    animateHideUndo();
    tasks.push(backup);
    render(currentGroup);
}

function render(group){
    saveToStorage();
    todo.innerHTML = "";
    renderMenu();
    for(let i = 0; i < tasks.length; i++){
        if(group == "" || tasks[i].group == group){
            tasks[i].print();
        }
    }
}

function animate(element, animationClass, seconds, action, isHide, actionAttribute){ //actionAttribute needs to be passed since calling a function as an attribute breaks the code
    element = (typeof element === "string") ? document.querySelector(element) : element;
    let milliseconds = seconds * 1000;
    if(isHide){
        element.classList.add(animationClass);
        setTimeout(function() {action(actionAttribute)}, milliseconds);
    }else{
        action(actionAttribute);
        setTimeout(() => {element.classList.remove(animationClass)}, 1);
    }
}

function animateDisplayUndo(){
    animate("#undo", "poof", 0.5, displayUndo, false);
}

function animateHideUndo(){
    animate("#undo", "poof", 0.5, hideUndo, true);
}

const menu = document.getElementById("menu");
menu.innerHTML = "";
const menuAll = document.createElement("li");
menuAll.innerHTML = "Show All";
menu.appendChild(menuAll);

let groupObj = {};

function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
      result[key] = obj[key];
      return result;
    }, {});
}

function populateMenu(){
    groupObj = {};
    tasks.forEach((item) => {
        if(groupObj[item.group]){
            groupObj[item.group]++
        }else{
            groupObj[item.group] = 1;
        }
    });
    groupObj = sortObj(groupObj);
}

function renderMenu(){
    menu.innerHTML = "";
    populateMenu();
    for(const key in groupObj){
        let menuItem = document.createElement("li");
        menuItem.innerHTML = "<span onclick=showGroup('"+key+"')>" + key + " (" + groupObj[key] + ")</span>"; //showGroup() gets called as a string on onclick
        menu.appendChild(menuItem);
    }
}

function showGroup(key){
    currentGroup = key;
    if(key == ''){
        headerName.innerHTML = "All tasks";
    }else{
        headerName.innerHTML = key;
    }
    sortByID(1);
}

function sortByName(reverse){ //for reverse enter 1 or -1
    tasks = tasks.sort((a, b) => {
        let stringA = a.name.toUpperCase();
        let stringB = b.name.toUpperCase();
        if(stringA < stringB){
            return -1 * reverse;
        }
        else if(stringA > stringB){
            return 1 * reverse;
        }
        return 0;
    });
    render(currentGroup);
}

function sortByID(reverse){
    tasks = tasks.sort((a, b) => (a.id - b.id) * reverse);
    render(currentGroup);
}

function sortByDate(reverse){
    tasks = tasks.sort((a, b) => {
        let stringA = a.due;
        let stringB = b.due;
        if(stringA < stringB){
            return -1 * reverse;
        }
        else if(stringA > stringB){
            return 1 * reverse;
        }
        return 0;
    });
    render(currentGroup);
}

function sortByUrgent(){
    tasks = tasks.sort((a, b) => {
        if(a.priority < b.priority){
            return 1;
        }
        else if(a.priority > b.priority){
            return -1;
        }
        return 0;
    });
    render(currentGroup);
}

const headerName = document.getElementById("header-name");
let headerNameSelected = 1;
headerName.addEventListener("click", () => {
    sortByName(headerNameSelected);
    headerNameSelected *= -1;
    headerDueSelected = 1;
});

const headerDue = document.getElementById("header-due");
let headerDueSelected = 1;
headerDue.addEventListener("click", () => {
    sortByDate(headerDueSelected);
    headerDueSelected *= -1;
    headerNameSelected = 1;
})

const headerPriority = document.getElementById("header-priority");
headerPriority.addEventListener("click", () => {
    sortByUrgent();
    headerSelectionClear()
})

function headerSelectionClear(){
    headerNameSelected = 1;
    headerDueSelected = 1;
}

let tasksParse = []

function saveToStorage(){
    localStorage.setItem("items", JSON.stringify(tasks));
    localStorage.setItem("taskID", taskID);
}

function getFromStorage(){
    taskID = localStorage.getItem("taskID");
    tasksParse = JSON.parse(localStorage.getItem("items"));
    tasks = [];
    for (let i = 0; i < tasksParse.length; i++){
        tasks.push(new Task (tasksParse[i].name, tasksParse[i].description, tasksParse[i].due, tasksParse[i].group, tasksParse[i].priority, tasksParse[i].status, tasksParse[i].id));
    }
    render('');
}


if(localStorage.items){
    console.log("taken from localStorage");
    getFromStorage();
}else{
    console.log("created");
    addTask("Prepare Valentine's dinner", "Calzone and cake", "2021-02-14", "Events", false, true);
    addTask("Interview @ 11am", "ABC Company", "2021-02-11", "Work", false, false);
    addTask("Buy paperclips", "Regular size, 100un. box", "2021-02-16", "Work", true, false);
    addTask("Buy tickets for the movie", "Titanic @ 10pm", "2021-02-22", "Events", false, false);
    addTask("Groceries", "Tomato, potato, minced meat", "2021-02-10", "Food", true, true);
    addTask("Do nothing", "For the whole day", "2021-02-13", "Events", false, false);
}