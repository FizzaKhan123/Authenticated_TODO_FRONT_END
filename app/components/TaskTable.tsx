'use client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TASK_TYPE } from '../Types/type'; 

interface TaskTableProps {
    tasks: TASK_TYPE[];
    onEdit: (task: TASK_TYPE) => void;
    onDelete: (id: string) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-6 py-3 border-b">Title</th>
                        <th className="px-6 py-3 border-b">Description</th>
                        <th className="px-6 py-3 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task: TASK_TYPE) => (
                        <tr key={task._id} className="border-b hover:bg-gray-100">
                            <td className="px-6 py-4">{task.title}</td>
                            <td className="px-6 py-4">{task.description}</td>
                            <td className="px-6 py-4 flex justify-end space-x-3">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => onEdit(task)}
                                >
                                    <FaEdit className="inline-block mr-2" /> Edit
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(task._id)}
                                >
                                    <FaTrash className="inline-block mr-2" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
