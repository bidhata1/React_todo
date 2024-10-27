import React from 'react';
import TaskData from './TaskData';

const TaskTable = ({ tasks, onEdit, onDelete, onToggle }) => {
    return (
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
                            <TaskData key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskTable;

