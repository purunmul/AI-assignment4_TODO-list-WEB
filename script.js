document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.getElementById('filter-buttons');
    const emptyStateMessage = document.getElementById('empty-state-message');
    
    // Stats and Progress Elements
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    const totalTasksStat = document.getElementById('total-tasks-stat');
    const completedTasksStat = document.getElementById('completed-tasks-stat');
    const remainingTasksStat = document.getElementById('remaining-tasks-stat');

    // --- State Variables ---
    const STORAGE_KEY = 'focus-todo-tasks';
    let currentFilter = 'all'; // 'all', 'active', 'completed'


    // Load tasks from Local Storage on page load
    loadTasks();

    // Event listener for form submission (adding a task)
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, false, dueDateInput.value || null);
            saveAndRender();
            taskInput.value = '';
            dueDateInput.value = '';
            taskInput.focus();
        }
    });

    // Event listener for clicks on the task list (for completing and deleting)
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');

        if (!taskItem) return;

        // Handle task completion toggle
        if (target.type === 'checkbox') {
            taskItem.classList.toggle('completed');
            saveAndRender();
        }

        // Handle task deletion
        if (target.classList.contains('delete-btn')) {
            // Add a class to trigger the CSS removal animation
            taskItem.classList.add('removing');
            // Wait for the animation to finish before removing from the DOM and saving
            setTimeout(() => {
                taskItem.remove();
                saveAndRender();
            }, 400); // This duration should match the transition time in style.css
        }
    });

    // Event listener for filter buttons
    filterButtons.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const filter = e.target.dataset.filter;
            currentFilter = filter;
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            renderTasks();
        }
    });

    /**
     * Creates and adds a new task item to the DOM.
     * @param {string} text - The text content of the task.
     * @param {boolean} isCompleted - The completion status of the task.
     */
    function addTask(text, isCompleted = false, dueDate = null) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (isCompleted) {
            taskItem.classList.add('completed');
        }

        // Store due date in a data attribute for easy access
        if (dueDate) {
            taskItem.dataset.dueDate = dueDate;
        }

        const dueDateHtml = dueDate 
            ? `<span class="task-due-date">Due: ${new Date(dueDate).toLocaleDateString()}</span>` 
            : '';

        taskItem.innerHTML = `
            <input type="checkbox" ${isCompleted ? 'checked' : ''}>
            <div class="task-content">
                <span class="task-text">${text}</span>
                ${dueDateHtml}
            </div>
            <button class="delete-btn">&times;</button>
        `;

        taskList.appendChild(taskItem);
    }

    /**
     * Central function to save state and update the UI.
     */
    function saveAndRender() {
        saveTasks();
        renderTasks();
        updateDashboard();
    }

    /**
     * Saves all current tasks to Local Storage.
     */
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(taskItem => {
            const text = taskItem.querySelector('.task-text').innerText;
            const completed = taskItem.classList.contains('completed');
            const dueDate = taskItem.dataset.dueDate || null;

            tasks.push({
                text,
                completed,
                dueDate
            });
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }

    /**
     * Loads tasks from Local Storage and initializes the dashboard.
     */
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (tasks) {
            taskList.innerHTML = ''; // Clear the list before loading
            tasks.forEach(task => addTask(task.text, task.completed, task.dueDate));
        }
        saveAndRender();
    }

    /**
     * Updates all dashboard components: stats and progress bar.
     */
    function updateDashboard() {
        const taskItems = document.querySelectorAll('.task-item');
        const totalTasks = taskItems.length;
        const completedTasks = document.querySelectorAll('.task-item.completed').length;
        const remainingTasks = totalTasks - completedTasks;

        // Update Stats
        totalTasksStat.textContent = totalTasks;
        completedTasksStat.textContent = completedTasks;
        remainingTasksStat.textContent = remainingTasks;

        // Update Progress Bar
        const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
    }

    /**
     * Filters and displays tasks in the DOM based on the currentFilter state.
     * Also handles the visibility of the empty state message.
     */
    function renderTasks() {
        const tasks = taskList.querySelectorAll('.task-item');
        let visibleTasksCount = 0;

        // Filter visibility
        tasks.forEach(task => {
            const isCompleted = task.classList.contains('completed');
            let showTask = false;

            switch (currentFilter) {
                case 'active':
                    if (!isCompleted) showTask = true;
                    break;
                case 'completed':
                    if (isCompleted) showTask = true;
                    break;
                default: // 'all'
                    showTask = true;
                    break;
            }

            task.style.display = showTask ? 'flex' : 'none';
            if (showTask) {
                visibleTasksCount++;
            }
        });

        // Update empty state message
        const totalTasks = tasks.length;
        if (totalTasks === 0) {
            emptyStateMessage.textContent = 'No tasks yet. Add one to get started!';
            emptyStateMessage.style.display = 'block';
        } else if (visibleTasksCount === 0) {
            switch (currentFilter) {
                case 'active':
                    emptyStateMessage.textContent = 'No active tasks. Great job!';
                    break;
                case 'completed':
                    emptyStateMessage.textContent = 'No tasks completed yet.';
                    break;
            }
            emptyStateMessage.style.display = 'block';
        } else {
            emptyStateMessage.style.display = 'none';
        }
    }
});