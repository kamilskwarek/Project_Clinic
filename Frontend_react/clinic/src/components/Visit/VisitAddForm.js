import React, { useState, useEffect } from 'react';

const VisitAddForm = ({ addVisitHandler, editVisitHandler, visitToEdit }) => {
  const [visitDate, setVisitDate] = useState(visitToEdit ? visitToEdit.visitDate : '');
  const [startTime, setStartTime] = useState(visitToEdit ? visitToEdit.startTime : '');
  const [endTime, setEndTime] = useState(visitToEdit ? visitToEdit.endTime : '');
  const [notes, setNotes] = useState(visitToEdit ? visitToEdit.notes : '');
  const [selectedPatientId, setSelectedPatientId] = useState(visitToEdit ? visitToEdit.patientId : '');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(visitToEdit ? visitToEdit.employeeId : '');
  const [selectedClinicId, setSelectedClinicId] = useState(visitToEdit ? visitToEdit.clinicId : '');

  const [patients, setPatients] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);

  const [patientInputFocused, setPatientInputFocused] = useState(false);
  const [employeeInputFocused, setEmployeeInputFocused] = useState(false);
  const [clinicInputFocused, setClinicInputFocused] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://localhost:7137/api/patient', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych pacjentów:', error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://localhost:7137/api/employee', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych pracowników:', error);
      }
    };

    const fetchClinics = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://localhost:7137/api/clinic', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setClinics(data);
        setFilteredClinics(data);
      } catch (error) {
        console.error('Błąd podczas pobierania danych placówek:', error);
      }
    };

    fetchPatients();
    fetchEmployees();
    fetchClinics();
  }, []);

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const handleClinicChange = (e) => {
    setSelectedClinicId(e.target.value);
  };

  const filterPatients = (searchText) => {
    const filtered = patients.filter(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    });
    setFilteredPatients(filtered);
  };

  const filterEmployees = (searchText) => {
    const filtered = employees.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
      return fullName.includes(searchText.toLowerCase());
    });
    setFilteredEmployees(filtered);
  };

  const filterClinics = (searchText) => {
    const filtered = clinics.filter(clinic => {
      const clinicName = `${clinic.name}`.toLowerCase();
      return clinicName.includes(searchText.toLowerCase());
    });
    setFilteredClinics(filtered);
  };

  const handleTimeChange = (e, setTime) => {
    const { value } = e.target;
    const [hours, minutes] = value.split(':');
    const paddedHours = hours.padStart(2, '0');
    const paddedMinutes = minutes.padStart(2, '0');
    setTime(`${paddedHours}:${paddedMinutes}:00`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const visitData = {
      visitDate,
      startTime,
      endTime,
      notes,
      patientId: selectedPatientId,
      employeeId: selectedEmployeeId,
      clinicId: selectedClinicId
    };

    if (visitToEdit) {
      editVisitHandler(visitData, visitToEdit.id);
    } else {
      addVisitHandler(visitData);
    }

    // Resetowanie pól formularza
    setVisitDate('');
    setStartTime('');
    setEndTime('');
    setNotes('');
    setSelectedPatientId('');
    setSelectedEmployeeId('');
    setSelectedClinicId('');
  };

  return (
    <form className="VisitAddForm" onSubmit={handleSubmit}>
      <ul>
        <li><h3>Formularz wizyty</h3></li>
        <br />
        <li>
          <label>Data:</label>
          <br />
          <input
            type="date"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            required
          />
        </li>
        <li>
          <label>Godzina rozpoczęcia:</label>
          <br />
          <input
            type="time"
            value={startTime}
            onChange={(e) => handleTimeChange(e, setStartTime)}
            step="600"
            required
          />
        </li>
        <li>
          <label>Godzina zakończenia:</label>
          <br />
          <input
            type="time"
            value={endTime}
            onChange={(e) => handleTimeChange(e, setEndTime)}
            step="600"
            required
          />
        </li>
        <li>
          <label>Pacjent:</label>
          <br />
          <input
            className="patientInput"
            onFocus={() => setPatientInputFocused(true)}
            onBlur={() => setPatientInputFocused(false)}
            type="text"
            placeholder="Wyszukaj pacjenta..."
            onChange={(e) => filterPatients(e.target.value)}
          />
          <br />
          <select
            size={patientInputFocused ? 3 : 1}
            className={patientInputFocused ? 'expanded' : ''}
            value={selectedPatientId}
            onChange={handlePatientChange}
            required
          >
            <option value="">Wybierz pacjenta</option>
            {filteredPatients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {`${patient.firstName} ${patient.lastName}`}
              </option>
            ))}
          </select>
        </li>
        <br />
        <li>
          <label>Lekarz:</label>
          <br />
          <input
            className="employeeInput"
            type="text"
            onFocus={() => setEmployeeInputFocused(true)}
            onBlur={() => setEmployeeInputFocused(false)}
            placeholder="Wyszukaj lekarza..."
            onChange={(e) => filterEmployees(e.target.value)}
          />
          <br />
          <select
            size={employeeInputFocused ? 3 : 1}
            className={employeeInputFocused ? 'expanded' : ''}
            value={selectedEmployeeId}
            onChange={handleEmployeeChange}
            required
          >
            <option value="">Wybierz lekarza</option>
            {filteredEmployees.map(employee => (
              <option key={employee.id} value={employee.id}>
                {`${employee.firstName} ${employee.lastName}`}
              </option>
            ))}
          </select>
        </li>
        <br />
        <li>
          <label>Placówka:</label>
          <br />
          <input
            className="clinicInput"
            type="text"
            onFocus={() => setClinicInputFocused(true)}
            onBlur={() => setClinicInputFocused(false)}
            placeholder="Wyszukaj placówkę..."
            onChange={(e) => filterClinics(e.target.value)}
          />
          <br />
          <select
            size={clinicInputFocused ? 3 : 1}
            className={clinicInputFocused ? 'expanded' : ''}
            value={selectedClinicId}
            onChange={handleClinicChange}
            required
          >
            <option value="">Wybierz placówkę</option>
            {filteredClinics.map(clinic => (
              <option key={clinic.id} value={clinic.id}>
                {`${clinic.name}`}
              </option>
            ))}
          </select>
        </li>
        <br />
        <li>
          <label>Notatka:</label>
          <br />
          <textarea
            rows="4"
            cols="50"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </li>
      </ul>
      <button type="submit">{visitToEdit ? "Aktualizuj wizytę" : "Dodaj wizytę"}</button>
    </form>
  );
};

export default VisitAddForm;
