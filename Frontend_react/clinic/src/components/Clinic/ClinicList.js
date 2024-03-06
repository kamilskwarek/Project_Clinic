import React, { useState, useEffect } from 'react';

const ClinicList = ({ clinics, onAddButtonClick, deleteClinic, editClinic, resetPage }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (resetPage) {
      setCurrentPage(1);
    }
  }, [resetPage]);

  useEffect(() => {
    const filteredResults = clinics.filter((clinic) => {
      const value = String(clinic[searchBy] || '').toLowerCase();
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
  }, [searchText, searchBy, clinics, itemsPerPage]);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
};

const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
};

const handlePaginationChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleDeleteClinic = (clinicId) => {
    deleteClinic(clinicId);
    const newTotalPages = Math.ceil((searchResults.length - 1) / itemsPerPage);
    setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
};

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <div className="ClinicList">
      <h2>Lista placówek:</h2>
      <button onClick={onAddButtonClick}>Dodaj placówkę</button>

      <div className="searchBar">
        <select onChange={handleSearchByChange} value={searchBy}>
          <option value="name">Nazwa</option>
          {/* <option value="description">Opis</option> */}
          {/* <option value="contactEmail">Email</option> */}
          <option value="contactNumber">Nr. telefonu</option>
          <option value="city">Miasto</option>
          <option value="street">Ulica</option>
          <option value="buildingNumber">Nr. domu</option>
          <option value="postalCode">Kod Pocztowy</option>


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
          <p>Nazwa</p>
          {/* <p>Opis</p> */}
          {/* <p>Email</p> */}
          <p>Nr. telefonu</p>
          <p>Miasto</p>
          <p>Ulica</p>
          <p>Nr. budynku</p>
          <p>Kod Pocztowy</p>

          <p className='buttonParagraph'> Edytuj</p>
          <p className='buttonParagraph'>Usuń</p>
        </li>
        {currentItems.map((clinic) => (
          <li key={clinic.id} id={clinic.id}>
            <p className='idParagraph'>{clinic.id}</p>
            <p>{clinic.name}</p>
            {/* <p>{clinic.description}</p> */}
            {/* <p>{clinic.contactEmail}</p> */}
            <p>{clinic.contactNumber}</p>
            <p>{clinic.city}</p>
            <p>{clinic.street}</p>
            <p>{clinic.buildingNumber}</p>
            <p>{clinic.postalCode}</p>

            <p className='buttonParagraph'>
              <button onClick={() => editClinic(clinic)}>
                Edytuj
              </button>
            </p>
            <p className='buttonParagraph'>
              <button onClick={() => handleDeleteClinic(clinic.id)}>
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

export default ClinicList;
