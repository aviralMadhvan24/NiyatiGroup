
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const ADMIN_EMAIL = "niyatigroup1@gmail.com";

const AdminGenericApplications = () => {
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

        const snapshot = await getDocs(collection(db, "genericjobApplications"));
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
        await deleteDoc(doc(db, "genericjobApplications", id));
        setApplications(prev => prev.filter(app => app.id !== id));
      } catch (error) {
        alert("Failed to delete application.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-red-700 via-red-800 to-black text-gray-300 min-h-screen overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-950 p-10 rounded-2xl border border-gray-800 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-gray-100 mb-4">Generic Job Applications</h2>
          {applications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No applications found</div>
          ) : (
            <div className="space-y-6">
              {applications.map((app, index) => (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="mb-4">
                    <span className="block text-xl text-white font-semibold">{app.name}</span>
                    <span className="block text-gray-400">{app.email}</span>
                    <span className="block text-gray-400">{app.phone}</span>
                  </div>
                  <div className="mb-4">
                    <span className="block text-gray-400">Location: <span className="text-white">{app.location}</span></span>
                    <span className="block text-gray-400">Experience: <span className="text-white">{app.experience}</span></span>
                    <span className="block text-gray-400">Applied on: <span className="text-white">{app.createdAt}</span></span>
                  </div>
                  {app.cvUrl && (
                    <div className="mb-4">
                      <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        View PDF Resume
                      </a>
                    </div>
                  )}
                  <motion.button
                    onClick={() => handleDelete(app.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                  >
                    Delete Application
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminGenericApplications;
