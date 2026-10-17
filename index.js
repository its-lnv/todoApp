let todos = []

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const completeCount = document.querySelector("#complete-count")
const cancelEditBtn = document.querySelector("#cancel-edit")
let editTodoId = null;

function renderTodo() {
    todoList.textContent = ""
    todos.forEach((todo) => {
        const li = document.createElement("li")
        li.dataset.id = todo.id
        li.className = "flex font-medium border border-slate-300 p-3 rounded-lg hover:bg-gray-50"
        li.innerHTML = `
                    <div class="flex flex-1 gap-2 items-center">
                        <input data-action="toggle" ${todo.isCompleted ? "checked" : ""} class="accent-indigo-500 hover:cursor-pointer h-4 w-4" type="checkbox" name="checkbox">
                        <p class="${todo.isCompleted ? "line-through text-slate-300" : ""} text-gray-500">${todo.text}</p>
                    </div>
                    <div class="flex gap-2">
                        <button data-action="edit" class="hover:cursor-pointer text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md hover:bg-amber-100 hover:scale-105 transition-all duration-200 tracking-wide">Edit</button>
                        <button data-action="delete" class="hover:cursor-pointer text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md hover:bg-pink-100 hover:scale-105 transition-all duration-200 tracking-wide">Delete</button>
                    </div>`
        todoList.append(li)
    })
    taskCount.textContent = `TASKS (${todos.length})`
    completeCount.textContent = `COMPLETED (${todos.filter(todo => todo.isCompleted).length})`
}
renderTodo()

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== Number(id))
    renderTodo()  // update in frontend
}

function editTodo(id) {
    editTodoId = id;
    let currentTodo = todos.find(todo => {
        if (todo.id === Number(id)) {
            return todo
        }
    })
    todoInput.value = currentTodo.text
    formBtn.textContent = "Update"
    formBtn.className = "px-5 py-2 bg-amber-600 rounded-md text-white font-medium hover:cursor-pointer"
    cancelEditBtn.classList.remove("hidden");
}

function checkbox(id) {
    todos = todos.map(todo => {
        if (todo.id === Number(id)) {
            return {
                ...todo,
                isCompleted: !todo.isCompleted
            }
        }
        return todo;
    })
    renderTodo()
    console.log(todos);

}

function cancelEdit() {
    editTodoId = null
    todoInput.value = ""
    cancelEditBtn.classList.add("hidden")
    console.log("a");
    formBtn.textContent = "Add"
    formBtn.className ="px-5 py-2 bg-indigo-500 rounded-md text-white font-medium hover:cursor-pointer"
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let todoValue = todoInput.value.trim()

    if (!todoValue) {
        return;
    }

    if (editTodoId) {
        todos = todos.map(todo => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo;
        })

        todoInput.value = ""
        editTodoId = ""
        formBtn.textContent = "Add"
        formBtn.setAttribute("class", "px-5 py-2 bg-indigo-500 rounded-md text-white font-medium hover:cursor-pointer")
    } else {
        const newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }
        todos.push(newTodo)
        todoInput.value = ""
    }
    cancelEditBtn.classList.add("hidden");
    renderTodo()  // update in frontend

})

todoList.addEventListener('click', (e) => {
    let li = e.target.closest("li")
    let id = li?.dataset.id
    let action = e.target.dataset.action

    if (action === "delete") {
        deleteTodo(id)
    }

    if (action === "edit") {
        editTodo(id)
    }

    if (action === "toggle") {
        checkbox(id)
    }
})

cancelEditBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    cancelEdit()
})