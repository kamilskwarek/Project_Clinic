import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';

const App = () => {
  
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const menuItems = [
    { id: 1, label: 'Strona główna' },
    { id: 2, label: 'Pracownicy' },
    { id: 3, label: 'Pacjenci' },
  ];
  

  const addEmployeeToAPI = async (newEmployee,  callback) => {
    try {
      const response = await fetch('https://localhost:7137/api/employee/', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to add employee');
      }

      const responseData = await response.json();
      console.log('Dodano pracownika:', responseData);


    } catch (error) {
      console.error('Błąd przy dodawaniu pracownika:', error.message);
    }
    setIsFormVisible(false);
    callback();
  };

  

  const deleteEmployeeFromAPI = async (employeeId, callback) => {
    try {
        const response = await fetch(`https://localhost:7137/api/employee/${employeeId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete employee');
        }

        console.log('Usunięto pracownika:', employeeId);
        callback();
    } catch (error) {
        console.error('Błąd przy usuwaniu pracownika:', error.message);
    }
};
  

  const editEmployeeInAPI = async (editedEmployee) => {
    try {
      const response = await fetch(`https:///localhost:7137/api/employee/${editedEmployee.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedEmployee),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit employee');
      }
  
      const responseData = await response.json();
      console.log('Edytowano pracownika:', responseData);
     
  
    } catch (error) {
      console.error('Błąd przy edycji pracownika:', error.message);
    }
  };
  

  return (
    <div className="app-container">
      <Navbar appName="Twoja Aplikacja Webowa" />
      <div className="content-container">
        <div className="menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} onClick={() => {
                setActiveMenuItem(item.id);
                if (item.id === 2) setIsFormVisible(false); 
              }}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <MainContent 
          activeMenuItem={activeMenuItem} 
          isFormVisible={isFormVisible} 
          setIsFormVisible={setIsFormVisible}
          addEmployeeToAPI={addEmployeeToAPI}
          deleteEmployeeFromAPI={deleteEmployeeFromAPI} 
          editEmployeeInAPI={editEmployeeInAPI}

        />

      </div>
    </div>
  );
};

export default App;
