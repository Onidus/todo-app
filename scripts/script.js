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

function addTask(name, description, due, group, priority){
    tasks.push(new Task(name, description, due, group, priority, taskID));
    taskID++;
    render();
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
    tasks[backupID] = backup;
    render();
}

function populateActiveTasks(){
    activeTasks = [];
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i] instanceof Task){
            activeTasks.push(tasks[i]);
        }
    }
}

function render(group){
    todo.innerHTML = "";
    populateActiveTasks();
    for(let i = 0; i < activeTasks.length; i++){
        if(group == null || activeTasks[i].group == group){
            activeTasks[i].print();
        }
    }
}

function animate(element, animationClass, seconds, action, isHide){
    element = (typeof element === "string") ? document.querySelector(element) : element;
    let milliseconds = seconds * 1000;
    if(isHide){
        element.classList.add(animationClass);
        setTimeout(action, milliseconds);
    }else{
        action();
        setTimeout(() => {element.classList.remove(animationClass)}, 1);
    }
}

function animateDisplayUndo(){
    animate("#undo", "poof", 0.5, displayUndo, false);
}

function animateHideUndo(){
    animate("#undo", "poof", 0.5, hideUndo, true);
}


addTask("Eat burgers", "Yummy", "1995-05-03", "Food", false);
addTask("Eat fries", "Crunchy", "1998-06-23", "Food", true);
addTask("Drink soda", "Yummy", "2005-02-14", "Drink", false);
addTask("Wash dishes", "Oh no...", "2021-03-07", "Cleaning", false);

render();