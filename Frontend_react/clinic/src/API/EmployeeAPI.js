export const loadEmployees = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('https://localhost:7137/api/employee', {
      headers: {
        'Authorization': `Bearer ${token}` 
        
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania danych pracowników:', error);
    throw error;
  }
};

export const updateEmployeeInAPI = async (
  employeeId,
  updatedEmployee,
  refreshEmployees,
  setIsEmployeeFormVisible,
  setEmployeeToEdit
) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://localhost:7137/api/employee/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(updatedEmployee),
    });

    if (!response.ok) {
      throw new Error('Failed to update employee');
    }
    console.log("Zaktualizowano pracownika: " + response.ok)

    await refreshEmployees();
    setIsEmployeeFormVisible(false);
    setEmployeeToEdit(null);
  } catch (error) {
    console.error('Error during employee update:', error);
  }
};


export const addEmployeeToAPI = async (newEmployee, setIsEmployeeFormVisible, refreshEmployees) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('https://localhost:7137/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(newEmployee),
    });

    if (!response.ok) {
      throw new Error('Failed to add employee');
    }

    const responseData = await response.json();
    console.log('Dodano pracownika:', responseData);
  } catch (error) {
    console.error('Błąd przy dodawaniu pracownika:', error.message);
  }
  await refreshEmployees();

  setIsEmployeeFormVisible(false);
};




export const deleteEmployeeFromAPI = async (employeeId) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https://localhost:7137/api/employee/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete employee');
    }

    console.log('Usunięto pracownika:', employeeId);
  } catch (error) {
    console.error('Błąd przy usuwaniu pracownika:', error.message);
  }
};


export const editEmployeeInAPI = async (editedEmployee) => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(`https:///localhost:7137/api/employee/${editedEmployee.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 

      },
      body: JSON.stringify(editedEmployee),
    });

    if (!response.ok) {
      throw new Error('Failed to edit employee');
    }

    const responseData = await response.json();
    console.log('Edytowano pracownika:', responseData);


  } catch (error) {
    console.error('Błąd przy edycji pracownika:', error.message);
  }
};

export const refreshEmployees = async (setEmployees, loadEmployees) => {
  const data = await loadEmployees();
  setEmployees(data);
};

export const showEmployeeAddForm = (setIsEmployeeFormVisible) => {
  setIsEmployeeFormVisible(true);
};

export const handleEditEmployee = (employee, setEmployeeToEdit, setIsEmployeeFormVisible) => {
  setEmployeeToEdit(employee);
  setIsEmployeeFormVisible(true);
};

export const handleDeleteEmployee = async (id, deleteEmployeeFromAPI, setEmployees, loadEmployees) => {
  try {
    await deleteEmployeeFromAPI(id);
    await refreshEmployees(setEmployees, loadEmployees);
  } catch (error) {
    console.error('Error during employee deletion:', error);
  }
};
