import { todos } from './';  
const backendUrl = 'http://localhost:3001';
const todosInstance = new todos(backendUrl);
const list = document.querySelector('ul');
const input = document.querySelector('input');
input.disabled = true;

const renderTask = (task) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    li.setAttribute('data-key', task.getId().toString());
    li.innerHTML = task.getText();
    renderSpan(li, task.getText());
    renderLink(li, task.getId());
    list.appendChild(li);
}

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'));
    span.innerHTML = text;
}

const renderLink = (li, id) => { 
    const a = li.appendChild(document.createElement('a'));
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style', 'float:right');
    a.addEventListener('click', (event) => {
        todosInstance.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key="${removed_id}"]`);
            if (li_to_remove) {
                list.removeChild(li_to_remove);
            }
        }).catch((error) => {
            alert(error);
        });
    });
}

const getTasks = async () => {
    todosInstance.tasks.then((tasks) => {
        tasks.forEach(task => {
            renderTask(task);
        });
        input.disabled = false;
    }).catch((error) => {
        alert(error);
    });
}

const saveTask = async (task) => {  
    try {
        const json = JSON.stringify({ description: task });
        const response = await fetch(backendUrl + '/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        return await response.json();
    } catch (error) {
        alert('Error saving task: ' + error.message);
    }
}

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const task = input.value.trim();
        if (task !== '') {
            todosInstance.addTask(task).then((task) => {
                renderTask(task);
                input.value = '';
                input.focus();
            });
        }
    }
});

getTasks();
