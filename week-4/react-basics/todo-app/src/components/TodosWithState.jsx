import { useState } from 'react';

const TodosWithState = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState({
        id: Date.now(), 
        title: "",
        description: ""
    });

    function handleChange(e) {
        const { value, name } = e.target;
        setTodo({
            ...todo,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setTodos(prev => [...prev, todo]);
        setTodo({ id: Date.now(), title: "", description: "" }); 
    }

    function handleDelete(id) {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    }

    function handleUpdate(id) {
        const newTitle = prompt("Enter your new title")
        const newDescription = prompt("Enter new deacription")

        const updatedTodos = todos.map(todo => {
            if(todo.id === id) {
                todo.title = newTitle
                todo.description = newDescription
            }
            return todo;
        })

        setTodos(updatedTodos)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={todo.title} onChange={handleChange} /> <br /> <br />
                <input type="text" name="description" value={todo.description} onChange={handleChange} /> <br /> <br />
                <button type='submit'>submit</button>
            </form>

            {todos && todos.map((todo) => {
                return (
                    <div className='todoStyle' key={todo.id}>
                        <p>{todo.title}</p>
                        <p>{todo.description}</p>
                        <button onClick={() => handleUpdate(todo.id)}>Update</button>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                )
            })}
        </>
    )
}

export default TodosWithState;
