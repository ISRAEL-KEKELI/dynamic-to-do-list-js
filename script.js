// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Define the Task Removal Logic
    // This is separated into a function for use during both page load and runtime removal.
    function handleRemoveTask(listItem, taskText) {
        // Remove the list item from the DOM
        taskList.removeChild(listItem);

        // Update Local Storage
        // 1. Get the current tasks array from Local Storage
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // 2. Find the index of the task to be removed
        const index = storedTasks.indexOf(taskText);
        
        // 3. If found, remove it from the array
        if (index > -1) {
            storedTasks.splice(index, 1);
        }
        
        // 4. Save the updated array back to Local Storage
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }


    // Step 4: Create the addTask Function (modified to accept taskText and a 'save' flag)
    // The 'save' flag prevents saving to Local Storage when loading existing tasks.
    function addTask(taskText, save = true) {
        
        // If taskText is empty (only happens when clicking "Add Task" button without input)
        if (!taskText) {
            // Retrieve and trim the value from the task input field
            taskText = taskInput.value.trim();
        }

        // Check if taskText is not empty
        if (taskText === "") {
            // If empty, prompt the user
            if (save) { // Only alert if this is a user-initiated addition, not page load
                alert("Please enter a task.");
            }
            return; // Exit the function
        }

        // --- Task Creation ---

        // Create a new li element
        const listItem = document.createElement('li');
        // Set its textContent to taskText
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        // Set its textContent to "Remove"
        removeBtn.textContent = "Remove";
        // Give it a class name of 'remove-btn'
        removeBtn.classList.add('remove-btn'); 

        // Assign the removal function to the button's click event
        removeBtn.onclick = function() {
            // Pass the listItem and the taskText to the reusable removal handler
            handleRemoveTask(listItem, taskText);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeBtn);

        // Append the li to the taskList (display the new task)
        taskList.appendChild(listItem);

        // Clear the task input field
        if (save) {
            taskInput.value = "";
        }
        
        // --- Saving Tasks to Local Storage (if flag is true) ---
        if (save) {
            // 1. Get the current tasks array from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            
            // 2. Add the new task
            storedTasks.push(taskText);
            
            // 3. Save the updated array back to Local Storage
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }
    
    // Step 5: Function to Load Tasks from Local Storage
    function loadTasks() {
        // Retrieve and parse tasks from Local Storage, defaulting to an empty array
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Loop through each stored task
        storedTasks.forEach(taskText => {
            // Call addTask for each task, setting 'save' to false 
            // to prevent saving them back to Local Storage (i.e., duplication)
            addTask(taskText, false); 
        });
    }


    // Step 6: Attach Event Listeners and Invoke Load Function
    
    // Attach listener for 'Add Task' button click
    addButton.addEventListener('click', () => {
        // When the button is clicked, we pass the current input value (which is retrieved inside addTask)
        addTask(taskInput.value.trim(), true); 
    });

    // Attach listener for 'Enter' key press in the input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            // When Enter is pressed, pass the current input value
            addTask(taskInput.value.trim(), true);
        }
    });

    // Invoke the load function to display saved tasks upon page load
    loadTasks();
});
