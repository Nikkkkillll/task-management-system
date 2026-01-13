// src/components/Tasks/TaskBoard.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { tasksAPI, projectsAPI } from '../../utils/api';
import TaskForm from './TaskForm';

const TaskBoard = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(projectId || null);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getAll(selectedProject);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.delete(id);
        setTasks(tasks.filter((t) => t._id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
        alert('Failed to delete task');
      }
    }
  };

  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        await tasksAPI.update(editingTask._id, taskData);
      } else {
        await tasksAPI.create(taskData);
      }
      fetchTasks();
      setShowModal(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">Loading tasks...</div>
      </div>
    );
  }

  const currentProject = projects.find((p) => p._id === selectedProject);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          {currentProject && (
            <p className="text-gray-600 mt-1">
              Project: {currentProject.title}
              <button
                onClick={() => setSelectedProject(null)}
                className="ml-2 text-blue-600 hover:underline text-sm"
              >
                Show all
              </button>
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">No projects available. Create a project first!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Todo', 'In Progress', 'Done'].map((status) => (
            <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center justify-between">
                <span>{status}</span>
                <span className="text-sm font-normal text-gray-500">
                  {getTasksByStatus(status).length}
                </span>
              </h3>
              <div className="space-y-3">
                {getTasksByStatus(status).map((task) => (
                  <div
                    key={task._id}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">{task.title}</h4>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => {
                            setEditingTask(task);
                            setShowModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className={`px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      <span className="text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    {!selectedProject && task.project && (
                      <div className="mt-2 text-xs text-gray-500">
                        Project: {task.project.title}
                      </div>
                    )}
                  </div>
                ))}
                {getTasksByStatus(status).length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No tasks in {status.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <TaskForm
          task={editingTask}
          projects={projects}
          defaultProjectId={selectedProject}
          onSave={handleSave}
          onCancel={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
        />
      )}
    </main>
  );
};

export default TaskBoard;