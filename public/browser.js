const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// load data from /api/tasks
const showtask = async () => await fetch('/api/v1/tasks')
    .then((response) => response.text())
    .then((result) => {
        loadingDOM.style.visibility = 'visible'
        try {
            const tasks = JSON.parse(result);
            // console.log(tasks.length);
            if (tasks.length < 1) {
                tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
                loadingDOM.style.visibility = 'hidden'
                return
            }
            const allTasks = tasks
                .map((task) => {
                    const { completed, _id: taskID, name } = task
                    return `<div class="single-task ${completed && 'task-completed'}">
    <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
    <div class="task-links">
    
    
    
    <!-- edit link -->
    <a href="task.html?id=${taskID}"  class="edit-link">
    <i class="fas fa-edit"></i>
    </a>
    <!-- delete btn -->
    <button type="button" class="delete-btn" data-id="${taskID}">
    <i class="fas fa-trash"></i>
    </button>
    </div>
    </div>`
                })
                .join('')
            tasksDOM.innerHTML = allTasks
        } catch (error) {
            tasksDOM.innerHTML =
            '<h5 class="empty-list">There was an error, please try later....</h5>'
        }
        loadingDOM.style.visibility = 'hidden'
    });
showtask();


// Delete task

tasksDOM.addEventListener('click', async (e) => {
    const el = e.target
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: null
    }
    if (el.parentElement.classList.contains('delete-btn')) {
      loadingDOM.style.visibility = 'visible'
      const id = el.parentElement.dataset.id
      try {
        const tasks=await fetch(`/api/v1/tasks/${id}`,options)
        showtask()
      } catch (error) {
        console.log(error)
      }
    }
    loadingDOM.style.visibility = 'hidden'
  })





formDOM.addEventListener('submit', async (e) => {
    e.preventDefault()
    const name = taskInputDOM.value
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify({name})
    }
  
    try {
      const tasks=await fetch('/api/v1/tasks',options)
      showtask()
      taskInputDOM.value = ''
      formAlertDOM.style.display = 'block'
      formAlertDOM.textContent = `success, task added`
      formAlertDOM.classList.add('text-success')
    } catch (error) {
      formAlertDOM.style.display = 'block'
      formAlertDOM.innerHTML = `error, please try again`
    }
    setTimeout(() => {
      formAlertDOM.style.display = 'none'
      formAlertDOM.classList.remove('text-success')
    }, 3000)
  })
  