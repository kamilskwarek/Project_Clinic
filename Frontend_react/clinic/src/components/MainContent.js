import React, { useState, useEffect } from 'react';
import EmployeeList from './Employee/EmployeeList';
import EmployeeAddForm from './Employee/EmployeeAddForm';
import JobPositionList from './JobPosition/JobPositionList';
import JobPositionAddForm from './JobPosition/JobPositionAddForm';
import ClinicList from './Clinic/ClinicList';
import ClinicAddForm from './Clinic/ClinicAddForm';
import PatientList from './Patient/PatientList';
import PatientAddForm from './Patient/PatientAddForm';
import VisitList from './Visit/VisitList';
import VisitAddForm from './Visit/VisitAddForm';


import { loadEmployees, updateEmployeeInAPI, refreshEmployees, showEmployeeAddForm, handleEditEmployee, handleDeleteEmployee } from '../API/EmployeeAPI';
import { loadJobPositions, updateJobPositionInAPI, refreshJobPositions, showJobPositionAddForm, handleEditJobPosition, handleDeleteJobPosition } from '../API/JobPositionAPI';
import { loadClinics, updateClinicInAPI, refreshClinics, showClinicAddForm, handleEditClinic, handleDeleteClinic } from '../API/ClinicAPI';
import { loadPatients, updatePatientInAPI, refreshPatients, showPatientAddForm, handleEditPatient, handleDeletePatient } from '../API/PatientAPI';
import { loadVisits, updateVisitInAPI, refreshVisits, showVisitAddForm, handleEditVisit, handleDeleteVisit } from '../API/VisitAPI';





