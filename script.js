document.addEventListener('DOMContentLoaded', function(){
    loadTasks();
    loadCategories();
});



function loadCategories(){
    const tasks=JSON.parse(localStorage.getItem('tasks'))||[];
    const categoriesSet=new Set(tasks.map(task=>task.category));
    const filterCategorySelect=document.getElementById('filterCategory');

    filterCategorySelect.innerHTML='<option value="">All</option>';
    categoriesSet.forEach(category=>{
        const option=document.createElement('option');
        option.value=category;
        option.textContent=category;
        filterCategorySelect.appendChild(option);
    });
}

function filterTasks(){
    const filterCategorySelect=document.getElementById('filterCategory');
    const selectedCategory=filterCategorySelect.value;

    const tasks=JSON.parse(localStorage.getItem('tasks'))||[];
    const filteredTasks=selectedCategory ? tasks.filter(task => task.category===selectedCategory):tasks;
    displayTasks(filteredTasks);
}

function displayTasks(tasks){
    const tasklist=document.getElementById('task-list');
    tasklist.innerHTML='';
    //const allTask=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task)=>{
       // const realIndex=allTask.findIndex(t=> t === task);
        addTaskToDOM(task);
    });
}

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
    const taskCategoryInput=document.getElementById('taskCategory');
    const taskCategory=taskCategoryInput.value.trim();
    if (taskText!= "" && taskCategory!=''){
        //obtiene tareas del almacenamiento local
        const tasks=JSON.parse(localStorage.getItem('tasks'))|| [];
        const taskID=Date.now();
        //agregar nueva tarea
        tasks.push({id:taskID,text:taskText, completed:false, category:taskCategory});

        
        //guardar tareas en almacenamiento local
        localStorage.setItem('tasks', JSON.stringify(tasks));

        //limpiar input
        newTaskInput.value='';
        taskCategoryInput.value='';

        //recargar todas las tareas
        loadTasks();
        loadCategories();
    }
}

    function toggleTask(id){
        const tasks=JSON.parse(localStorage.getItem('tasks'))|| [];

        const task=tasks.find(t =>t.id === id);
        //cambiar estado de tarea completada
        

        if (task){
            task.completed=!task.completed;

            //guardar tareas actualizadas en local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        filterTasks();
        //toggleTheme();

        }
        
        
    }

    function deleteTask(id){
        let tasks=JSON.parse(localStorage.getItem('tasks')) || [];

        //delete task
        tasks=tasks.filter(task=> task.id !==id);
        //tasks.splice(index,1);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        loadTasks();
        loadCategories();
    }

    function addTaskToDOM(task){
        const tasklist = document.getElementById('task-list');
        const listItem = document.createElement('li');
        listItem.innerHTML=`<input type="checkbox" ${task.completed ? 'checked' : ''} onChange="toggleTask(${task.id})">
        <span class="${task.completed ? 'completed':''}"> ${task.text}</span>
        <span class="category">${task.category}</span>
        <button onClick="deleteTask(${task.id})">Delete</button>
        `;

        tasklist.appendChild(listItem);
    }

    function toggleTheme(){
        document.body.classList.toggle('dark-mode');
        const buttons= document.querySelectorAll('button');
        buttons.forEach(button =>{
            button.style.backgroundColor=getComputedStyle(document.body).getPropertyValue('--button-background');
            button.style.color=getComputedStyle(document.body).getPropertyValue('--button-color');
        })
    }

