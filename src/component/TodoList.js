import React, {useState, useEffect} from 'react';
import './css/Todo.css';
import TaskTable from './TaskTable';
import TaskForm from './TaskForm';


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
  if (storedTasks && storedTasks.length > 0) {
    setTasks(storedTasks);  // Set tasks if found in localStorage
  }
}, []);

// Save tasks to localStorage whenever tasks change
useEffect(() => {
 
    localStorage.setItem('tasks', JSON.stringify(tasks));
  
}, [tasks]);

    //Function to handle ading a new task
    const handleSubmit=(e)=>{
      
      const { title, category, description, date, editTaskId } = taskData;

      if (!title || !category || !description || !date) {
        alert('Please fill out all fields.');
        return;
      }
  
      if (editTaskId) {
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId
            ? { ...task, title, category, description, date }
            : task
        );
        setTasks(updatedTasks);
        setTaskData({ title: '', category: '', description: '', date: '', editTaskId: null });
      } else {
        const newTask = {
          id: Date.now(), // Use a unique ID based on timestamp
          title,
          category,
          description,
          date,
          completed: false,
        };
        setTasks([...tasks, newTask]);
        setTaskData({ title: '', category: '', description: '', date: '', editTaskId: null });
      }
    };
  
    const deleteTask = (id) => {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    };
  
    const editTask = (task) => {
      setTaskData({
        title: task.title,
        category: task.category,
        description: task.description,
        date: task.date,
        editTaskId: task.id,
      });
    };
  
    const toggleCompletion = (id) => {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedTasks);
    };

    return (
        <div className='main'>
        <div className="main-container">
            <div className='title'>
                <h2>My Todo</h2>
            </div>
            
            <TaskForm taskData={taskData} setTaskData={setTaskData} onSubmit={handleSubmit} />
            </div>
            <div className="task-list-container">
            <TaskTable tasks={tasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleCompletion} />
            </div>
            


        </div>
    );
};
export default TodoList;