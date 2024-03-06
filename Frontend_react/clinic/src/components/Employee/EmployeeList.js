import React, { useState, useEffect } from 'react';

const EmployeeList = ({ employees, onAddButtonClick, deleteEmployee, editEmployee, resetPage }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  useEffect(() => {
    const filteredResults = employees.filter((employee) => {
      const value = String(employee[searchBy] || '').toLowerCase();
      return value.includes(searchText.toLowerCase());
    });

    const newTotalPages = Math.ceil(filteredResults.length / itemsPerPage);
    setSearchResults(filteredResults);
    setCurrentPage(prevPage => {
      if (prevPage > newTotalPages) {
        return 1;
      }
      return prevPage;
    });
  }, [searchText, searchBy, employees, itemsPerPage]);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteEmployee = (employeeId) => {
    deleteEmployee(employeeId);
    const newTotalPages = Math.ceil((searchResults.length - 1) / itemsPerPage);
    setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="EmployeeList">
      <h2>Lista pracowników:</h2>
      <button onClick={onAddButtonClick}>Dodaj pracownika</button>

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
          <p className='idParagraph'>Id</p>
          <p>Imię</p>
          <p>Nazwisko</p>
          <p>Stanowisko</p>
          <p>Pesel</p>
          <p>Nr. telefonu</p>
          <p className='buttonParagraph'> Edytuj</p>
          <p className='buttonParagraph'>Usuń</p>
        </li>
        {currentItems.map((employee) => (
          <li key={employee.id} id={employee.id}>
            <p className='idParagraph'>{employee.id}</p>
            <p>{employee.firstName}</p>
            <p>{employee.lastName}</p>
            <p>{employee.jobPosition}</p>
            <p>{employee.pesel}</p>
            <p>{employee.phoneNumber}</p>
            <p className='buttonParagraph'>
              <button onClick={() => editEmployee(employee)}>
                Edytuj
              </button>
            </p>
            <p className='buttonParagraph'>
              <button onClick={() => handleDeleteEmployee(employee.id)}>
                Usuń
              </button>
            </p>
          </li>
        ))}
      </ul>
      {searchResults.length > itemsPerPage && (
        <ul className="pagination">
          <li>
            <button onClick={() => handlePaginationChange(currentPage - 1)} disabled={currentPage === 1}>Poprzednia</button>
          </li>
          {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }).map((_, index) => (
            <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
              <button
                onClick={() => handlePaginationChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button onClick={() => handlePaginationChange(currentPage + 1)} disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}>Następna</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
