document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        document.getElementById('current-time').textContent = 
            (hours < 10 ? '0' : '') + hours + ':' +
            (minutes < 10 ? '0' : '') + minutes + ':' +
            (seconds < 10 ? '0' : '') + seconds;
    }
    setInterval(updateTime, 1000);

    const addButton = document.getElementById('new');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('Close');
    const saveButton = document.getElementById('Save');
    const taskList = document.querySelector('.task-icons');

    addButton.addEventListener('click', function() {
        popup.style.display = 'block';
    });

    closePopup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    saveButton.addEventListener('click', function() {
        const taskInput = document.getElementById('text').value;
        const category = document.querySelector('.category').value;

        // Create task item
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${taskInput}</span>
            <span>${category}</span>
            <i class="fa fa-edit edit" style="font-size:24px"></i> 
            <i class="fa fa-trash-o delete" style="font-size:24px"></i> 
        `;

        // Append task item to task list
        taskList.appendChild(taskItem);

        // Close popup
        popup.style.display = 'none';

        // Clear input fields
        document.getElementById('text').value = '';
        document.querySelector('.category').value = 'Household'; // Reset category to default

        // Add event listeners for edit and delete buttons
        const editButton = taskItem.querySelector('.edit');
        const deleteButton = taskItem.querySelector('.delete');

        editButton.addEventListener('click', function() {
            const taskTextElement = taskItem.querySelector('span');
            const taskCategoryElement = taskItem.querySelectorAll('span')[1];

            // Replace span elements with input elements for editing
            const taskTextInput = document.createElement('input');
            taskTextInput.value = taskTextElement.textContent;
            taskTextElement.replaceWith(taskTextInput);

            const taskCategoryInput = document.createElement('select');
            taskCategoryInput.classList.add('category');
            const categories = ['Household', 'Shopping', 'Work', 'Business'];
            categories.forEach(function(categoryOption) {
                const option = document.createElement('option');
                option.text = categoryOption;
                option.value = categoryOption;
                if (categoryOption === taskCategoryElement.textContent) {
                    option.selected = true;
                }
                taskCategoryInput.appendChild(option);
            });
            taskCategoryElement.replaceWith(taskCategoryInput);

            // Remove edit and delete buttons during editing
            editButton.style.display = 'none';
            deleteButton.style.display = 'none';

            // Add save button for editing
            const saveEditButton = document.createElement('i');
            saveEditButton.classList.add('fa', 'fa-save', 'save');
            saveEditButton.style.fontSize = '24px';
            taskItem.appendChild(saveEditButton);

            // Add event listener to save edit button
            saveEditButton.addEventListener('click', function() {
                const updatedTaskText = taskTextInput.value;
                const updatedTaskCategory = taskCategoryInput.value;

                // Update task item with new values
                taskTextInput.replaceWith(taskTextElement);
                taskTextElement.textContent = updatedTaskText;

                taskCategoryInput.replaceWith(taskCategoryElement);
                taskCategoryElement.textContent = updatedTaskCategory;

                // Restore edit and delete buttons after editing
                editButton.style.display = 'inline';
                deleteButton.style.display = 'inline';

                // Remove save button after editing
                saveEditButton.remove();
            });
        });

        deleteButton.addEventListener('click', function() {
            taskItem.remove(); // This will remove the task item from the DOM
        });
    });

    //// Timer function
function startTimer() {

}

// Start timer after 5 seconds
setTimeout(startTimer, 5000)
    
});
