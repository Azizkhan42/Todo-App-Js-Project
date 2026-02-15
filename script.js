const title = document.querySelector("#title");
const description = document.querySelector("#description");
const btn = document.querySelector("button");
const taskList = document.querySelector(".tasks");

const tasks = [];

btn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!title.value.trim() || !description.value.trim()) {
    alert("Please fill all fields");
    return;
  }

  const task = {
    id: tasks.length + 1,
    title: title.value,
    description: description.value,
    isCompleted: false,
  };

  tasks.push(task);

  // ===== create task row =====
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-item";

  const icon = document.createElement("i");
  icon.className = "fa-regular fa-circle check-icon";

  const textWrap = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.innerText = task.title;

  const p = document.createElement("p");
  p.innerText = task.description;

  textWrap.appendChild(h3);
  textWrap.appendChild(p);

  // ===== buttons =====
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  // ===== append =====
  taskDiv.appendChild(icon);
  taskDiv.appendChild(textWrap);
  taskDiv.appendChild(actions);
  taskList.appendChild(taskDiv);

  // ===== toggle complete =====
  icon.addEventListener("click", () => {
    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
      icon.className = "fa-solid fa-circle-check check-icon done";
      textWrap.classList.add("completed");
    } else {
      icon.className = "fa-regular fa-circle check-icon";
      textWrap.classList.remove("completed");
    }
  });

  // Edit button
  editBtn.onclick = () => {
    const newTitle = prompt("Edit title", h3.innerText);
    const newDesc = prompt("Edit description", p.innerText);

    if (newTitle) h3.innerText = newTitle;
    if (newDesc) p.innerText = newDesc;
  };

  // delete button
  delBtn.onclick = () => {
    taskDiv.remove();
  };

  title.value = "";
  description.value = "";
});
