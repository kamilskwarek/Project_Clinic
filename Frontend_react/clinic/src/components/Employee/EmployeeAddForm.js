import React, { useState, useEffect } from 'react';

const EmployeeAddForm = ({ addEmployeeHandler, editEmployeeHandler, employeeToEdit }) => {



  const [firstName, setFirstName] = useState(employeeToEdit ? employeeToEdit.firstName : '');
  const [lastName, setLastName] = useState(employeeToEdit ? employeeToEdit.lastName : '');
  const [pesel, setPesel] = useState(employeeToEdit ? employeeToEdit.pesel : '');
  const [phoneNumber, setPhoneNumber] = useState(employeeToEdit ? employeeToEdit.phoneNumber : '');
  const [email, setEmail] = useState(employeeToEdit ? employeeToEdit.email : '');
  const [passwordHash, setPasswordHash] = useState(employeeToEdit ? employeeToEdit.passwordHash : ''); 
  const [confirmPassword, setConfirmPassword] = useState(employeeToEdit ? employeeToEdit.confirmPassword : '');

  const [jobTitle, setJobTitle] = useState(employeeToEdit ? employeeToEdit.jobPosition : '');
  const [jobPositions, setJobPositions] = useState(employeeToEdit && Array.isArray(employeeToEdit.jobPosition) ? employeeToEdit.jobPosition : [])
  
  const [clinicName, setClinicName] = useState(employeeToEdit ? employeeToEdit.clinic : '');
  const [clinics, setClinics] = useState(employeeToEdit && Array.isArray(employeeToEdit.clinic) ? employeeToEdit.clinic : []);

  useEffect(() => {
    fetchClinics();
    fetchJobPositions();
    
  }, []);

  const fetchClinics = async () => {
    try {
    const token = localStorage.getItem('token');

      const response = await fetch('https://localhost:7137/api/clinic/',{

      headers: {
        'Authorization': `Bearer ${token}` 
        
      }
      });
      const data = await response.json();
      setClinics(data);
    } catch (error) {
      console.error('Błąd podczas pobierania klinik:', error);
    }
  };

  const fetchJobPositions = async () => {
    try {
    const token = localStorage.getItem('token');

      const response = await fetch('https://localhost:7137/api/jobposition',{

      headers: {
        'Authorization': `Bearer ${token}` 
        
      }
      });
      const data = await response.json();
      setJobPositions(data);
    } catch (error) {
      console.error('Bład podczas pobierania stanowisk pracy')
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      return;
    }
    const employeeData = {
      firstName,
      lastName,
      pesel,
      phoneNumber,
      email,
      passwordHash,
      confirmPassword,
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
    setPasswordHash('');
    setConfirmPassword('');
    setJobTitle('');
    setClinicName('');
  };

  const isFormValid = () => {

    if (!firstName.trim()) {
      alert("Imię jest wymagane!");
      return false;
    }
    if (!lastName.trim()) {
      alert("Nazwisko jest wymagane!");
      return false;
    }
    if (!/^\d{11}$/.test(pesel)) {
      alert("PESEL musi składać się z 11 cyfr!");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Nieprawidłowy format adresu email!");
      return false;
    }
    if (passwordHash.length < 8) {
      alert("Hasło musi mieć co najmniej 8 znaków!");
      return false;
    }
    if (!/^\d+-?\d+$/.test(phoneNumber)) {
      alert("Numer telefonu musi zawierać tylko cyfry i znak '-'!");
      return false;
    }
    return true;
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
          <label>Email:</label>
          <br></br>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </li>
        <li>
          <label>Hasło:</label>
          <br></br>
          <input type="password" value={passwordHash} onChange={(e) => setPasswordHash(e.target.value)} required />
        </li>
        <li>
          <label>Potwierdź hasło:</label>
          <br></br>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </li>
        <li>
          <label>Stanowisko:</label>
          <br />
          <select value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}>
            <option value="">Wybierz stanowisko</option>
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
