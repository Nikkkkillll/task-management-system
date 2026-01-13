// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectsAPI, tasksAPI } from '../../utils/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, todo: 0, inProgress: 0, done: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, statsRes] = await Promise.all([
        projectsAPI.getAll(),
        tasksAPI.getStats()
      ]);
      setProjects(projectsRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-600 text-sm">Total Tasks</p>
          <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
          <p className="text-blue-600 text-sm">Todo</p>
          <p className="text-3xl font-bold text-blue-600">{stats.todo}</p>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
          <p className="text-yellow-600 text-sm">In Progress</p>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
          <p className="text-green-600 text-sm">Done</p>
          <p className="text-3xl font-bold text-green-600">{stats.done}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Projects</h3>
          <button
            onClick={() => navigate('/projects')}
            className="text-blue-600 hover:underline text-sm"
          >
            View all
          </button>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No projects yet. Create one to get started!</p>
            <button
              onClick={() => navigate('/projects')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.slice(0, 5).map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/tasks/${project._id}`)}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
              >
                <div>
                  <h4 className="font-semibold text-gray-800">{project.title}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;