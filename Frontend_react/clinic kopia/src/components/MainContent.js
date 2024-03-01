import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeAddForm from './EmployeeAddForm';

const MainContent = ({ 
  activeMenuItem, 
  addEmployeeToAPI, 
  isFormVisible, 
  setIsFormVisible, 
  deleteEmployeeFromAPI, 
  editEmployeeInAPI 
  }) => {

  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  useEffect(() => {
    if (activeMenuItem === 2) {
      loadEmployees();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isFormVisible) {
      setEmployeeToEdit(null);
    }
  }, [isFormVisible]);

  const loadEmployees = async () => {
    try {
      const response = await fetch('https://localhost:7137/api/employee');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych pracowników:', error);
    }
  };

  const showAddForm = () => {
    setIsFormVisible(true);
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
    setIsFormVisible(true);
  };

  const updateEmployeeInAPI = async (updatedEmployee) => {
    try {
      const response = await fetch(`https://localhost:7137/api/employee/${employeeToEdit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) {
        throw new Error('Failed to update employee');
      }

      loadEmployees();
      setIsFormVisible(false);
      setEmployeeToEdit(null);

    } catch (error) {
      console.error('Error during employee update:', error);
    }
  };

  return (
    <div className="main-content">
      {activeMenuItem === 1 && <div>Tu będzie zawartość dla linka 1 (Strona główna)</div>}
      
      {activeMenuItem === 2 && !isFormVisible && (
          <EmployeeList 
            employees={employees} 
            onAddButtonClick={showAddForm} 
            deleteEmployee={(id) => {
                deleteEmployeeFromAPI(id, loadEmployees);
            }} 
            editEmployee={handleEditEmployee}
          />
      )}
      
      {activeMenuItem === 2 && isFormVisible && (
          <EmployeeAddForm 
          addEmployeeHandler={(employee) => addEmployeeToAPI(employee, loadEmployees)}
          editEmployeeHandler={updateEmployeeInAPI}
          employeeToEdit={employeeToEdit}
      />
      
      )}
    </div>
  );
};

export default MainContent;
