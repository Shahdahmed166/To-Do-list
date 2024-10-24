document.querySelector('#push').onclick = function () {
    if (document.querySelector('#content input').value.length == 0) {
        alert(" Enter Task Name!!!!")
    }
    else {
        document.querySelector('#lists').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#content input').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        var current_lists = document.querySelectorAll(".delete");
        for (var i = 0; i < current_lists.length; i++) {
            current_lists[i].onclick = function () {
                this.parentNode.remove();
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
    document.querySelector('#push').onclick = function () {
        if (document.querySelector('#content input').value.length == 0) {
            alert(" Enter Task Name!!!!");
        } else {
            let taskName = document.querySelector('#content input').value;
            addTask(taskName);
            saveTask(taskName);
            document.querySelector('#content input').value = "";
        }
    };
    function addTask(taskName) {
        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        let taskSpan = document.createElement('span');
        taskSpan.id = 'taskname';
        taskSpan.textContent = taskName;

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.onclick = function () {
            this.parentNode.remove();
            removeTask(taskName);
        };

        taskContainer.appendChild(taskSpan);
        taskContainer.appendChild(deleteButton);
        document.querySelector('#lists').appendChild(taskContainer);
    }

    function saveTask(taskName) {
        let lists = JSON.parse(localStorage.getItem('lists')) || [];
        lists.push(taskName);
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    function loadTasks() {
        let lists = JSON.parse(localStorage.getItem('lists')) || [];
        lists.forEach(taskName => {
            addTask(taskName);
        });
    }

    function removeTask(taskName) {
        let lists = JSON.parse(localStorage.getItem('lists')) || [];
        lists = lists.filter(task => task !== taskName);
        localStorage.setItem('lists', JSON.stringify(lists));
    }
});
