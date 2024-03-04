import React, { useState } from 'react';

const PatientAddForm = ({ addPatientHandler, editPatientHandler, patientToEdit }) => {
  const [page, setPage] = useState(1); // Stan do śledzenia aktualnej strony

  // Stan dla pól formularza na każdej stronie
  const [formDataPage1, setFormDataPage1] = useState({
    firstName: patientToEdit ? patientToEdit.firstName : '',
    lastName: patientToEdit ? patientToEdit.lastName : '',
    pesel: patientToEdit ? patientToEdit.pesel : '',
    birthDate: patientToEdit ? patientToEdit.birthDate : '',
    gender: patientToEdit ? patientToEdit.gender : '',
    phoneNumber: patientToEdit ? patientToEdit.phoneNumber : '',
    email: patientToEdit ? patientToEdit.email : '',
    city: patientToEdit ? patientToEdit.city : '',
    street: patientToEdit ? patientToEdit.street : '',
    apartmentNumber: patientToEdit ? patientToEdit.apartmentNumber : '',
    postalCode: patientToEdit ? patientToEdit.postalCode : '',

  });

  const [formDataPage2, setFormDataPage2] = useState({
    pregnant: patientToEdit ? patientToEdit.pregnant : '',
    pregnantRemarks: patientToEdit ? patientToEdit.pregnantRemarks : '',
    smoking: patientToEdit ? patientToEdit.smoking : '',
    smokingRemarks: patientToEdit ? patientToEdit.smokingRemarks : '',
    alcohol: patientToEdit ? patientToEdit.alcohol : '',
    alcoholRemarks: patientToEdit ? patientToEdit.alcoholRemarks : '',
    specialDiet: patientToEdit ? patientToEdit.specialDiet : '',
    specialDietRemarks: patientToEdit ? patientToEdit.specialDietRemarks : '',
    allergies: patientToEdit ? patientToEdit.allergies : '',
    allergiesRemarks: patientToEdit ? patientToEdit.allergiesRemarks : '',

  });

  const [formDataPage3, setFormDataPage3] = useState({
    medications: patientToEdit ? patientToEdit.medications : '',
    surgeries: patientToEdit ? patientToEdit.surgeries : '',
    hospitalizations: patientToEdit ? patientToEdit.hospitalizations : '',
    asthma: patientToEdit ? patientToEdit.asthma : '',
    heartDisease: patientToEdit ? patientToEdit.heartDisease : '',
    prostateCancer: patientToEdit ? patientToEdit.prostateCancer : '',
    hypertension: patientToEdit ? patientToEdit.hypertension : '',
    diabetes: patientToEdit ? patientToEdit.diabetes : '',
    breastCancer: patientToEdit ? patientToEdit.breastCancer : '',
    ovarianCancer: patientToEdit ? patientToEdit.ovarianCancer : '',
    metalIllness: patientToEdit ? patientToEdit.metalIllness : '',
    other: patientToEdit ? patientToEdit.other : '',
    otherRemarks: patientToEdit ? patientToEdit.otherRemarks : '',



  });

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      ...formDataPage1,
      ...formDataPage2,
      ...formDataPage3,
    };

    if (patientToEdit) {
      editPatientHandler(patientData, patientToEdit.id);
    } else {
      addPatientHandler(patientData);
    }
  };



  return (
    <form className="PatientAddForm" onSubmit={handleSubmit}>
      {page === 1 && (
        <div>
          <ul>
            <li>
              <label>Imię:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.firstName}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, firstName: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Nazwisko:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.lastName}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, lastName: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Pesel:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.pesel}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, pesel: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Data urodzenia:</label>
              <br />
              <input
                type="date"
                value={formDataPage1.birthDate ? new Date(formDataPage1.birthDate).toLocaleDateString('en-CA') : ''} // Formatowanie daty
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, birthDate: e.target.value })}
                required
              />
            </li>
            <li>
              <label>Płeć:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.gender}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, gender: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Numer telefonu:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.phoneNumber}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, phoneNumber: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Email:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.email}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, email: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Miasto:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.city}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, city: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Ulica:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.street}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, street: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Nr. domu:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.apartmentNumber}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, apartmentNumber: e.target.value })
                }
                required
              />
            </li>
            <li>
              <label>Kod pocztowy:</label>
              <br />
              <input
                type="text"
                value={formDataPage1.postalCode}
                onChange={(e) =>
                  setFormDataPage1({ ...formDataPage1, postalCode: e.target.value })
                }
                required
              />
            </li>

          </ul>
          <button type="button" onClick={handleNextPage}>
            Dalej
          </button>
        </div>
      )}

      {page === 2 && (
        <div>
          <ul>
            <li>
              Ciąża:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage2.pregnant}
                  onChange={(e) => setFormDataPage2({ ...formDataPage2, pregnant: e.target.checked })}
                />
              </label>
            </li>


            <li>
              <label>Ciąża uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage2.pregnantRemarks}
                onChange={(e) => setFormDataPage2({ ...formDataPage2, pregnantRemarks: e.target.value })}
              ></textarea>
            </li>

            <li>
              Palenie:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage2.smoking}
                  onChange={(e) => setFormDataPage2({ ...formDataPage2, smoking: e.target.checked })}
                />
              </label>
            </li>

            <li>
              <label>Palenie uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage2.smokingRemarks}
                onChange={(e) => setFormDataPage2({ ...formDataPage2, smokingRemarks: e.target.value })}
              ></textarea>
            </li>
            <li>
              Alkohol:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage2.alcohol}
                  onChange={(e) => setFormDataPage2({ ...formDataPage2, alcohol: e.target.checked })}
                />
              </label>
            </li>


            <li>
              <label>Alkohol uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage2.alcoholRemarks}
                onChange={(e) => setFormDataPage2({ ...formDataPage2, alcoholRemarks: e.target.value })}
              ></textarea>
            </li>
            <li>
              Spcejalna dieta:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage2.specialDiet}
                  onChange={(e) => setFormDataPage2({ ...formDataPage2, specialDiet: e.target.checked })}
                />
              </label>
            </li>

            <li>
              <label>Spcejalna dieta uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage2.specialDietRemarks}
                onChange={(e) => setFormDataPage2({ ...formDataPage2, specialDietRemarks: e.target.value })}
              ></textarea>
            </li>
            <li>
              Alergie:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage2.allergies}
                  onChange={(e) => setFormDataPage2({ ...formDataPage2, allergies: e.target.checked })}
                />
              </label>
            </li>
            <li>
              <label>Alergie uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage2.allergiesRemarks}
                onChange={(e) => setFormDataPage2({ ...formDataPage2, allergiesRemarks: e.target.value })}
              ></textarea>
            </li>
            {/* Pozostałe pola dla drugiej strony */}
          </ul>
          <button type="button" onClick={handlePreviousPage}>
            Wstecz
          </button>
          <button type="button" onClick={handleNextPage}>
            Dalej
          </button>
        </div>
      )}

      {page === 3 && (
        <div>
          <ul>
            <li>
              <label>Leki:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage3.medications}
                onChange={(e) => setFormDataPage3({ ...formDataPage3, medications: e.target.value })}
              />
            </li>

            <li>
              <label>Operacje:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage3.surgeries}
                onChange={(e) => setFormDataPage3({ ...formDataPage3, surgeries: e.target.value })}
              />
            </li>




            <li>
              Hospitalizacja:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.hospitalizations}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, hospitalizations: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Astma:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.asthma}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, asthma: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Choroby serca:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.heartDisease}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, heartDisease: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Rak prostaty:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.prostateCancer}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, prostateCancer: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Nadciśnienie:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.hypertension}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, hypertension: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Cukrzyca:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.diabetes}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, diabetes: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Rak piersi:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.breastCancer}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, breastCancer: e.target.checked })}
                />
              </label>
            </li>
            <li>
              Rak jajnika:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.ovarianCancer}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, ovarianCancer: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Choroba umysłowa:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.metalIllness}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, metalIllness: e.target.checked })}
                />
              </label>
            </li>

            <li>
              Inne:
              <label>
                <input
                  type="checkbox"
                  checked={formDataPage3.other}
                  onChange={(e) => setFormDataPage3({ ...formDataPage3, other: e.target.checked })}
                />
              </label>
            </li>

            <li>
              <label>Inne uwagi:</label>
              <br />
              <textarea rows="4" cols="50"
                value={formDataPage3.otherRemarks}
                onChange={(e) => setFormDataPage3({ ...formDataPage3, otherRemarks: e.target.value })}
              />
            </li>
            {/* Pozostałe pola dla trzeciej strony */}
          </ul>
          <button type="button" onClick={handlePreviousPage}>
            Wstecz
          </button>
          <button type="submit">{patientToEdit ? 'Aktualizuj pacjenta' : 'Dodaj pacjenta'}</button>
        </div>
      )}
    </form>
  );
};

export default PatientAddForm;
