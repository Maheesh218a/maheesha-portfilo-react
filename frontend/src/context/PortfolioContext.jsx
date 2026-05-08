import React, { createContext, useState, useEffect } from 'react';

export const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/portfolio');
      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
      const response = await fetch('http://localhost:5000/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        console.error('Failed to save data');
        // Revert on fail if needed
        fetchData();
      }
    } catch (error) {
      console.error('Error saving data:', error);
      fetchData();
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
