import React, { useState, useEffect } from 'react';

const JobPositionList = ({ jobPositions, onAddButtonClick, deleteJobPosition, editJobPosition, resetPage }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('jobTitle');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  useEffect(() => {
    const filteredResults = jobPositions.filter((jobPosition) => {
      const value = String(jobPosition[searchBy] || '').toLowerCase();
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
  }, [searchText, searchBy, jobPositions, itemsPerPage]);


  
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteJobPosition = (jobPositionId) => {
    deleteJobPosition(jobPositionId);
    const newTotalPages = Math.ceil((searchResults.length - 1) / itemsPerPage);
    setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="JobPositionList">
      <h2>Lista stanowisk pracy:</h2>
      <button onClick={onAddButtonClick}>Dodaj stanowisko</button>

      {/* Pasek wyszukiwania */}
      <div className="searchBar">
        <select onChange={handleSearchByChange} value={searchBy}>
          <option value="jobTitle">Stanowisko</option>
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
          <p>Stanowisko</p>
          <p>Opis</p>
          <p className='buttonParagraph'> Edytuj</p>
          <p className='buttonParagraph' >Usuń</p>
        </li>

        {currentItems.map((jobPosition) => (
          <li key={jobPosition.id} id={jobPosition.id}>
            <p className='idParagraph' >{jobPosition.id}</p>
            <p>{jobPosition.jobTitle}</p>
            {<p></p>}

            {/* <p>{jobPosition.jobDescription}</p> */}
            <p className='buttonParagraph'>
              <button onClick={() => editJobPosition(jobPosition)}>
                Edytuj
              </button>
            </p>
            <p className='buttonParagraph'>
              <button onClick={() => handleDeleteJobPosition(jobPosition.id)}>
                Usuń
              </button>
            </p>
          </li>
        ))}
      </ul>
      {searchResults.length > itemsPerPage && (
        <ul className="pagination">
          <li>
            <button onClick={() => handlePaginationChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
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
            <button onClick={() => handlePaginationChange(currentPage + 1)} disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}>Next</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default JobPositionList;
