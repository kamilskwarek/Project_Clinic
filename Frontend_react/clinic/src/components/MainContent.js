import React, { useState, useEffect } from 'react';
import EmployeeList from './Employee/EmployeeList';
import EmployeeAddForm from './Employee/EmployeeAddForm';
import JobPositionList from './JobPosition/JobPositionList';
import JobPositionAddForm from './JobPosition/JobPositionAddForm';


import { loadEmployees, updateEmployeeInAPI, refreshEmployees, showEmployeeAddForm, handleEditEmployee, handleDeleteEmployee } from '../API/EmployeeAPI';
import { loadJobPositions, updateJobPositionInAPI, refreshJobPositions, showJobPositionAddForm, handleEditJobPosition, handleDeleteJobPosition } from '../API/JobPositionAPI';


const MainContent = ({ activeMenuItem,
  addEmployeeToAPI, isEmployeeFormVisible, setIsEmployeeFormVisible, deleteEmployeeFromAPI,
  addJobPositionToAPI, isJobPositionFormVisible, setIsJobPositionFormVisible, deleteJobPositionFromAPI,}) => {

  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const [jobPositions, setJobPositions] = useState([]);
  const [jobPositionToEdit, setJobPositionToEdit] = useState(null);

  const refreshEmployeeList = () => refreshEmployees(setEmployees, loadEmployees);
  const showEmployeeForm = () => showEmployeeAddForm(setIsEmployeeFormVisible);
  const editEmployee = (employee) => handleEditEmployee(employee, setEmployeeToEdit, setIsEmployeeFormVisible);
  const deleteEmployee = (id) => handleDeleteEmployee(id, deleteEmployeeFromAPI, setEmployees, loadEmployees);


  const refreshJobPositionList = () => refreshJobPositions(setJobPositions, loadJobPositions);
  const showJobPositionForm = () => showJobPositionAddForm(setIsJobPositionFormVisible);
  const editJobPosition = (jobPosition) => handleEditJobPosition(jobPosition, setJobPositionToEdit, setIsJobPositionFormVisible);
  const deleteJobPosition = (id) => handleDeleteJobPosition(id, deleteJobPositionFromAPI, setJobPositions, loadJobPositions);
// employee

  useEffect(() => {
    if (activeMenuItem === 2) {
      refreshEmployeeList();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isEmployeeFormVisible) {
      setEmployeeToEdit(null);
    }
  }, [isEmployeeFormVisible]);

//jobposition
  useEffect(() => {
    if (activeMenuItem === 4) {
      refreshJobPositionList();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isJobPositionFormVisible) {
      setJobPositionToEdit(null);
    }
  }, [isJobPositionFormVisible]);

  return (
    <div className="main-content">
      {activeMenuItem === 1 && <div>Tu będzie zawartość dla linka 1 (Strona główna)</div>}
      
      {activeMenuItem === 2 && !isEmployeeFormVisible && (
        <EmployeeList 
          employees={employees} 
          onAddButtonClick={showEmployeeForm}
          deleteEmployee={deleteEmployee} 
          editEmployee={editEmployee} 
        />
      )}
      
      {activeMenuItem === 2 && isEmployeeFormVisible && (
        <EmployeeAddForm 
          addEmployeeHandler={(employee) => addEmployeeToAPI(employee, () => refreshEmployeeList())} 
          editEmployeeHandler={(updatedEmployee) => 
            updateEmployeeInAPI(
              employeeToEdit.id,
              updatedEmployee,
              () => refreshEmployeeList(), 
              setIsEmployeeFormVisible,
              setEmployeeToEdit
            )
          }
          employeeToEdit={employeeToEdit}
        />
      )}

{activeMenuItem === 4 && !isJobPositionFormVisible && (
        <JobPositionList 
          jobPositions={jobPositions} 
          onAddButtonClick={showJobPositionForm}
          deleteJobPosition={deleteJobPosition} 
          editJobPosition={editJobPosition} 
        />
      )}
      
      {activeMenuItem === 4 && isJobPositionFormVisible && (
        <JobPositionAddForm 
          addJobPositionHandler={(jobPosition) => addJobPositionToAPI(jobPosition, () => refreshJobPositionList())} 
          editJobPositionHandler={(updatedJobPosition) => 
            updateJobPositionInAPI(
              jobPositionToEdit.id,
              updatedJobPosition,
              () => refreshJobPositionList(), 
              setIsJobPositionFormVisible,
              setJobPositionToEdit
            )
          }
          jobPositionToEdit={jobPositionToEdit}
        />
      )}
    </div>
  );
};

export default MainContent;
