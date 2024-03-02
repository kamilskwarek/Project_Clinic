import React, { useState } from 'react';

const ClinicList = ({ clinics, onAddButtonClick, deleteClinic, editClinic }) => {
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };


  const filteredClinics = clinics ? clinics.filter((clinic) => {
    const value = String(clinic[searchBy] || '').toLowerCase();
    return value.includes(searchText.toLowerCase());
  }) : [];

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
        {filteredClinics.map((clinic) => (
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
            <p  className='buttonParagraph'>
                <button onClick={() => deleteClinic(clinic.id)}>
                    Usuń
                </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicList;
