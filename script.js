
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");
    const subjectInput = document.getElementById("subjectInput");

    const taskName = taskInput.value.trim();
    const date = dateInput.value;
    const subject = subjectInput.value;

    if (taskName === "" || date === "" || subject === "") {
        alert("Please fill in all fields.");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        date: date,
        subject: subject,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    dateInput.value = "";
    subjectInput.value = "";
}

function displayTasks() {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");
        li.className = "task";

        li.innerHTML = `
            <div class="task-info ${task.completed ? "completed" : ""}">
                <strong>${task.name}</strong>
                <span>${task.subject} | Due: ${task.date}</span>
            </div>

            <div>
                <button onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateProgress();
}

function completeTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function updateProgress() {

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if (tasks.length === 0) {
        progressBar.style.width = "0%";
        progressText.textContent = "0% Completed";
        return;
    }

    const completedTasks = tasks.filter(task => task.completed).length;

    const percentage = Math.round(
        (completedTasks / tasks.length) * 100
    );

    progressBar.style.width = percentage + "%";
    progressText.textContent = percentage + "% Completed";
}

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

displayTasks();