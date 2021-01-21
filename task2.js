let tarefas = [];
function createLi(tarefa) {
    let li = document.createElement('li');
    li.classList.add('remove');
    li.innerHTML = tarefa;
    li.onclick = (li) => {
        let index = tarefas.findIndex(tarefa => tarefa == li.target.innerHTML);
        if(index > -1) {
            tarefas.splice(index, 1);
            localStorage.setItem('tarefas', tarefas);
        }
        li.target.remove();
    };

    return li;
}

document.addEventListener('DOMContentLoaded', function() {
    let formulario = document.querySelector('#formulario');
    let tasks = document.querySelector('#tasks');
    let task = document.querySelector('#task');
    let button = document.querySelector('#submit');

    if(localStorage.getItem('tarefas').length) {
        tarefas = localStorage.getItem('tarefas');
        tarefas = tarefas.split(',');

        tarefas.forEach(tarefa => {
            let li = createLi(tarefa);
            tasks.append(li);
        });
    }
    
    if(task.value) {
        button.disabled = false;
    } else {
        button.disabled = true;
    }
    
    task.onkeyup = () => {
        if(task.value && task.value.length) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }
    
    formulario.onsubmit = () => {
        let li = createLi(task.value);

        tarefas.push(task.value);
        localStorage.setItem('tarefas', tarefas);

        tasks.append(li);
        task.value = '';
        button.disabled = true;
        return false;
    }
});