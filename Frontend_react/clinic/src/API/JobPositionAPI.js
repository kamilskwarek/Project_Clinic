export const loadJobPositions = async () => {
  try {
    const response = await fetch('https://localhost:7137/api/jobposition');
    if (!response.ok) {
      throw new Error('Failed to fetch jobposition');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych stanowisk pracy:', error);
    throw error;
  }
};



export const updateJobPositionInAPI = async (
  JobPositionId,
  updatedJobPosition,
  refreshJobPositions,
  setIsJobPositionFormvisible,
  setJobPositionToEdit
) => {
  try {
    const response = await fetch(`https://localhost:7137/api/jobposition/${JobPositionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJobPosition),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update job position');
    }

    console.log("Zaktualizowano stanowisko: " + response.ok)
    await refreshJobPositions();
    setIsJobPositionFormvisible(false);
    setJobPositionToEdit(null);
  } catch (error) {
    console.error('Error during job position update:', error);
  }
};

export const addJobPositionToAPI = async (newJobPosition, setIsJobPositionFormvisible, refreshJobPositions) => {
  try {
    const response = await fetch('https://localhost:7137/api/jobposition/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJobPosition),
    });

    if (!response.ok) {
      throw new Error('Failed to add JobPosition');
    }

    const responseData = await response.json();
    console.log('Dodano stanowisko:', responseData);
  } catch (error) {
    console.error('Błąd przy dodawaniu stanowiska:', error.message);
  }
  await refreshJobPositions();
  setIsJobPositionFormvisible(false);
};

export const deleteJobPositionFromAPI = async (jobPositionId) => {
  try {
    const response = await fetch(`https://localhost:7137/api/jobposition/${jobPositionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete JobPosition');
    }

    console.log('Usunięto stanowisko:', jobPositionId);
  } catch (error) {
    console.error('Błąd przy usuwaniu stanowiska:', error.message);
  }
};

export const editJobPositionInAPI = async (editedJobPosition) => {
  try {
    const response = await fetch(`https://localhost:7137/api/jobposition/${editedJobPosition.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedJobPosition),
    });

    if (!response.ok) {
      throw new Error('Failed to edit JobPosition');
    }

    const responseData = await response.json();
    console.log('Edytowano stanowisko:', responseData);
  } catch (error) {
    console.error('Błąd przy edycji stanowiska:', error.message);
  }
};



export const refreshJobPositions = async (setJobPositions, loadJobPositions) => {
  const data = await loadJobPositions();
  setJobPositions(data);
};

export const showJobPositionAddForm = (setIsJobPositionFormvisible
) => {
  setIsJobPositionFormvisible
    (true);
};

export const handleEditJobPosition = (jobPosition, setJobPositionToEdit, setIsJobPositionFormvisible
) => {
  setJobPositionToEdit(jobPosition);
  setIsJobPositionFormvisible
    (true);
};

export const handleDeleteJobPosition = async (id, deleteJobPositionFromAPI, setJobPositions, loadJobPositions) => {
  try {
    await deleteJobPositionFromAPI(id);
    await refreshJobPositions(setJobPositions, loadJobPositions);
  } catch (error) {
    console.error('Error during job position deletion:', error);
  }
};
