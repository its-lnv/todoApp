# Todo App — JavaScript CRUD Project

A simple and interactive **Todo App** built using **HTML, JavaScript, and Tailwind CSS**. This is my first JavaScript project, created to learn how JavaScript integrates with an HTML website and how to implement CRUD operations on the frontend.

Users can add tasks, view their task list, edit existing tasks, delete tasks, and mark tasks as completed.

## ✨ Features

- **Create tasks:** Add a task using the input field.
- **Read tasks:** Display all tasks in the task list.
- **Update tasks:** Edit an existing task and save the updated text.
- **Delete tasks:** Remove a task from the list.
- **Mark as completed:** Toggle a task's completion status using a checkbox.
- **Task counter:** Shows the total number of tasks.
- **Completed counter:** Shows how many tasks are marked as completed.
- **Edit cancellation:** Cancel editing and return to adding new tasks.
- **Responsive layout:** Uses Tailwind CSS utility classes to create a clean, centered interface.
- **Dynamic rendering:** Updates the task list and counters without reloading the page.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Defines the structure of the application |
| JavaScript (Vanilla JS) | Implements task operations, event handling, state updates, and dynamic rendering |
| Tailwind CSS | Styles the interface using utility classes |
| DOM API | Selects elements, creates task items, and updates the page |

Tailwind CSS is loaded in `index.html` using its browser CDN. The project does not require a JavaScript framework such as React.

## 📁 Project Structure

```text
todo-app/
├── index.html          # HTML structure and Tailwind CSS CDN
├── index.js            # Todo functionality and CRUD operations
├── tailwind.config.js  # Tailwind CSS editor suggestions/configuration
└── README.md           # Project documentation
```

> **Note:** The current `index.html` loads Tailwind using `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`. The `tailwind.config.js` file is not referenced by the HTML and is not required for this browser-CDN setup. Depending on your editor setup, it may be useful for suggestions, but it does not itself generate CSS in this project.

## 🚀 Getting Started

### Requirements

- A modern web browser
- A code editor such as Visual Studio Code
- Internet access for loading Tailwind CSS from the CDN

### Run locally

