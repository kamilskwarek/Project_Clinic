import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import { addEmployeeToAPI, deleteEmployeeFromAPI, editEmployeeInAPI } from './API/EmployeeAPI';
import { addJobPositionToAPI, deleteJobPositionFromAPI, editJobPositionInAPI } from './API/JobPositionAPI';

const App = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isEmployeeFormVisible, setIsEmployeeFormVisible] = useState(false);
  const [isJobPositionFormVisible, setIsJobPositionFormVisible] = useState(false);


  const menuItems = [
    { id: 1, label: 'Strona główna' },
    { id: 2, label: 'Pracownicy' },
    { id: 3, label: 'Pacjenci' },
    { id: 4, label: 'Stanowiska' }
  ];

  return (
    <div className="app-container">
      <Navbar appName="Twoja Aplikacja Webowa" />
      <div className="content-container">
        <div className="menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} onClick={() => {
                setActiveMenuItem(item.id);
                if (item.id === 2) setIsEmployeeFormVisible(false);
                if (item.id === 4) setIsJobPositionFormVisible(false);
              }}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <MainContent
          activeMenuItem={activeMenuItem}
          //employee
          isEmployeeFormVisible={isEmployeeFormVisible}
          setIsEmployeeFormVisible={setIsEmployeeFormVisible}
          addEmployeeToAPI={(newEmployee, callback) => addEmployeeToAPI(newEmployee, setIsEmployeeFormVisible, callback)}
          deleteEmployeeFromAPI={deleteEmployeeFromAPI}
          editEmployeeInAPI={editEmployeeInAPI}

          //job position
          isJobPositionFormVisible={isJobPositionFormVisible}
          setIsJobPositionFormVisible={setIsJobPositionFormVisible}
          addJobPositionToAPI={(newJobPosition, callback) => addJobPositionToAPI(newJobPosition, setIsJobPositionFormVisible, callback)}
          deleteJobPositionFromAPI={deleteJobPositionFromAPI}
          editJobPositionInAPI={editJobPositionInAPI}
        />
      </div>
    </div>
  );
};

export default App;
