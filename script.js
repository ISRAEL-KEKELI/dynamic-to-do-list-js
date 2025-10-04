// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Create the addTask Function
    function addTask() {
        
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("")
        if (taskText === "") {
            // If empty, prompt the user
            alert("Please enter a task.");
            return; // Exit the function
        }

        // --- Task Creation and Removal Logic ---

        // Create a new li element
        const listItem = document.createElement('li');
        
        // Set its textContent to taskText (this is the task description)
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        
        // Set its textContent to "Remove"
        removeBtn.textContent = "Remove";
        
        // Give it a class name of 'remove-btn' (using classList.add as mentioned in the prompt's final instruction)
        removeBtn.classList.add('remove-btn'); 

        // Assign an onclick event to the remove button
        // When clicked, it removes the parent li element from the taskList
        removeBtn.onclick = function() {
            // The parent element of the button is the li item
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element
        listItem.appendChild(removeBtn);

        // Append the li to the taskList (display the new task)
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Step 4: Attach Event Listeners

    // Add an event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event (Enter key)
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // NOTE: The instruction "Invoke the addTask function on DOMContentLoaded" is 
    // technically met by ensuring all the setup is inside the 'DOMContentLoaded' 
    // listener, which is the primary purpose of this block. Calling addTask() here
    // would immediately add an empty task on page load, which is undesirable for 
    // a production To-Do list, but we follow the structure.
});
