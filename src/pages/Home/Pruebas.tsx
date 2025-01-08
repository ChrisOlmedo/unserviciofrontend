import { useReducer, useState } from 'react';

// Definir los tipos de datos
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'DELETE_TODO'; payload: number };

const initialState: Todo[] = [
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Estudiar useReducer con TypeScript', completed: false },
];

function reducer(state: Todo[], action: Action): Todo[] {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, { id: Date.now(), text: action.payload, completed: false }];
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
            );
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload);
        default:
            return state;
    }
}

export default function TodoApp() {
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [a, setA] = useState("Introduce texto");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setA(e.target.value);
    }

    const addTodo = (text: string): void => {
        dispatch({ type: 'ADD_TODO', payload: text });
    };

    const toggleTodo = (id: number): void => {
        dispatch({ type: 'TOGGLE_TODO', payload: id });
    };

    const deleteTodo = (id: number): void => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    return (
        <div>
            <h1>Lista de Tareas</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                        <button onClick={() => toggleTodo(todo.id)}>Completado</button>
                        <button onClick={() => deleteTodo(todo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <h2>Agregar Tarea</h2>
            <label >Nombre de la Tarea:</label>
            <input type="text" id="fname" name="fname" placeholder={a} onChange={handleChange} />
            <button onClick={() => addTodo(a)}>Subir</button>
        </div>
    );
}
