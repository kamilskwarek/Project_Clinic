export const loadClinics = async () => {
    try {
      const response = await fetch('https://localhost:7137/api/clinic');
      if (!response.ok) {
        throw new Error('Failed to fetch clinics');
      }
  
      const data = await response.json();
      console.log('pobrano placówki')
      return data;
    } catch (error) {
      console.error('Wystąpił błąd podczas pobierania danych przychodni:', error);
      throw error;
    }
  };

  export const updateClinicInAPI = async (
    clinicId,
    updatedClinic,
    refreshClinic,
    setIsClinicFormVisible,
    setClinicToEdit
  ) => {
    try {
      const response = await fetch(`https://localhost:7137/api/clinic/${clinicId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedClinic),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update clinic');
      }
      console.log("Zaktualizowano placówkę: " + response.ok)
      
      await refreshClinic();
      setIsClinicFormVisible(false);
      setClinicToEdit(null);
    } catch (error) {
      console.error('Error during clinic update:', error);
    }
  };

  export const addClinicToAPI = async (newClinic, setIsClinicFormVisible, refreshClinics) => {
    try {
      const response = await fetch('https://localhost:7137/api/clinic/', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClinic),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add clinic');
      }
  
      const responseData = await response.json();
      console.log('Dodano placówkę:', responseData);
    } catch (error) {
      console.error('Błąd przy dodawaniu placówki:', error.message);
    }
    await refreshClinics();
    setIsClinicFormVisible(false); 
  };

  export const deleteClinicFromAPI = async (clinicId) => {
    try {
        const response = await fetch(`https://localhost:7137/api/clinic/${clinicId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (!response.ok) {
            throw new Error('Failed to delete clinic');
        }
  
        console.log('Usunięto placówkę:', clinicId);
    } catch (error) {
        console.error('Błąd przy usuwaniu placówki:', error.message);
    }
  };

  export const editClinicInAPI = async (editedClinic) => {
    try {
      const response = await fetch(`https:///localhost:7137/api/clinic/${editedClinic.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedClinic),
      });
  
      if (!response.ok) {
        throw new Error('Failed to edit clinic');
      }
  
      const responseData = await response.json();
      console.log('Edytowano placówkę:', responseData);
     
  
    } catch (error) {
      console.error('Błąd przy edycji placówki:', error.message);
    }
  };

  export const refreshClinics = async (setClinics, loadClinics) => {
    const data = await loadClinics();
    setClinics(data);
  };

  export const showClinicAddForm = (setIsClinicFormVisible) => {
    setIsClinicFormVisible(true);
  };

  export const handleEditClinic = (clinic, setClinicToEdit, setIsClinicFormVisible) => {
    setClinicToEdit(clinic);
    setIsClinicFormVisible(true);
  };

  export const handleDeleteClinic = async (id, deleteClinicFromAPI, setClinics, loadClinics) => {
    try {
      await deleteClinicFromAPI(id);
      await refreshClinics(setClinics, loadClinics);
    } catch (error) {
      console.error('Error during clinic deletion:', error);
    }
  };