import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const ADMIN_EMAIL = "niyatigroup1@gmail.com";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = auth.currentUser;
        if (!user || user.email !== ADMIN_EMAIL) {
          alert("Access denied");
          return;
        }

        const snapshot = await getDocs(collection(db, "jobApplications"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.().toLocaleString()
        }));
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteDoc(doc(db, "jobApplications", id));
        setApplications(prev => prev.filter(app => app.id !== id));
      } catch (error) {
        console.error("Failed to delete application:", error);
        alert("Failed to delete application. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900/50 to-gray-950">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 p-8 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <motion.h2
            className="text-3xl font-bold text-gray-100 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Job Applications
          </motion.h2>
          <p className="text-gray-400 mb-6">
            {applications.length} application{applications.length !== 1 ? 's' : ''} received
          </p>

          {applications.length === 0 ? (
            <motion.div 
              className="text-center py-12 text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              No applications found
            </motion.div>
          ) : (
            <div className="space-y-6">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{app.name}</h3>
                        <p className="text-gray-400">{app.email}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-white">{app.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-white">{app.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Position</p>
                          <p className="text-white">{app.position}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Experience</p>
                          <p className="text-white">{app.experience_level}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500">Applied For</p>
                        <p className="text-white font-medium">{app.jobTitle}</p>
                      </div>

                      {app.linkedin && (
                        <div>
                          <p className="text-sm text-gray-500">LinkedIn</p>
                          <a 
                            href={app.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View Profile
                          </a>
                        </div>
                      )}

                      <div className="flex space-x-4 pt-2">
                        <p className="text-sm text-gray-500">Contact</p>
                        <a href={`tel:${app.phone}`} className="text-white hover:text-red-400 transition-colors">
                          {app.phone}
                        </a>
                      </div>

                      {/* Display Resume PDF Link if available */}
                      {app.cvUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-1">Resume:</p>
                          <a 
                            href={app.cvUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            View PDF Resume
                          </a>
                        </div>
                      )}

                      {/* Delete Button - Admin only */}
                      {auth.currentUser?.email === ADMIN_EMAIL && (
                        <motion.button
                          onClick={() => handleDelete(app.id)}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-6 w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                          type="button"
                        >
                          Delete Application
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-800 text-right">
                    <p className="text-xs text-gray-500">Applied on: {app.createdAt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminApplications;
