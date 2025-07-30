import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
    const [text, setText] = useState('');
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/todos");
                setTodos(res.data);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);


    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const markAsComplete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/todos/${id}/status`);
            const res = await axios.get("http://localhost:5000/api/todos");
            setTodos(res.data);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleEdit = (todo) => {
        setText(todo.text);
        setEditId(todo._id);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        try {
            if (editId) {
                // Update      
                await axios.put(`http://localhost:5000/api/todos/${editId}`, { text });
                const res = await axios.get("http://localhost:5000/api/todos");
                setTodos(res.data);
                setEditId(null);
            } else {
                // Add
                await axios.post("http://localhost:5000/api/todos/add", { text });
                const res = await axios.get("http://localhost:5000/api/todos");
                setTodos(res.data);
            }
            setText("");
        } catch (error) {
            console.error("Error saving todo:", error);
        }
    };

    return (
        <div className="todo-list">
            <form className="todo-form" onSubmit={handleSubmit}>
                <h3>Add Todo</h3>
                <input type="text" placeholder="Add a new todo" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={handleSubmit}>{editId ? "Update" : "Add"}</button>
            </form>

            <div className="todo-items">
                <h4>All Todos</h4>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            <span>{todo.text}</span>
                            <div className="actions">
                                <button className="complete" onClick={() => markAsComplete(todo._id)}>Complete</button>
                                <button className="edit" onClick={() => handleEdit(todo)}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
