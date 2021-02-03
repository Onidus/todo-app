const menu = document.getElementById("menu");
menu.innerHTML = "";
const menuAll = document.createElement("li");
menuAll.innerHTML = "Show All";
menu.appendChild(menuAll);

let groupObj = {};

function populateMenu(){
    activeTasks.forEach((item) => {
        console.log(item.group);
        if(groupObj[item.group]){
            groupObj[item.group]++
        }else{
            groupObj[item.group] = 1;
        }
    });
}

function renderMenu(){
    for(const key in groupObj){

    }
}