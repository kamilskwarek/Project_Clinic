import React, { useState, useEffect, useCallback } from 'react';

const VisitList = ({ visits, onAddButtonClick, deleteVisit, editVisit, resetPage }) => {
    const [searchText] = useState('');
    const [searchBy] = useState('visitDate');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchResults, setSearchResults] = useState([]);
    const [patients, setPatients] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [searchDate, setSearchDate] = useState(getTodayDate());
    const [searchPatient, setSearchPatient] = useState('');
    const [searchEmployee, setSearchEmployee] = useState('');

    useEffect(() => {
        if (resetPage) {
            setCurrentPage(1);
        }
    }, [resetPage]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('https://localhost:7137/api/patient');
                const data = await response.json();
                setPatients(data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych pacjentów:', error);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await fetch('https://localhost:7137/api/employee');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Błąd podczas pobierania danych pracowników:', error);
            }
        };

        fetchPatients();
        fetchEmployees();
    }, []);


    const getPatientName = useCallback((patientId) => {
        const patient = patients.find(patient => patient.id === patientId);
        return patient ? `${patient.firstName} ${patient.lastName}` : '';
    }, [patients]);

    const getEmployeeName = useCallback((employeeId) => {
        const employee = employees.find(employee => employee.id === employeeId);
        return employee ? `${employee.firstName} ${employee.lastName}` : '';
    }, [employees]);

    useEffect(() => {
        const filteredResults = visits.filter((visit) => {
            const value = String(visit[searchBy] || '').toLowerCase();
            const patientName = getPatientName(visit.patientId).toLowerCase();
            const employeeName = getEmployeeName(visit.employeeId).toLowerCase();
            return value.includes(searchText.toLowerCase()) &&
                value.includes(searchDate.toLowerCase()) &&
                patientName.includes(searchPatient.toLowerCase()) &&
                employeeName.includes(searchEmployee.toLowerCase());
        });

        const newTotalPages = Math.ceil(filteredResults.length / itemsPerPage);
        setSearchResults(filteredResults);
        setCurrentPage(prevPage => {
            if (prevPage > newTotalPages) {
                return 1;
            }
            return prevPage;
        });
    }, [searchText, searchBy, visits, itemsPerPage, searchDate, searchPatient, searchEmployee, getEmployeeName, getPatientName]);

    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteVisit = (visitId) => {
        deleteVisit(visitId);
        const newTotalPages = Math.ceil((searchResults.length - 1) / itemsPerPage);
        setCurrentPage(prevPage => Math.min(prevPage, newTotalPages));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

    const formatVisitDate = (dateString) => {
        return dateString.split('T')[0];
    };


    const formatTime = (timeString) => {
        return timeString.substr(0, 5);
    };


    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();


        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        return `${year}-${month}-${day}`;
    }

    return (
        <div className="VisitList">
            <h2>Harmonogram Wizyt:</h2>
  


            <label>Wyszukaj </label>
            
            <div className="searchBar">
            <label>Data </label>

                <input
                    type="date"
                    placeholder="Data"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />

            <label>Pacjent </label>

                <input
                    type="text"
                    placeholder="Pacjent"
                    value={searchPatient}
                    onChange={(e) => setSearchPatient(e.target.value)}
                />

            <label>Lekarz </label>

                <input
                    type="text"
                    placeholder="Pracownik"
                    value={searchEmployee}
                    onChange={(e) => setSearchEmployee(e.target.value)}
                />

<button onClick={onAddButtonClick}>Dodaj Wizytę</button>
            </div>
            <ul>
                <li className='mainLi'>
                    <p className='idParagraph'>Id</p>
                    <p>Data wizyty</p>
                    <p className='timeParagraph'>Godzina rozpoczęcia</p>
                    <p className='timeParagraph'>Godzina zakończenia</p>
                    <p>Pacjent</p>
                    <p>Pracownik</p>
                    <p className='buttonParagraph'> Edytuj</p>
                    <p className='buttonParagraph'>Usuń</p>
                </li>
                {currentItems.map((visit) => (
                    <li key={visit.id} id={visit.id}>
                        <p className='idParagraph'>{visit.id}</p>
                        <p>{formatVisitDate(visit.visitDate)}</p>
                        <p className='timeParagraph'>{formatTime(visit.startTime)}</p>
                        <p className='timeParagraph'>{formatTime(visit.endTime)}</p>
                        <p>{getPatientName(visit.patientId)}</p>
                        <p>{getEmployeeName(visit.employeeId)}</p>
                        <p className='buttonParagraph'>
                            <button onClick={() => editVisit(visit)}>
                                Edytuj
                            </button>
                        </p>
                        <p className='buttonParagraph'>
                            <button onClick={() => handleDeleteVisit(visit.id)}>
                                Usuń
                            </button>
                        </p>
                    </li>
                ))}
            </ul>
            {searchResults.length > itemsPerPage && (
                <ul className="pagination">
                    <li>
                        <button onClick={() => handlePaginationChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
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
                        <button onClick={() => handlePaginationChange(currentPage + 1)} disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}>Next</button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default VisitList;
