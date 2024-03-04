import React, { useState, useEffect } from 'react';

const EmployeeAddForm = ({ addEmployeeHandler, editEmployeeHandler, employeeToEdit }) => {



  const [firstName, setFirstName] = useState(employeeToEdit ? employeeToEdit.firstName : '');
  const [lastName, setLastName] = useState(employeeToEdit ? employeeToEdit.lastName : '');
  const [pesel, setPesel] = useState(employeeToEdit ? employeeToEdit.pesel : '');
  const [phoneNumber, setPhoneNumber] = useState(employeeToEdit ? employeeToEdit.phoneNumber : '');
  const [jobTitle, setJobTitle] = useState(employeeToEdit ? employeeToEdit.jobPosition : '');
  const [clinicName, setClinicName] = useState(employeeToEdit ? employeeToEdit.clinic : '');
  const [clinics, setClinics] = useState(employeeToEdit && Array.isArray(employeeToEdit.clinic) ? employeeToEdit.clinic : []);
  const [jobPositions, setJobPositions] = useState(employeeToEdit && Array.isArray(employeeToEdit.jobPosition) ? employeeToEdit.jobPosition : [])

  useEffect(() => {
    fetchClinics();
    fetchJobPositions();
    
  }, []);

  const fetchClinics = async () => {
    try {
      const response = await fetch('https://localhost:7137/api/clinic/');
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      console.error('Błąd podczas pobierania klinik:', error);
    }
  };

  const fetchJobPositions = async () => {
    try {
      const response = await fetch('https://localhost:7137/api/jobposition')
      const data = await response.json();
      setJobPositions(data);
    } catch (error) {
      console.error('Bład podczas pobierania stanowisk pracy')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const employeeData = {
      firstName,
      lastName,
      pesel,
      phoneNumber,
      jobTitle,
      clinicName,
    };

    if (employeeToEdit) {
      editEmployeeHandler(employeeData, employeeToEdit.id);
    } else {
      addEmployeeHandler(employeeData);
    }

    // Resetowanie pól formularza
    setFirstName('');
    setLastName('');
    setPesel('');
    setPhoneNumber('');
    setJobTitle('');
    setClinicName('');
  };

  return (

    <form className="EmployeeAddForm" onSubmit={handleSubmit}>
      <ul>
        <li><h3>Formularz pracownika</h3></li>
        <br></br>
        <li>
          <label>Imię:</label>
          <br></br>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </li>
        <li>
          <label>Nazwisko:</label>
          <br></br>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </li>
        <li>
          <label>Pesel:</label>
          <br></br>
          <input type="text" value={pesel} onChange={(e) => setPesel(e.target.value)} required />
        </li>
        <li>
          <label>Numer telefonu:</label>
          <br></br>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </li>
        <li>
          <label>Stanowisko:</label>
          <br />
          <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
            <option value="">"Wybierz stanowisko"</option>
            {jobPositions.map(jobPosition => (
              <option key={jobPosition.id} value={jobPosition.jobTitle}>
                {jobPosition.jobTitle}
              </option>
            ))}
          </select>

        </li>
        <li>
          <label>Nazwa kliniki:</label>
          <br />
          <select value={clinicName} onChange={(e) => setClinicName(e.target.value)}>
            <option value="">Wybierz klinikę</option>
            {clinics.map(clinic => (
              <option key={clinic.id} value={clinic.name}>
                {clinic.name}
              </option>
            ))}
          </select>
        </li>
      </ul>
      <button type="submit">{employeeToEdit ? "Aktualizuj pracownika" : "Dodaj pracownika"}</button>

    </form>

  );
};

export default EmployeeAddForm;
