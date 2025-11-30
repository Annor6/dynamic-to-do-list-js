document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn"); // Added as requested ✔

        // Remove task when clicking remove button
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Add button to li → add li to ul
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Event: Add task when button is clicked
    addButton.addEventListener('click', addTask);

    // Event: Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
