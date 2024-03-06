import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import { addEmployeeToAPI, deleteEmployeeFromAPI, editEmployeeInAPI } from './API/EmployeeAPI';
import { addJobPositionToAPI, deleteJobPositionFromAPI, editJobPositionInAPI } from './API/JobPositionAPI';
import { addClinicToAPI, deleteClinicFromAPI, editClinicInAPI } from './API/ClinicAPI';
import { addPatientToAPI, deletePatientFromAPI, editPatientInAPI } from './API/PatientAPI';
import { addVisitToAPI, deleteVisitFromAPI, editVisitInAPI } from './API/VisitAPI';




const App = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isEmployeeFormVisible, setIsEmployeeFormVisible] = useState(false);
  const [isJobPositionFormVisible, setIsJobPositionFormVisible] = useState(false);
  const [isClinicFormVisible, setIsClinicFormVisible] = useState(false);
  const [isPatientFormVisible, setIsPatientFormVisible] = useState(false);
  const [isVisitFormVisible, setIsVisitFormVisible] = useState(false);




  const menuItems = [
    { id: 1, label: 'Harmonogram' },
    { id: 2, label: 'Pracownicy' },
    { id: 3, label: 'Pacjenci' },
    { id: 4, label: 'Stanowiska' },
    { id: 5, label: 'Placówki'}
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
                if (item.id === 1) setIsVisitFormVisible(false);
                if (item.id === 2) setIsEmployeeFormVisible(false);
                if (item.id === 3) setIsPatientFormVisible(false);
                if (item.id === 4) setIsJobPositionFormVisible(false);
                if (item.id === 5) setIsClinicFormVisible(false);

              }}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
        <MainContent
          activeMenuItem={activeMenuItem}
          //visit
          isVisitFormVisible={isVisitFormVisible}
          setIsVisitFormVisible={setIsVisitFormVisible}
          addVisitToAPI={(newVisit, callback) => addVisitToAPI(newVisit, setIsVisitFormVisible, callback)}
          deleteVisitFromAPI={deleteVisitFromAPI}
          editVisitInAPI={editVisitInAPI}

          //employee
          isEmployeeFormVisible={isEmployeeFormVisible}
          setIsEmployeeFormVisible={setIsEmployeeFormVisible}
          addEmployeeToAPI={(newEmployee, callback) => addEmployeeToAPI(newEmployee, setIsEmployeeFormVisible, callback)}
          deleteEmployeeFromAPI={deleteEmployeeFromAPI}
          editEmployeeInAPI={editEmployeeInAPI}

           //Patient
           isPatientFormVisible={isPatientFormVisible}
           setIsPatientFormVisible={setIsPatientFormVisible}
           addPatientToAPI={(newPatient, callback) => addPatientToAPI(newPatient, setIsPatientFormVisible, callback)}
           deletePatientFromAPI={deletePatientFromAPI}
           editPatientInAPI={editPatientInAPI}

          //job position
          isJobPositionFormVisible={isJobPositionFormVisible}
          setIsJobPositionFormVisible={setIsJobPositionFormVisible}
          addJobPositionToAPI={(newJobPosition, callback) => addJobPositionToAPI(newJobPosition, setIsJobPositionFormVisible, callback)}
          deleteJobPositionFromAPI={deleteJobPositionFromAPI}
          editJobPositionInAPI={editJobPositionInAPI}

          //clinic
          isClinicFormVisible={isClinicFormVisible}
          setIsClinicFormVisible={setIsClinicFormVisible}
          addClinicToAPI={(newClinic, callback) => addClinicToAPI(newClinic, setIsClinicFormVisible, callback)}
          deleteClinicFromAPI={deleteClinicFromAPI}
          editClinicInAPI={editClinicInAPI}
        />
      </div>
    </div>
  );
};

export default App;
