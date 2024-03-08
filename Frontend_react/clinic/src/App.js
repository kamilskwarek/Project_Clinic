import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainContent from './components/MainContent';
import LoginForm from './components/LoginForm';
import { addEmployeeToAPI, deleteEmployeeFromAPI, editEmployeeInAPI } from './API/EmployeeAPI';
import { addJobPositionToAPI, deleteJobPositionFromAPI, editJobPositionInAPI } from './API/JobPositionAPI';
import { addClinicToAPI, deleteClinicFromAPI, editClinicInAPI } from './API/ClinicAPI';
import { addPatientToAPI, deletePatientFromAPI, editPatientInAPI } from './API/PatientAPI';
import { addVisitToAPI, deleteVisitFromAPI, editVisitInAPI } from './API/VisitAPI';
import axios from 'axios';

const App = () => {
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [isEmployeeFormVisible, setIsEmployeeFormVisible] = useState(false);
  const [isJobPositionFormVisible, setIsJobPositionFormVisible] = useState(false);
  const [isClinicFormVisible, setIsClinicFormVisible] = useState(false);
  const [isPatientFormVisible, setIsPatientFormVisible] = useState(false);
  const [isVisitFormVisible, setIsVisitFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const menuItems = [
    { id: 1, label: 'Harmonogram', requiredPermission: 'schedule:view' },
    { id: 2, label: 'Pracownicy', requiredPermission: 'employees:view' },
    { id: 3, label: 'Pacjenci', requiredPermission: 'patients:view' },
    { id: 4, label: 'Stanowiska', requiredPermission: 'jobpositions:view' },
    { id: 5, label: 'Placówki', requiredPermission: 'clinics:view' }
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('https://localhost:7137/api/employee/me')
        .then(response => {
          const user = response.data;
          setUser(user);
          setIsLoggedIn(true);
        })
        .catch(error => {
          console.error('Wystąpił błąd podczas pobierania danych użytkownika', error.response.data);
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        });
    }
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('token');
  };

  const hasPermission = (user, permission) => {
    if (user && user.jobPosition) {
      if (user.jobPosition === 'Admin') {
        return true;
      }
      switch (user.jobPosition) {
        case 'Lekarz':
          return permission === 'schedule:view' || permission === 'patients:view';
        case 'Recepcjonista':
          return permission === 'schedule:view' || permission === 'patients:view';
        default:
          return false;
      }
    }
    return false;
  };

  return (
    <div className="app-container">
      <Navbar
        appName="Twoja Aplikacja Webowa"
        isLoggedIn={isLoggedIn}
        userEmail={user?.email}
        user={user} 
        onLogout={handleLogout}
      />


      <div className="content-container">
        {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
        {isLoggedIn && (
          <>
            <div className="menu">
              <ul>
                {menuItems.map((item) => (
                  user && hasPermission(user, item.requiredPermission) && (
                    <li
                      key={item.id}
                      onClick={() => {
                        setActiveMenuItem(item.id);
                        // Resetowanie formularzy
                        setIsVisitFormVisible(false);
                        setIsEmployeeFormVisible(false);
                        setIsPatientFormVisible(false);
                        setIsJobPositionFormVisible(false);
                        setIsClinicFormVisible(false);
                      }}>
                      {item.label}
                    </li>
                  )
                ))}
              </ul>
            </div>
            <MainContent
              activeMenuItem={activeMenuItem}
              isVisitFormVisible={isVisitFormVisible}
              setIsVisitFormVisible={setIsVisitFormVisible}
              addVisitToAPI={(newVisit, callback) => addVisitToAPI(newVisit, setIsVisitFormVisible, callback)}
              deleteVisitFromAPI={deleteVisitFromAPI}
              editVisitInAPI={editVisitInAPI}
              isEmployeeFormVisible={isEmployeeFormVisible}
              setIsEmployeeFormVisible={setIsEmployeeFormVisible}
              addEmployeeToAPI={(newEmployee, callback) => addEmployeeToAPI(newEmployee, setIsEmployeeFormVisible, callback)}
              deleteEmployeeFromAPI={deleteEmployeeFromAPI}
              editEmployeeInAPI={editEmployeeInAPI}
              isPatientFormVisible={isPatientFormVisible}
              setIsPatientFormVisible={setIsPatientFormVisible}
              addPatientToAPI={(newPatient, callback) => addPatientToAPI(newPatient, setIsPatientFormVisible, callback)}
              deletePatientFromAPI={deletePatientFromAPI}
              editPatientInAPI={editPatientInAPI}
              isJobPositionFormVisible={isJobPositionFormVisible}
              setIsJobPositionFormVisible={setIsJobPositionFormVisible}
              addJobPositionToAPI={(newJobPosition, callback) => addJobPositionToAPI(newJobPosition, setIsJobPositionFormVisible, callback)}
              deleteJobPositionFromAPI={deleteJobPositionFromAPI}
              editJobPositionInAPI={editJobPositionInAPI}
              isClinicFormVisible={isClinicFormVisible}
              setIsClinicFormVisible={setIsClinicFormVisible}
              addClinicToAPI={(newClinic, callback) => addClinicToAPI(newClinic, setIsClinicFormVisible, callback)}
              deleteClinicFromAPI={deleteClinicFromAPI}
              editClinicInAPI={editClinicInAPI}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
