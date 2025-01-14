import React from "react";

interface ModalProps {
    isOpen: boolean;
    mode:string;
    onClose: () => void;
    onSubmit: () => void;
    newTask: { title: string; description: string };
    setNewTask: React.Dispatch<React.SetStateAction<{ title: string; description: string }>>;
    error:string | undefined;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, newTask, setNewTask ,error }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Create New Task</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}
                >
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Task Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Task Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    {error && 
                      <p className="text-center text-red-500 mb-8">
                        {error}
                     </p>
                    }
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
