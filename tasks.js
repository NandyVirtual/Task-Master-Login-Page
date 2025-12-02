const openBtn = document.getElementById("openAddTask");
const modal = document.getElementById("taskModal");
const closeBtn = document.getElementById("closeModal");
const cancelBtn = document.getElementById("cancelTask");
const createBtn = document.getElementById("createTask");

const titleInput = document.getElementById("taskTitle");
const descInput = document.getElementById("taskDesc");
const priorityInput = document.getElementById("taskPriority");
const dateInput = document.getElementById("taskDate");

const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const container = document.getElementById("taskContainer");

const myTasksTab = document.getElementById("myTasksTab");
const aiTab = document.getElementById("aiTab");
const myTasksSection = document.getElementById("myTasksSection");
const aiSection = document.getElementById("aiSection");

const latestTab = document.getElementById("latestTab");
const historyTab = document.getElementById("historyTab");

openBtn.onclick = () => modal.classList.remove("hidden");
closeBtn.onclick = cancelBtn.onclick = () => modal.classList.add("hidden");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* TAB SWITCHING */
myTasksTab.onclick = () => {
  myTasksTab.classList.add("active");
  aiTab.classList.remove("active");
  myTasksSection.classList.remove("hidden");
  aiSection.classList.add("hidden");
};

aiTab.onclick = () => {
  aiTab.classList.add("active");
  myTasksTab.classList.remove("active");
  myTasksSection.classList.add("hidden");
  aiSection.classList.remove("hidden");
};

/* AI SUB-TABS */
latestTab.onclick = () => {
  latestTab.classList.add("active");
  historyTab.classList.remove("active");
};

historyTab.onclick = () => {
  historyTab.classList.add("active");
  latestTab.classList.remove("active");
};

/* TASK RENDER */
function renderTasks() {
  if (tasks.length === 0) {
    container.innerHTML = `
      <div class="empty-inner">
        <div class="empty-circle"></div>
        <h4>No tasks yet</h4>
        <p>Click “Add Task” to create your first task</p>
      </div>`;
  } else {
    container.innerHTML = tasks.map(task => `
      <div class="task-item">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>
    `).join("");
  }

  activeCount.textContent = tasks.length;
  completedCount.textContent = 0;
}

createBtn.onclick = () => {
  const newTask = {
    title: titleInput.value,
    description: descInput.value,
    priority: priorityInput.value,
    date: dateInput.value
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  modal.classList.add("hidden");
  titleInput.value = "";
  descInput.value = "";

  renderTasks();
};

renderTasks();
