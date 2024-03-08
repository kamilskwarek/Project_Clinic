import React, { useState } from 'react';

const ClinicAddForm = ({ addClinicHandler, editClinicHandler, clinicToEdit}) => {
  const [name, setName] = useState(clinicToEdit ? clinicToEdit.name : '');
  const [description, setDescription] = useState(clinicToEdit ? clinicToEdit.description : '');
  const [contactEmail, setContactEmail] = useState(clinicToEdit ? clinicToEdit.contactEmail : '');
  const [contactNumber, setContactNumber] = useState(clinicToEdit ? clinicToEdit.contactNumber : '');
  const [city, setCity] = useState(clinicToEdit ? clinicToEdit.city : '');
  const [street, setStreet] = useState(clinicToEdit ? clinicToEdit.street : '');
  const [buildingNumber, setBuildingNumber] = useState(clinicToEdit ? clinicToEdit.buildingNumber : '');
  const [postalCode, setPostalCode] = useState(clinicToEdit ? clinicToEdit.postalCode : '');

 


  const handleSubmit = (e) => {
    e.preventDefault();
    const clinicData = {
      name,
      description,
      contactEmail,
      contactNumber,
      city,
      street,
      buildingNumber,
      postalCode
    };

    if (!isFormValid()) {
      return;
    }

    if (clinicToEdit) {
      editClinicHandler(clinicData, clinicToEdit.id);
    } else {
      addClinicHandler(clinicData);
    }

    // Resetowanie pól formularza
    setName('');
    setDescription('');
    setContactEmail('');
    setContactNumber('');
    setCity('');
    setStreet('');
    setBuildingNumber('');
    setPostalCode('');
  };

  const isFormValid = () => {
 
    if (!name.trim()) {
      alert("Nazwa placówki jest wymagana!");
      return false;
    }

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(contactEmail)) {
      alert("Nieprawidłowy format adresu email!");
      return false;
    }

  
    if (!/^\d+-?\d+$/.test(contactNumber)) {
      alert("Numer telefonu musi zawierać tylko cyfry i znak '-'!");
      return false;
    }


    return true;
  };

  return (
    
    <form className="ClinicAddForm" onSubmit={handleSubmit}>
        <ul>
      <li><h3>Formularz placówki</h3></li>
      <br></br>
      <li>
        <label>Nazwa:</label>
        <br></br>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </li>
      <li>
        <label>Opis:</label>
        <br></br>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </li>
      <li>
        <label>Email:</label>
        <br></br>
        <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
      </li>
      <li>
        <label>Nr. telefonu:</label>
        <br></br>
        <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
      </li>
      <li>
        <label>Miasto:</label>
        <br></br>
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </li>
      <li>
        <label>Ulica:</label>
        <br></br>
        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
      </li>
      <li>
        <label>Nr. domu:</label>
        <br></br>
        <input type="text" value={buildingNumber} onChange={(e) => setBuildingNumber(e.target.value)} required />
      </li>
      <li>
        <label>Kod Pocztowy:</label>
        <br></br>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </li>
      </ul>
      <button type="submit">{clinicToEdit ? "Aktualizuj placówkę" : "Dodaj placówkę"}</button>
    
    </form>

  );
};

export default ClinicAddForm;
