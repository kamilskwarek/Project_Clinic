import React, { useState, useEffect } from 'react';

const EmployeeList = ({ employees, onAddButtonClick, deleteEmployee, editEmployee }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');
  const [columnWidths, setColumnWidths] = useState({});
  const [rerenderCount, setRerenderCount] = useState(0); // Nowa zmienna stanu

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const calculateColumnWidths = () => {
    const columnWidths = {};
    const rows = document.querySelectorAll('.EmployeeList li');

    rows.forEach(row => {
      const cells = row.querySelectorAll('p');
      cells.forEach((cell, index) => {
        const cellWidth = cell.offsetWidth;
        const currentMaxWidth = columnWidths[index] || 0;
        columnWidths[index] = Math.max(currentMaxWidth, cellWidth);
      });
    });

    setColumnWidths(columnWidths);
  };

  useEffect(() => {
    calculateColumnWidths();
    window.addEventListener('resize', calculateColumnWidths);
    return () => window.removeEventListener('resize', calculateColumnWidths);
  }, [employees, rerenderCount]);

  useEffect(() => {
 
    setRerenderCount(prevCount => prevCount + 1);
  }, []); 

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
        <li className='mainLi'>
          <p className='idParagraph' style={{ width: columnWidths[0]}}>Id</p>
          <p style={{ width: columnWidths[1]}}>Imię</p>
          <p style={{ width: columnWidths[2]}}>Nazwisko</p>
          <p style={{ width: columnWidths[3]}}>Stanowisko</p>
          <p style={{ width: columnWidths[4]}}>Pesel</p>
          <p style={{ width: columnWidths[5]}}>Nr. telefonu</p>
          <p style={{ width: columnWidths[6]}}className='buttonParagraph'> Edytuj</p>
          <p style={{ width: columnWidths[7]}}className='buttonParagraph' >Usuń</p>
        </li>

        {filteredEmployees.map((employee, index) => (
          <li key={employee.id} id={employee.id}>
            <p className='idParagraph' style={{ width: columnWidths[0]}}>{employee.id}</p>
            <p style={{ width: columnWidths[1]}}>{employee.firstName}</p>
            <p style={{ width: columnWidths[2]}}>{employee.lastName}</p>
            <p style={{ width: columnWidths[3]}}>{employee.jobPosition}</p>
            <p style={{ width: columnWidths[4]}}>{employee.pesel}</p>
            <p style={{ width: columnWidths[5]}}>{employee.phoneNumber}</p>
            <p style={{ width: columnWidths[6]}}className='buttonParagraph'>
                <button onClick={() => editEmployee(employee)}>
                    Edytuj
                </button>
            </p>
            <p style={{ width: columnWidths[7]}}className='buttonParagraph'>
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
