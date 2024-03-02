import React, { useState } from 'react';

const PatientList = ({ patients, onAddButtonClick, deletePatient, editPatient }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };


  const filteredPatients = patients ? patients.filter((patient) => {
    const value = String(patient[searchBy] || '').toLowerCase();
    return value.includes(searchText.toLowerCase());
  }) : [];

  return (
    <div className="PatientList">
      <h2>Lista Pacjentów:</h2>
      <button onClick={onAddButtonClick}>Dodaj Pacjenta</button>

      <div className="searchBar">
        <select onChange={handleSearchByChange} value={searchBy}>
          <option value="firstName">Imię</option>
          <option value="lastName">Nazwisko</option>
          <option value="pesel">Pesel</option>
          <option value="phoneNumber">Nr. telefonu</option>
        </select>
        <input 
          type="text" 
          placeholder="Wyszukaj..." 
          value={searchText} 
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        <li className='mainLi'>
          <p className='idParagraph'>Id</p>
          <p>Imię</p>
          <p>Nazwisko</p>
          <p>Pesel</p>
          <p>Nr. telefonu</p>
          <p className='buttonParagraph'> Edytuj</p>
          <p className='buttonParagraph'>Usuń</p>
        </li>
        {filteredPatients.map((patient) => (
          <li key={patient.id} id={patient.id}>
            <p className='idParagraph'>{patient.id}</p>
            <p>{patient.firstName}</p>
            <p>{patient.lastName}</p>
            <p>{patient.pesel}</p>
            <p>{patient.phoneNumber}</p>
            <p className='buttonParagraph'>
                <button onClick={() => editPatient(patient)}>
                    Edytuj
                </button>
            </p>
            <p  className='buttonParagraph'>
                <button onClick={() => deletePatient(patient.id)}>
                    Usuń
                </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
