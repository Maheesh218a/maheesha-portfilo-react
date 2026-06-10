import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch everything from Firebase Firestore
      const aboutDoc = await getDoc(doc(db, "portfolio", "about"));
      const projectsDoc = await getDoc(doc(db, "portfolio", "projects"));
      const experienceDoc = await getDoc(doc(db, "portfolio", "experience"));
      const contactDoc = await getDoc(doc(db, "portfolio", "contact"));
      const skillsDoc = await getDoc(doc(db, "portfolio", "skills"));

      setData({
        about: aboutDoc.exists() ? aboutDoc.data() : null,
        projects: projectsDoc.exists() ? projectsDoc.data().items : [],
        experience: experienceDoc.exists() ? experienceDoc.data() : null,
        contact: contactDoc.exists() ? contactDoc.data() : null,
        skills: skillsDoc.exists() ? skillsDoc.data() : { skillCategories: [], otherTech: [] }
      });
    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = async (section, newData) => {
    const updatedData = { ...data, [section]: newData };
    
    // Optimistically update UI
    setData(updatedData);

    try {
      // Save to Firebase
      if (section === 'projects') {
        await setDoc(doc(db, "portfolio", section), { items: newData });
      } else {
        await setDoc(doc(db, "portfolio", section), newData);
      }
    } catch (error) {
      console.error(`Error saving ${section} to Firebase:`, error);
      fetchData(); // Revert on fail
    }
  };

  // Provide an initial loading state while fetching from backend
  if (loading) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-mono">Loading data...</div>;
  }

  // Ensure data exists before rendering children
  if (!data) {
    return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500 font-mono">Error: Could not load portfolio data. Make sure the backend server is running.</div>;
  }

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};
