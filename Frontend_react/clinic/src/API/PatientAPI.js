export const loadPatients = async () => {
    try {
      const response = await fetch('https://localhost:7137/api/patient');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych pacjentów:', error);
      throw error;
    }
  };
  
  export const updatePatientInAPI = async (
    patientId,
    updatedPatient,
    refreshPatients,
    setIsPatientFormVisible,
    setPatientToEdit
  ) => {
    try {
      const response = await fetch(`https://localhost:7137/api/patient/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update patient');
      }
  
      await refreshPatients();
      setIsPatientFormVisible(false);
      setPatientToEdit(null);
    } catch (error) {
      console.error('Error during patient update:', error);
    }
  };
  
  
  export const addPatientToAPI = async (newPatient, setIsPatientFormVisible, callback) => {
    try {
      const response = await fetch('https://localhost:7137/api/patient/', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add patient');
      }
  
      const responseData = await response.json();
      console.log('Dodano pacjenta:', responseData);
    } catch (error) {
      console.error('Błąd przy dodawaniu pacjenta:', error.message);
    }
    setIsPatientFormVisible(false); 
    callback();
  };
  
  
  
  
  export const deletePatientFromAPI = async (patientId, callback) => {
    try {
        const response = await fetch(`https://localhost:7137/api/patient/${patientId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete patient');
        }
  
        console.log('Usunięto pacjenta:', patientId);
        callback();
    } catch (error) {
        console.error('Błąd przy usuwaniu pacjenta:', error.message);
    }
  };
  
  
  export const editPatientInAPI = async (editedPatient) => {
    try {
      const response = await fetch(`https:///localhost:7137/api/patient/${editedPatient.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPatient),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit patient');
      }
  
      const responseData = await response.json();
      console.log('Edytowano pacjenta:', responseData);
     
  
    } catch (error) {
      console.error('Błąd przy edycji pacjenta:', error.message);
    }
  };
  
  export const refreshPatients = async (setPatients, loadPatients) => {
    const data = await loadPatients();
    setPatients(data);
  };
  
  export const showPatientAddForm = (setIsPatientFormVisible) => {
    setIsPatientFormVisible(true);
  };
  
  export const handleEditPatient = (patient, setPatientToEdit, setIsPatientFormVisible) => {
    setPatientToEdit(patient);
    setIsPatientFormVisible(true);
  };
  
  export const handleDeletePatient = async (id, deletePatientFromAPI, setPatients, loadPatients) => {
    try {
      await deletePatientFromAPI(id);
      await refreshPatients(setPatients, loadPatients);
    } catch (error) {
      console.error('Error during patient deletion:', error);
    }
  };
  