const MainContent = ({ activeMenuItem,
  addEmployeeToAPI, isEmployeeFormVisible, setIsEmployeeFormVisible, deleteEmployeeFromAPI,
  addJobPositionToAPI, isJobPositionFormVisible, setIsJobPositionFormVisible, deleteJobPositionFromAPI,
  addClinicToAPI, isClinicFormVisible, setIsClinicFormVisible, deleteClinicFromAPI,
  addPatientToAPI, isPatientFormVisible, setIsPatientFormVisible, deletePatientFromAPI,
  addVisitToAPI, isVisitFormVisible, setIsVisitFormVisible, deleteVisitFromAPI,



}) => {

  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const [jobPositions, setJobPositions] = useState([]);
  const [jobPositionToEdit, setJobPositionToEdit] = useState(null);

  const [clinics, setClinics] = useState([]);
  const [clinicToEdit, setClinicToEdit] = useState(null);

  const [patients, setPatients] = useState([]);
  const [patientToEdit, setPatientToEdit] = useState(null);

  const [visits, setVisits] = useState([]);
  const [visitToEdit, setVisitToEdit] = useState(null);


  // employee

  const refreshEmployeeList = () => refreshEmployees(setEmployees, loadEmployees);
  const showEmployeeForm = () => showEmployeeAddForm(setIsEmployeeFormVisible);
  const editEmployee = (employee) => handleEditEmployee(employee, setEmployeeToEdit, setIsEmployeeFormVisible);
  const deleteEmployee = (id) => handleDeleteEmployee(id, deleteEmployeeFromAPI, setEmployees, loadEmployees);

  //jobposition

  const refreshJobPositionList = () => refreshJobPositions(setJobPositions, loadJobPositions);
  const showJobPositionForm = () => showJobPositionAddForm(setIsJobPositionFormVisible);
  const editJobPosition = (jobPosition) => handleEditJobPosition(jobPosition, setJobPositionToEdit, setIsJobPositionFormVisible);
  const deleteJobPosition = (id) => handleDeleteJobPosition(id, deleteJobPositionFromAPI, setJobPositions, loadJobPositions);



  //clinic
  const refreshClinicList = () => refreshClinics(setClinics, loadClinics);
  const showClinicForm = () => showClinicAddForm(setIsClinicFormVisible);
  const editClinic = (clinic) => handleEditClinic(clinic, setClinicToEdit, setIsClinicFormVisible);
  const deleteClinic = (id) => handleDeleteClinic(id, deleteClinicFromAPI, setClinics, loadClinics);

  //Patients
  const refreshPatientList = () => refreshPatients(setPatients, loadPatients);
  const showPatientForm = () => showPatientAddForm(setIsPatientFormVisible);
  const editPatient = (patient) => handleEditPatient(patient, setPatientToEdit, setIsPatientFormVisible);
  const deletePatient = (id) => handleDeletePatient(id, deletePatientFromAPI, setPatients, loadPatients);

  //visit
  const refreshVisitList = () => refreshVisits(setVisits, loadVisits);
  const showVisitForm = () => showVisitAddForm(setIsVisitFormVisible);
  const editVisit = (visit) => handleEditVisit(visit, setVisitToEdit, setIsVisitFormVisible);
  const deleteVisit = (id) => handleDeleteVisit(id, deleteVisitFromAPI, setVisits, loadVisits);

  //visit
  useEffect(() => {
    if (activeMenuItem === 1) {
      refreshVisitList();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isVisitFormVisible) {
      setVisitToEdit(null);
    }
  }, [isVisitFormVisible]);


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

  //patient
  useEffect(() => {
    if (activeMenuItem === 3) {
      refreshPatientList();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isPatientFormVisible) {
      setPatientToEdit(null);
    }
  }, [isPatientFormVisible]);


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

  //clinic
  useEffect(() => {
    if (activeMenuItem === 5) {
      refreshClinicList();
    }
  }, [activeMenuItem]);

  useEffect(() => {
    if (!isClinicFormVisible) {
      setClinicToEdit(null);
    }
  }, [isClinicFormVisible]);





  return (
    <div className="main-content">
      {/*visit*/}
      {activeMenuItem === 1 && !isVisitFormVisible && (
        <VisitList
          visits={visits}
          onAddButtonClick={showVisitForm}
          deleteVisit={deleteVisit}
          editVisit={editVisit}
        />
      )}

      {activeMenuItem === 1 && isVisitFormVisible && (
        <VisitAddForm
          addVisitHandler={(visit) => addVisitToAPI(visit, () => refreshVisitList())}
          editVisitHandler={(updatedVisit) =>
            updateVisitInAPI(
              visitToEdit.id,
              updatedVisit,
              () => refreshVisitList(),
              setIsVisitFormVisible,
              setVisitToEdit
            )
          }
          visitToEdit={visitToEdit}
        />
      )}
      {/* employee */}
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
      {/* Patient */}
      {activeMenuItem === 3 && !isPatientFormVisible && (
        <PatientList
          patients={patients}
          onAddButtonClick={showPatientForm}
          deletePatient={deletePatient}
          editPatient={editPatient}
        />
      )}

      {activeMenuItem === 3 && isPatientFormVisible && (
        <PatientAddForm
          addPatientHandler={(patient) => addPatientToAPI(patient, () => refreshPatientList())}
          editPatientHandler={(updatedPatient) =>
            updatePatientInAPI(
              patientToEdit.id,
              updatedPatient,
              () => refreshPatientList(),
              setIsPatientFormVisible,
              setPatientToEdit
            )
          }
          patientToEdit={patientToEdit}
        />
      )}
      {/* jobpostion */}
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

      {/* clinic */}
      {activeMenuItem === 5 && !isClinicFormVisible && (
        <ClinicList
          clinics={clinics}
          onAddButtonClick={showClinicForm}
          deleteClinic={deleteClinic}
          editClinic={editClinic}
        />
      )}

      {activeMenuItem === 5 && isClinicFormVisible && (
        <ClinicAddForm
          addClinicHandler={(clinic) => addClinicToAPI(clinic, () => refreshClinicList())}
          editClinicHandler={(updatedClinic) =>
            updateClinicInAPI(
              clinicToEdit.id,
              updatedClinic,
              () => refreshClinicList(),
              setIsClinicFormVisible,
              setClinicToEdit
            )
          }
          clinicToEdit={clinicToEdit}
        />
      )}
    </div>
  );
};

export default MainContent;
