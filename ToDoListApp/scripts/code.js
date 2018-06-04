window.onload = function () {
    document.getElementById("addItem").onclick = saveItem;
    document.getElementById("displayItems").onclick = displayItems;
};

let allItems = [];



function saveItem() {
    let itemTitle = document.getElementById("title").value;
    let itemCategory = document.getElementById("category").value;
    let itemDescription = document.getElementById("description").value;
    let itemdateAdded = document.getElementById("dateAdded").value;
    
    let newTask = new ToDoItem(itemTitle);
    allItems.push(newTask);
    addItemToPage(itemTitle);
    clearTextboxes();
}


function addItemToPage(itemTitle) {
    let itemList = document.getElementById("itemList");
    let newItem = document.createElement("li");
    let textNode = document.createTextNode(itemTitle);
    newItem.appendChild(textNode);
    itemList.appendChild(newItem);
    newItem.setAttribute("draggable", "true");
    newItem.onclick = function () {
        this.remove();
        if (this.getAttribute("class") == null) {
            this.setAttribute("class", "itemDone");
        }
        else {
            this.removeAttribute("class");
        }
    };
}

function clearTextboxes() {
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("dateAdded").value = "";
    document.getElementById("description").value = "";
    document.getElementById("title").focus();
}

itemCategory, itemDescription, itemdateAdded
/*
function displayItems() {
    details(itemCategory, itemDescription, itemdateAdded);
}

*/
class ToDoItem {
    constructor(title) {
        this.title = title;
    }
}


/*
function details(itemCategory, itemDescription, itemdateAdded ) {
    let detailList = document.getElementById("details");
    let newItem = document.createElement("li");
    let textNode = document.createTextNode(itemCategory);
    let textNode = document.createTextNode(itemDescription);
    let textNode = document.createTextNode(itemdateAdded);
    newItem.appendChild(textNode);
    itemList.appendChild(newItem);
    newItem.setAttribute("draggable", "true");
    newItem.onclick = function () {
        this.remove();
        if (this.getAttribute("class") == null) {
            this.setAttribute("class", "itemDone");
        }
        else {
            this.removeAttribute("class");
        }
    };
}
*/

