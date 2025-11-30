// Ensure the DOM is fully loaded before the script runs
document.addEventListener('DOMContentLoaded', () => {

    // Select the required DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        // Check for empty input
        if (taskText === "") {
            alert("Please enter a task");
            return;
        }

        // Create the list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when clicked
        removeBtn.onclick = () => {
            taskList.removeChild(li);
        };

        // Attach remove button to the task item
        li.appendChild(removeBtn);

        // Add task item to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = "";
    }

    // Call addTask when the button is clicked
    addButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

});
