export const loadVisits = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://localhost:7137/api/visit', {
      headers: {
        'Authorization': `Bearer ${token}` 
        
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch visit');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych wizyty:', error);
    throw error;
  }
};

export const updateVisitInAPI = async (
  VisitId,
  updatedVisit,
  refreshVisit,
  setIsVisitFormVisible,
  setVisitToEdit
) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://localhost:7137/api/Visit/${VisitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(updatedVisit),
    });

    if (!response.ok) {
      throw new Error('Failed to update Visit');
    }
    console.log("Zaktualizowano wizytę: " + response.ok)

    await refreshVisit();
    setIsVisitFormVisible(false);
    setVisitToEdit(null);
  } catch (error) {
    console.error('Error during Visit update:', error);
  }
};

export const addVisitToAPI = async (newVisit, setIsVisitFormVisible, refreshVisits) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('https://localhost:7137/api/Visit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(newVisit),
    });

    if (!response.ok) {
      throw new Error('Failed to add Visit');
    }

    const responseData = await response.json();
    console.log('Dodano wizytę:', responseData);
  } catch (error) {
    console.error('Błąd przy dodawaniu wizyty:', error.message);
    console.log(JSON.stringify(newVisit))

  }
  await refreshVisits();
  setIsVisitFormVisible(false);
};

export const deleteVisitFromAPI = async (VisitId) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://localhost:7137/api/Visit/${VisitId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Visit');
    }

    console.log('Usunięto placówkę:', VisitId);
  } catch (error) {
    console.error('Błąd przy usuwaniu wizyty:', error.message);
  }
};

export const editVisitInAPI = async (editedVisit) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https:///localhost:7137/api/Visit/${editedVisit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(editedVisit),
    });

    if (!response.ok) {
      throw new Error('Failed to edit Visit');
    }

    const responseData = await response.json();
    console.log('Edytowano wizytę:', responseData);


  } catch (error) {
    console.error('Błąd przy edycji wizyty:', error.message);
  }
};

export const refreshVisits = async (setVisits, loadVisits) => {
  const data = await loadVisits();
  setVisits(data);
};

export const showVisitAddForm = (setIsVisitFormVisible) => {
  setIsVisitFormVisible(true);
};

export const handleEditVisit = (Visit, setVisitToEdit, setIsVisitFormVisible) => {
  setVisitToEdit(Visit);
  setIsVisitFormVisible(true);
};

export const handleDeleteVisit = async (id, deleteVisitFromAPI, setVisits, loadVisits) => {
  try {
    await deleteVisitFromAPI(id);
    await refreshVisits(setVisits, loadVisits);
  } catch (error) {
    console.error('Error during Visit deletion:', error);
  }
};