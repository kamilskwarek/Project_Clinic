import React, { useState, useEffect } from 'react';
import Employee from './Employee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

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

  return (
    <div>
      <h2>Lista pracowników:</h2>
      {employees.map((employee) => (
        <Employee key={employee.id} employee={employee}  />
        
      ))}
    </div>
  );
};

export default EmployeeList;
