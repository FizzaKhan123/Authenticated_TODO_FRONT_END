'use client';
import { useState } from "react";
import Modal from "./components/Modal";
import useModal from "./hooks/useModal";
import { ErrorResponse, TASK_TYPE } from './Types/type';
import TaskTable from "./components/TaskTable"; 
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } from "./redux/features/apiSlice";
import TaskSearchHandler from "./components/TaskSearchHandler";
import { isErrorResponse } from "./utils/errorUtils";

export default function TasksPage() {
    const { isOpen, openModal, closeModal } = useModal();
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null); 
    const [mode, setMode] = useState<'create' | 'edit'>('create'); 
    const [error,setError]=useState<string>();
    
    const [queryParams, setQueryParams] = useState<null | { title?: string; description?: string }>(null);
    const [createTask,{error:createError}] = useCreateTaskMutation();
    const [updateTask,{error: updateError}] = useUpdateTaskMutation();
    const [deleteTask , {error: deleteError}] = useDeleteTaskMutation();
    const { data: tasks, isLoading, isError, error:taskError } = useGetTasksQuery(queryParams);
    
    // const CreateError = createError as ErrorResponse | undefined;
    // const UpdateError = updateError as ErrorResponse | undefined;
    // const DeleteError = deleteError as ErrorResponse | undefined;
    // const TaskError = taskError as ErrorResponse | undefined;
    


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
                
            } else if (mode === 'edit' && currentTaskId) {
                await updateTask({ id: currentTaskId, task: newTask }).unwrap();
               
            }
            closeModal();
        } catch (err: unknown) {
            if (isErrorResponse(err)) {
              setError(err.data.message);
            } else {
              setError("An Un Expected Error Occured");
            }

          }
    };

    const handleDelete = (id: string) => {
        deleteTask(id);
    };

    const handleSearch = (params: { title?: string; description?: string }) => {
        setQueryParams(params);
      };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>
            <div className="text-center mb-6">
            <TaskSearchHandler onSearch={handleSearch} />
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
                tasks && tasks.length > 0 ? (
                    <TaskTable
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ) : (
                    <p className="text-center text-gray-500">No tasks available.</p> // Handle the case when tasks are empty
                )
            )}

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                newTask={newTask}
                setNewTask={setNewTask}
                mode={mode}
                error={error}
              
            />
        </div>
    );
}
