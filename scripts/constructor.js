let taskID = 0;
let tasks = [];
let activeTasks = [];
let backupID = 0;
let backup = "";

function Task(name, description, due, group, priority, id){
    this.name = name;
    this.description = description;
    this.due = due;
    this.status = false;
    this.group = group;
    this.priority = priority;
    this.id = id;

    this.setName = function(name){
        this.name = name;
    }
    this.setDescription = function(description){
        this.description = description;
    }
    this.setDue = function(due){
        this.due = due;
    }
    this.setStatus = function(status){
        this.status = status;
    }
    this.setUrgency = function(priority){
        this.priority = priority;
    }

    // DOM Stuff

    const DOMtodoItem = document.createElement('div');
    const DOMpriority = document.createElement('div');
    const DOMname = document.createElement('div');
    const DOMdue = document.createElement('div');
    const DOMstatus = document.createElement('div');
    const DOMcheckbox = document.createElement('input');
    const DOMedit = document.createElement('a');
    const DOMdelete = document.createElement('a');
    this.print = function(){
        DOMtodoItem.innerHTML = "";
        DOMtodoItem.remove();
        DOMtodoItem.classList.add("todo-item");
        DOMtodoItem.classList.remove("poof");

        DOMpriority.innerHTML = this.priority ? "🔥" : "";

        DOMpriority.classList.add("priority");
        DOMtodoItem.appendChild(DOMpriority);

        DOMname.innerHTML = this.name;
        DOMname.classList.add("name");
        DOMtodoItem.appendChild(DOMname);

        DOMdue.innerHTML = this.due;
        DOMdue.classList.add("due");
        DOMtodoItem.appendChild(DOMdue);

        DOMcheckbox.type = "checkbox";
        DOMcheckbox.name = "to-do status";
        DOMedit.innerHTML = "✎";
        DOMedit.classList.add("btn-edit");
        DOMdelete.innerHTML = "✖";
        DOMdelete.classList.add("btn-delete");
        

        DOMtodoItem.appendChild(DOMstatus);
        DOMstatus.appendChild(DOMcheckbox);
        DOMstatus.appendChild(DOMedit);
        DOMstatus.appendChild(DOMdelete);
        todo.appendChild(DOMtodoItem);
    }
    
    DOMcheckbox.addEventListener('click', () => {
        if(DOMcheckbox.checked){
            console.log("checked");
            this.status = true;
            DOMcheckbox.checked = true;
            DOMtodoItem.classList.add("done");
        }else{
            console.log("unchecked");
            this.status = false;
            DOMcheckbox.checked = false;
            DOMtodoItem.classList.remove("done");
        }
        render();
    })

    const FORMtodo = document.createElement('form');
    const FORMpriority = document.createElement('label');
    const FORMcheckbox = document.createElement('input');
    const FORMname = document.createElement('input');
    const FORMdate = document.createElement('input');
    const FORMdesc = document.createElement('textarea');
    const FORMgroup = document.createElement('input');
    const buttonsDiv = document.createElement('div');
    const FORMsaveItem = document.createElement('button');
    const FORMcancelItem = document.createElement('button');

    this.edit = function(){
        render();
        DOMtodoItem.innerHTML = "";
        FORMtodo.classList.add("edit-item");


        FORMpriority.classList.add("urgency-icon");
        FORMpriority.innerHTML = "🔥"
        if (!this.priority) FORMpriority.classList.add("grey");
        FORMcheckbox.type = "checkbox"
        FORMcheckbox.checked = this.priority;
        FORMcheckbox.classList.add("hidden");

        FORMpriority.addEventListener('click', () => {
            if(FORMcheckbox.checked){
                FORMpriority.classList.remove("grey");
            }else{
                FORMpriority.classList.add("grey");
            }
        });

        FORMtodo.appendChild(FORMpriority);
        FORMpriority.appendChild(FORMcheckbox);

        FORMname.type = "text";
        FORMname.value = this.name;
        FORMname.name = "task";
        FORMtodo.appendChild(FORMname);

        FORMdate.type = "date";
        FORMdate.name = "due date";
        FORMdate.value = this.due;
        FORMtodo.appendChild(FORMdate);

        FORMdesc.classList.add("description");
        FORMdesc.name = "description";
        FORMdesc.value = this.description;
        FORMtodo.appendChild(FORMdesc);

        FORMgroup.classList.add("todo-group");
        FORMgroup.name = "group"
        FORMgroup.value = this.group;
        FORMtodo.appendChild(FORMgroup);

        buttonsDiv.classList.add("buttons");
        
        FORMsaveItem.type = "button";
        FORMsaveItem.innerHTML = "Save";

        FORMcancelItem.type = "button";
        FORMcancelItem.innerHTML = "Cancel";

        FORMtodo.appendChild(buttonsDiv);
        buttonsDiv.appendChild(FORMsaveItem);
        buttonsDiv.appendChild(FORMcancelItem);

        DOMtodoItem.appendChild(FORMtodo);
    }

    DOMedit.addEventListener('click', () => {this.edit()});

    /*
    FUNCTIONS
    */

    this.update = function(){
        this.name = FORMname.value;
        this.description = FORMdesc.value;
        this.due = FORMdate.value;
        this.priority = FORMcheckbox.checked;
        render();
    }

    FORMsaveItem.addEventListener('click', () => {this.update()});

    this.cancel = function(){
        render();
    }

    FORMcancelItem.addEventListener('click', () => {this.cancel()});

    this.delete = function(){
        animateDisplayUndo()
        backupID = this.id;
        backup = tasks[this.id];
        tasks[this.id] = null;
        animate(DOMtodoItem, "poof", 0.5, render, true);
    }

    DOMdelete.addEventListener('click', () => {this.delete()});
}