1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` directly in your browser, or use the **Live Server** extension in VS Code.
4. Start adding, editing, completing, and deleting tasks.

No `npm install` or build command is needed for the current setup.

## 🧠 How It Works

### 1. HTML structure — `index.html`

The HTML file provides the application's layout:

- A header displaying **Todo App**
- A form containing the task input and Add button
- A Cancel Editing button that appears during edit mode
- Counters for total and completed tasks
- An unordered list (`ul`) where JavaScript renders the tasks
- A script tag that loads `index.js`

Important element IDs used by JavaScript:

| ID | Purpose |
|---|---|
| `todo-form` | Handles adding and updating tasks |
| `todo-input` | Receives the task text |
| `todo-list` | Holds the rendered task items |
| `form-btn` | Changes between Add and Update |
| `task-count` | Displays the total task count |
| `complete-count` | Displays the completed task count |
| `cancel-edit` | Cancels the current edit operation |

### 2. JavaScript logic — `index.js`

#### Task data

The application starts with an empty array:

```javascript
let todos = [];
```

Each task is represented by an object with three properties:

```javascript
{
    id: Date.now(),
    text: "Study JavaScript",
    isCompleted: false
}
```

- `id`: A value used to identify a task.
- `text`: The task description.
- `isCompleted`: Whether the task is marked as completed.

The array is the application's current in-memory state.

#### DOM selection

`document.querySelector()` selects the HTML elements that JavaScript needs to work with. These references are stored in variables so the code can read input, listen for events, and update the interface.

#### Rendering tasks — `renderTodo()`

The `renderTodo()` function:

1. Clears the current contents of the task list.
2. Loops through the `todos` array.
3. Creates an `<li>` for each task.
4. Adds a checkbox, task text, Edit button, and Delete button.
5. Updates the total and completed counters.

It is called after relevant changes so the interface reflects the current array state.

#### Create — adding a task

When the form is submitted:

1. `event.preventDefault()` prevents the browser's default form submission and page reload.
2. The input is trimmed to remove extra whitespace.
3. Empty task descriptions are ignored.
4. A new task object is created with a unique-looking timestamp ID and `isCompleted: false`.
5. The task is added to the `todos` array.
6. The input is cleared and the list is rendered again.

#### Read — displaying tasks

The `renderTodo()` function reads the task objects in `todos` and displays them in the page. The counters are calculated from the same array.

#### Update — editing a task

When Edit is clicked:

1. `editTodo(id)` finds the selected task.
2. Its current text is placed in the input field.
3. `editTodoId` stores the ID of the task being edited.
4. The form button changes from **Add** to **Update**.
5. The **Cancel Editing** button becomes visible.

When the form is submitted in edit mode, `map()` creates an updated array in which the selected task has the new text. The task's other properties are preserved using the spread syntax (`...todo`). Cancel Editing clears the edit state without saving a change.

#### Delete — removing a task

`deleteTodo(id)` uses `filter()` to create an array without the selected task, then calls `renderTodo()` to refresh the list.

#### Toggle completion

When a checkbox is clicked, `checkbox(id)` uses `map()` to find the selected task and flip its `isCompleted` value. The UI then updates to show the completion style and refresh the completed counter.

### 3. Event delegation

Instead of attaching a separate click listener to every task's buttons and checkbox, the code attaches one listener to `todoList`.

The clicked element's `data-action` attribute identifies the requested action:

- `data-action="edit"`
- `data-action="delete"`
- `data-action="toggle"`

The closest `<li>` provides the task ID through `data-id`. This approach is called **event delegation** and works with task elements created dynamically.

## 🔄 CRUD Operations Summary

| Operation | Function / Logic | Result |
|---|---|---|
| Create | Form submit handler and `todos.push()` | Adds a new task |
| Read | `renderTodo()` | Displays tasks |
| Update | `editTodo()` and form submit handler using `map()` | Updates task text |
| Delete | `deleteTodo()` using `filter()` | Removes a task |
| Extra | `checkbox()` using `map()` | Toggles completion status |

## 📚 What I Learned

Through this project, I practised:

- Integrating JavaScript with an HTML website
- Selecting and manipulating DOM elements
- Handling form submissions and click events
- Preventing default browser form behavior
- Creating HTML elements dynamically
- Using arrays and objects to represent application data
- Implementing CRUD operations
- Using `map()`, `filter()`, `find()`, `forEach()`, and `push()`
- Using arrow functions, template literals, and the spread syntax
- Managing edit mode with a state variable (`editTodoId`)
- Using event delegation and `data-*` attributes
- Updating the UI and counters after changes
- Styling a page with Tailwind CSS utility classes

## ⚠️ Current Limitations

- **No persistent storage:** Tasks are stored only in the JavaScript array. Refreshing the page resets the list.
- **No backend or database:** All task operations happen in the browser.
- **Tailwind CDN dependency:** The page needs internet access to load Tailwind CSS.
- **Basic validation:** Empty or whitespace-only tasks are ignored, but more advanced validation is not implemented.
- **Timestamp-based IDs:** `Date.now()` is used as the task ID. It is usually sufficient for this small project, though a dedicated ID strategy can be more robust in larger applications.

## 🔮 Possible Future Improvements

- Save tasks in `localStorage` so they remain after refresh.
- Add filters for All, Active, and Completed tasks.
- Add a button to clear completed tasks.
- Add due dates and task priorities.
- Improve keyboard accessibility and feedback messages.
- Move from the browser CDN to a build-based Tailwind CSS setup if the project grows.

These are potential enhancements and are not part of the current implementation.

## 👨‍💻 About the Project

This project is a hands-on step in my JavaScript learning journey. It helped me understand how JavaScript connects with HTML, handles user interactions, updates the DOM, and manages CRUD operations on frontend data.

---

**Built with HTML, Vanilla JavaScript, and Tailwind CSS.**
