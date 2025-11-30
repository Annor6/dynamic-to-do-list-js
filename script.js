// Persisted To-Do List with Local Storage
document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Array to hold tasks in memory
    let tasks = [];

    /**
     * Save the tasks array to localStorage
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Create a task element, append it to the DOM and optionally save it
     * @param {string} taskText - Text of the task to add
     * @param {boolean} save - Whether to save the task to localStorage (default true)
     */
    function addTask(taskText = null, save = true) {
        // If taskText not provided, read from input
        const text = taskText !== null ? taskText : taskInput.value.trim();

        if (text === "") {
            if (taskText === null) { // Only alert when user submitted empty input (not when loading)
                alert("Please enter a task.");
            }
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = text;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Remove task when clicking remove button and update localStorage
        removeButton.onclick = function () {
            // Remove from DOM
            if (li.parentNode === taskList) {
                taskList.removeChild(li);
            }

            // Remove from tasks array (remove first matching entry)
            const index = tasks.indexOf(text);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append button and li to list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // If this add should be persisted, update tasks array and localStorage
        if (save) {
            tasks.push(text);
            saveTasks();
            // Clear the input field only for user-initiated adds
            if (taskText === null) {
                taskInput.value = "";
            }
        } else {
            // For loaded tasks (save===false), don't clear input
        }
    }

    /**
     * Load tasks from localStorage and populate the DOM
     */
    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = Array.isArray(stored) ? stored.slice() : [];
        // Create DOM elements for each stored task, but don't save again
        tasks.forEach(task => addTask(task, false));
    }

    // Event: Add task when add button is clicked
    addButton.addEventListener('click', () => addTask());

    // Event: Add task when Enter key is pressed in the input
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });

    // Initialize: load tasks from localStorage
    loadTasks();

});