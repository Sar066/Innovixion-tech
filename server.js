const taskList = document.getElementById('task-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');

function displayTasks() {
  taskList.innerHTML = '';
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span>${task.text}</span>
          <button data-id="${task._id}">Delete</button>
        `;
        listItem.querySelector('input').addEventListener('change', () => {
          // Update task completion status
        });
        listItem.querySelector('button').addEventListener('click', () => {
          // Delete the task
        });
        taskList.appendChild(listItem);
      });
    });
}

addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value;
  if (text) {
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, completed: false }),
    })
      .then(response => response.json())
      .then(() => {
        taskInput.value = '';
        displayTasks();
      });
  }
});

displayTasks();
