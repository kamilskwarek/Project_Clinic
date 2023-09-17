import React, { useState } from 'react';

const EmployeeList = ({ employees, onAddButtonClick, deleteEmployee, editEmployee }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) => {
    const value = String(employee[searchBy] || '').toLowerCase();
    return value.includes(searchText.toLowerCase());
  });

  return (
     <div className="EmployeeList">
      <h2>Lista pracowników:</h2>
      <button onClick={onAddButtonClick}>Dodaj pracownika</button>

      {/* Pasek wyszukiwania */}
      <div className="searchBar">
        <select onChange={handleSearchByChange} value={searchBy}>
          <option value="firstName">Imię</option>
          <option value="lastName">Nazwisko</option>
          <option value="jobPosition">Stanowisko</option>
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
        <li className='mainLi'><p className='idParagraph'>Id</p><p>Imię</p> <p>Nazwisko</p> <p>Stanowisko</p> <p>Pesel</p> <p>Nr. telefonu</p></li>

        {filteredEmployees.map((employee) => (
          <li key={employee.id} id={employee.id}>
            <p className='idParagraph'>{employee.id}</p>
            <p>{employee.firstName}</p>
            <p>{employee.lastName}</p>
            <p>{employee.jobPosition}</p>
            <p>{employee.pesel}</p>
            <p>{employee.phoneNumber} </p>
            <p className='buttonParagraph'>
                <button onClick={() => editEmployee(employee)}>
                    Edytuj
                </button>
            </p>
            <p className='buttonParagraph'>
                <button onClick={() => deleteEmployee(employee.id)}>
                    Usuń
                </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
