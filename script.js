const title = document.querySelector("#title");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const taskList = document.querySelector(".tasks");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-item";

    const icon = document.createElement("i");
    icon.className = task.isCompleted
      ? "fa-solid fa-circle-check check-icon done"
      : "fa-regular fa-circle check-icon";

    const textWrap = document.createElement("div");
    if (task.isCompleted) textWrap.classList.add("completed");

    const h3 = document.createElement("h3");
    h3.innerText = task.title;

    const p = document.createElement("p");
    p.innerText = task.description;

    textWrap.appendChild(h3);
    textWrap.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";

    const actions = document.createElement("div");
    actions.className = "actions";
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    taskDiv.appendChild(icon);
    taskDiv.appendChild(textWrap);
    taskDiv.appendChild(actions);
    taskList.appendChild(taskDiv);

    // Toggle complete
    icon.onclick = () => {
      tasks[index].isCompleted = !tasks[index].isCompleted;
      saveTasks();
      renderTasks();
    };

    // Edit
    editBtn.onclick = () => {
      const newTitle = prompt("Edit title", task.title);
      const newDesc = prompt("Edit description", task.description);

      if (newTitle) tasks[index].title = newTitle;
      if (newDesc) tasks[index].description = newDesc;

      saveTasks();
      renderTasks();
    };

    // Delete
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  });
}

btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!title.value.trim() || !description.value.trim()) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    isCompleted: false,
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  title.value = "";
  description.value = "";
});

renderTasks();
