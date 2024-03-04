import React, { useState, useEffect } from 'react';

const EmployeeList = ({ employees, onAddButtonClick, deleteEmployee, editEmployee }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('firstName');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(
      employees.filter((employee) => {
        const value = String(employee[searchBy] || '').toLowerCase();
        return value.includes(searchText.toLowerCase());
      })
    );
    setCurrentPage(1); // Resetuj stronę przy każdej zmianie wyników wyszukiwania
  }, [searchText, searchBy, employees]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  

  // Obliczanie indeksów początkowego i końcowego elementu na bieżącej stronie
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Wybieranie wyników do wyświetlenia na bieżącej stronie
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // Obliczanie liczby stron paginacji na podstawie liczby wyników
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);

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
            <p  className='buttonParagraph'>
              <button onClick={() => deleteEmployee(employee.id)}>
                Usuń
              </button>
            </p>
          </li>
        ))}
      </ul>
      {searchResults.length > itemsPerPage && (
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
              <button onClick={() => handlePaginationChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
