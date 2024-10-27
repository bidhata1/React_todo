import React from 'react';

const TaskData = ({ task, onEdit, onDelete, onToggle }) => {
    return (
        <tr>
            <td>
                <input type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
            </td>
            <td>{task.title}</td>
            <td>{task.category}</td>
            <td>{task.description}</td>
            <td>{task.date}</td>
            <td>
                <div className='button-group'>
                    <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>
                    <button className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default TaskData;
