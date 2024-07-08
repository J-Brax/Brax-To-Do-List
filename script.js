const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let undoStack = [];
let redoStack = [];

function addTask() {
    if (inputBox.value === "") {
        alert("Please enter a task");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00D7";
        li.appendChild(span);

        console.log("Task added: " + inputBox.value);
        undoStack.push(listContainer.innerHTML);
    }
    inputBox.value = "";
    saveData();
}

inputBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        undoStack.push(listContainer.innerHTML);
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        undoStack.push(listContainer.innerHTML);
        saveData();
    }
}, false);

document.addEventListener("keydown", function(e) {
    if (e.ctrlKey && e.key === 'z') {
        redoStack.push(undoStack.pop());
        listContainer.innerHTML = undoStack[undoStack.length - 1] || '';
    }
    else if (e.ctrlKey && e.key === 'y') {
        if (redoStack.length > 0) {
            undoStack.push(redoStack.pop());
            listContainer.innerHTML = undoStack[undoStack.length - 1];
        }
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    undoStack.push(listContainer.innerHTML);
}
showTask();