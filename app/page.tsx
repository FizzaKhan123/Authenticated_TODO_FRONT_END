'use client';
import { useState } from "react";
import useModal from "./hooks/useModal";
import Modal from "./components/Modal";
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation } from "./redux/features/apiSlice";
import TaskCard from "./components/TaskCard";  
import { TASK_TYPE } from './Types/type';

export default function TasksPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null); // Store task id separately
    const [mode, setMode] = useState<'create' | 'edit'>('create'); // Track if we are in create or edit mode
    const { data: tasks, isLoading, isError, error } = useGetTasksQuery(null);
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    
    const handleCreate = () => {
        setMode('create'); 
        setNewTask({ title: "", description: "" }); 
        setCurrentTaskId(null); 
        openModal();
    };

   
    const handleEdit = (task: TASK_TYPE) => {
        setMode('edit'); 
        setNewTask({ title: task.title, description: task.description });
        setCurrentTaskId(task._id); 
        openModal();
    };

   
    const handleSubmit = async () => {
        try {
            if (mode === 'create') {
                await createTask(newTask).unwrap();
                alert('Task Created Successfully');
            } else if (mode === 'edit' && currentTaskId) {
                await updateTask({ id: currentTaskId, task: newTask }).unwrap();
                alert('Task Updated Successfully');
            }
            closeModal();
        } catch (err) {
            console.error('Error during task creation or update:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
            <div className="text-center mb-6">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
                    onClick={handleCreate}
                >
                    Create New Task
                </button>
            </div>
            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : isError ? (
                <p className="text-center text-red-500">Error: Failed to fetch tasks</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task: TASK_TYPE) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={() => handleEdit(task)} 
                        />
                    ))}
                </div>
            )}

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                newTask={newTask}
                setNewTask={setNewTask}
                mode={mode} 
            />
        </div>
    );
}
