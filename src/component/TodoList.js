import React from 'react';
import './css/Todo.css';

const TodoList=()=>{
    return (
        
        <div className="main-container">
            <div className='title'>
                <h2>My Todo</h2>
            </div>
            <div className="todo-input">
                <div className='todo-first'>
                    <div className="todo-input-field">
                        <label>Title</label>
                        <input type="text" placeholder="Enter the title of the task"/>
                    </div>
                    <div className="todo-input-field">
                        <label>Category</label>
                        <input type="text" placeholder="Enter the category"/>
                    </div>
                </div>
                
                <div className="todo-input-field">
                    <label>Description</label>
                    <input type="textarea" placeholder="Enter the description"/>
                </div>
                <div className='todo-second'>
                    <div className="todo-input-fields">
                        <label>Date</label>
                        <input type="date" placeholder="Select the Date"/>
                    </div>
                    <div className='button'>
                        <button type='submit'>Add Task</button>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default TodoList;