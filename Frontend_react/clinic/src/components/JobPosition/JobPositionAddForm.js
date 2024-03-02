import React, { useState} from 'react';

const JobPositionAddForm = ({ addJobPositionHandler, editJobPositionHandler, jobPositionToEdit }) => {
  const [jobTitle, setJobTitle] = useState(jobPositionToEdit ? jobPositionToEdit.jobTitle : '');
  const [jobDescription, setJobDescription] = useState(jobPositionToEdit ? jobPositionToEdit.jobDescription : '');


  const handleSubmit = (e) => {
    e.preventDefault();
    const jobPositionData = {
      jobTitle,
      jobDescription,
    };

    if (jobPositionToEdit) {
      editJobPositionHandler(jobPositionData, jobPositionToEdit.id);
    } else {
      addJobPositionHandler(jobPositionData);
    }

    // Resetowanie pól formularza
    setJobTitle('');
    setJobDescription('');
  };

  return (
    
    <form className="JobPositionAddForm" onSubmit={handleSubmit}>
        <ul>
      <li><h3>Formularz stanowiska pracy</h3></li>
      <br></br>
      <li>
        <label>Stanowisko pracy:</label>
        <br></br>
        <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} required />
      </li>
      <li>
        <label>Opis stanowiska:</label>
        <br></br>
        <input type="text" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}/>
      </li>
      </ul>
      <button type="submit">{jobPositionToEdit ? "Aktualizuj stanowiska" : "Dodaj stanowisko"}</button>
    
    </form>

  );
};

export default JobPositionAddForm;
