import React from 'react';

const TaskForm = ({ taskData, setTaskData, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskData.title || !taskData.category || !taskData.description || !taskData.date) {
            alert('Please fill out all fields.');
            return;
        }
        onSubmit(taskData);
    };

    return (
        <form className="todo-input" onSubmit={handleSubmit}>
            <div className='todo-first'>
                <div className="todo-input-field">
                    <label>Title</label>
                    <input type="text" placeholder="Enter the title" value={taskData.title}
                           onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
                </div>
                <div className="todo-input-field">
                    <label>Category</label>
                    <input type="text" placeholder="Enter the category" value={taskData.category}
                           onChange={(e) => setTaskData({ ...taskData, category: e.target.value })} />
                </div>
            </div>
            <div className="todo-input-field">
                <label>Description</label>
                <input type="textarea" placeholder="Enter the description" value={taskData.description}
                       onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
            </div>
            <div className='todo-second'>
                <div className="todo-input-fields">
                    <label>Date</label>
                    <input type="date" value={taskData.date}
                           onChange={(e) => setTaskData({ ...taskData, date: e.target.value })} />
                </div>
                <div className='button'>
                    <button type='submit'>{taskData.editTaskId ? 'Update Task' : 'Add Task'}</button>
                </div>
            </div>
        </form>
    );
};

export default TaskForm;
