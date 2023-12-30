import { todos } from '../config/todos';

function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  const todo = {
    id: Date.now(),
    title: title,
    description: description
  };

  todos.push(todo);
  updateTodosUI();
}

function updateTodo(id, updatedTodo) {
  const todoToUpdate = todos.find(todo => todo.id === id);

  if (todoToUpdate) {
    todoToUpdate.title = updatedTodo.title;
    todoToUpdate.description = updatedTodo.description;
    updateTodosUI();
  }
}
function deleteTodo(id) {
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if(todoIndex !== -1) {
    todos.splice(todoIndex, 1)
  }
  updateTodosUI()
}
function updateTodosUI() {
  const todosContainer = document.getElementById("todos");
  todosContainer.innerHTML = '';

  todos.forEach(todo => {
    const todoDiv = document.createElement('div');
    todoDiv.setAttribute('key', todo.id);

    const todoTitle = document.createElement('p');
    todoTitle.textContent = todo.title;

    const todoDescription = document.createElement('p');
    todoDescription.textContent = todo.description;

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      deleteTodo(todo.id)
    }
    updateButton.onclick = () => {
      const updatedTitle = prompt('Enter updated title:', todo.title);
      const updatedDescription = prompt('Enter updated description:', todo.description);
      updateTodo(todo.id, { title: updatedTitle, description: updatedDescription });
    };
    todoDiv.classList.add('todoStyle')
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDescription);
    todoDiv.appendChild(updateButton);
    todoDiv.appendChild(deleteBtn);

    todosContainer.appendChild(todoDiv);
  });
}


const TodosWithJS = ({todos}) => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
            <input type="text" id="title" /> <br /> <br />
            <input type="text" id="description" /> <br /> <br />
            <button onClick={addTodo}>submit</button>
          </form>
        <div id="todos"></div>
    </>
  )
}

export default TodosWithJS;