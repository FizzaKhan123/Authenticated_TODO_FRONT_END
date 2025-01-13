import { FaEdit, FaTrash } from 'react-icons/fa';
import { TASK_TYPE } from '../Types/type'; // Assuming this is the type for your task
import { useDeleteTaskMutation } from '../redux/features/apiSlice';

interface TaskCardProps {
    task: TASK_TYPE;
    onEdit: () => void; 
}



const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
    const [deleteTask]=useDeleteTaskMutation();
    const handleDelete =(id:string)=>{
        deleteTask(id);
    }
    return (
        <div className="bg-white shadow-md rounded-lg border border-gray-300 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{task.title}</h2>
            <p className="text-gray-600">{task.description}</p>
            <div className="flex justify-end space-x-3 mt-4">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={onEdit} // This now triggers handleEdit
                >
                    <FaEdit className="inline-block mr-2" /> Edit
                </button>
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={()=>handleDelete(task._id)}
                >
                    <FaTrash className="inline-block mr-2" /> Delete
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
