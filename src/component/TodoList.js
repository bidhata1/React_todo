import React, {useState, useEffect} from 'react';
import './css/Todo.css';


const TodoList=()=>{
    //group state for input fields and task editing
    const[taskData, setTaskData]=useState({
      title:'',
      category:'',
      description:'',
      date:'',
      editTaskId:null,
    });

    //state to store the list of tasks
    const[tasks,setTasks]=useState([]);

// Load tasks from localStorage when the component mounts
useEffect(() => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (storedTasks) {
    setTasks(storedTasks);  // Set tasks if found in localStorage
  }
}, []);

// Save tasks to localStorage whenever tasks change
useEffect(() => {
  if (tasks.length > 0) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}, [tasks]);

    //Function to handle ading a new task
    const handleSubmit=(e)=>{
        e.preventDefault();
    
        const{title, category,description,date,editTaskId}=taskData;

        if (!title || !category || !description || !date) {
            alert('Please fill out all fields.');
            return;
        }

        if (editTaskId) {
            // If we are editing an existing task
            const updatedTasks = tasks.map((task) =>
              task.id === editTaskId
                ? { ...task, title, category, description, date }
                : task
            );
            setTasks(updatedTasks);
            setTaskData({title:'',category:'', description:'',date:'',editTaskId:null});
          } else {
            // Create new task object
            const newTask = {
              id: tasks.length + 1, // Unique ID
              title,
              category,
              description,
              date,
              completed:false,
            };
      
            // Add the new task to the task array
            setTasks([...tasks, newTask]);
            setTaskData({ title: '', category: '', description: '', date: '', editTaskId: null });
        }
    };
      
        // Function to delete a task
        const deleteTask = (id) => {
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };
      
        // Function to edit a task
        const editTask = (task) => {
          setTaskData({
            title:task.title,
            category:task.category,
            description:task.description,
            date:task.date,
            editTaskId:task.id,
          });
        };
        const toggleCompletion = (id) => {
          const updatedTasks = tasks.map((task) =>
              task.id === id ? { ...task, completed: !task.completed } : task
          );
          setTasks(updatedTasks);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
      };
      

    return (
        <div className='main'>
        <div className="main-container">
            <div className='title'>
                <h2>My Todo</h2>
            </div>
            <form className="todo-input" onSubmit={handleSubmit}>
                <div className='todo-first'>
                    <div className="todo-input-field">
                        <label>Title</label>
                        <input type="text" placeholder="Enter the title of the task" value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}/>
                    </div>
                    <div className="todo-input-field">
                        <label>Category</label>
                        <input type="text" placeholder="Enter the category" value={taskData.category}
              onChange={(e) => setTaskData({...taskData, category: e.target.value})} />
                    </div>
                </div>
                
                <div className="todo-input-field">
                    <label>Description</label>
                    <input type="textarea" placeholder="Enter the description" value={taskData.description}
            onChange={(e) => setTaskData({...taskData,description: e.target.value})}/>
                </div>
                <div className='todo-second'>
                    <div className="todo-input-fields">
                        <label>Date</label>
                        <input type="date" placeholder="Select the Date"  value={taskData.date}
              onChange={(e) => setTaskData({...taskData, date: e.target.value})} // Update date state
            />
                    </div>
                    <div className='button'>
                    <button type='submit'>{taskData.editTaskId ? 'Update Task' : 'Add Task'}</button>
                    </div>
                </div>

            </form>
            </div>

{/* Display the list of tasks */}
<div className="task-list">
  <h3>Task List</h3>
  {tasks.length === 0 ? (
    <p>No tasks added yet.</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Completed</th>
          <th>Title</th>
          <th>Category</th>
          <th>Description</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <input type="checkbox" checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}/>
            </td>
            <td>{task.title}</td>
            <td>{task.category}</td>
            <td>{task.description}</td>
            <td>{task.date}</td>
            <td>
              <button onClick={() => editTask(task)}>Edit</button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

        </div>
    );
};
export default TodoList;