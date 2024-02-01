document.addEventListener('DOMContentLoaded', function(){
    loadTasks();
});

function loadTasks(){
    const taskList=document.getElementById('task-list');
    taskList.innerHTML=''; // clean list before loading tasks

    //load tasks from localStorage
    const tasks=JSON.parse(localStorage.getItem('tasks'))||[];

    tasks.forEach((task,index)=>{
        addTaskToDOM(task,index);
    });
}

function addTask(){
    const newTaskInput=document.getElementById('newTask');
    const taskText=newTaskInput.value.trim();
    if (taskText!= ""){
        //obtiene tareas del almacenamiento local
        const tasks=JSON.parse(localStorage.getItem('tasks'))|| [];

        //agregar nueva tarea
        tasks.push({text:taskText, completed:false});

        //guardar tareas en almacenamiento local
        localStorage.setItem('tasks', JSON.stringify(tasks));

        //limpiar input
        newTaskInput.value='';

        //recargar todas las tareas
        loadTasks();
    }
}

    function toggleTask(index){
        const tasks=JSON.parse(localStorage.getItem('tasks'))|| [];

        //cambiar estado de tarea completada
        tasks[index].completed=!tasks[index].completed;

        //guardar tareas actualizadas en local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadTasks();
    }

    function deleteTask(index){
        const tasks=JSON.parse(localStorage.getItem('tasks')) || [];

        //delete task
        tasks.splice(index,1);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadTasks();
    }

    function addTaskToDOM(task,index){
        const tasklist = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.innerHTML=`<input type="checkbox" ${task.completed ? 'checked' : ''} onChange="toggleTask(${index})">
        <span class="${task.completed ? 'completed':''}"> ${task.text}</span>
        <button onClick="deleteTask(${index})">Delete</button>
        `;

        tasklist.appendChild(listItem);
    }

