import React, { useState} from 'react';

const JobPositionList = ({ jobPositions, onAddButtonClick, deleteJobPosition, editJobPosition }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('jobTitle');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };


  const filteredJobPositions =jobPositions ? jobPositions.filter((jobPosition) => {
    const value = String(jobPosition[searchBy] || '').toLowerCase();
    return value.includes(searchText.toLowerCase());
  }): [];

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

        {filteredJobPositions.map((jobPosition) => (
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
                <button onClick={() => deleteJobPosition(jobPosition.id)}>
                    Usuń
                </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobPositionList;
