import React, { useState } from 'react';

const PatientAddForm = ({ addPatientHandler, editPatientHandler, patientToEdit }) => {
 const [firstName, setFirstName] = useState(patientToEdit ? patientToEdit.firstName : '');
 const [lastName, setLastName] = useState(patientToEdit ? patientToEdit.lastName : '');
 const [pesel, setPesel] = useState(patientToEdit ? patientToEdit.pesel : '');
 const [birthDate, setBirthDate] = useState(patientToEdit ? patientToEdit.birthDate : '');
 const [gender, setGender] = useState(patientToEdit ? patientToEdit.gender : '');

 const [phoneNumber, setPhoneNumber] = useState(patientToEdit ? patientToEdit.phoneNumber : '');
 const [email, setEmail] = useState(patientToEdit ? patientToEdit.email : '');
 const [city, setCity] = useState(patientToEdit ? patientToEdit.city : '');
 const [street, setStreet] = useState(patientToEdit ? patientToEdit.street : '');
 const [apartmentNumber, setApartmentNumber] = useState(patientToEdit ? patientToEdit.apartmentNumber : '');
 const [postalCode, setPostalCode] = useState(patientToEdit ? patientToEdit.postalCode : '');

 const [pregnant, setPregnant] = useState(patientToEdit ? patientToEdit.pregnant : false);
 const [pregnantRemakrs, setPregnantRemakrs] = useState(patientToEdit ? patientToEdit.pregnantRemakrs : false);

 const [smoking, setSmoking] = useState(patientToEdit ? patientToEdit.smoking : false);
 const [smokingRemakrs, setSmokingRemakrs] = useState(patientToEdit ? patientToEdit.smokingRemakrs : false);

 const [alcohol, setAlcohol] = useState(patientToEdit ? patientToEdit.alcohol : false);
 const [alcoholRemakrs, setAlcoholRemakrs] = useState(patientToEdit ? patientToEdit.alcoholRemakrs : false);

 const [specialDiet, setSpecialDiet] = useState(patientToEdit ? patientToEdit.specialDiet : false);
 const [specialDietRemakrs, setSpecialDietRemakrs] = useState(patientToEdit ? patientToEdit.specialDietRemakrs : false);

 const [allergies, setAllergies] = useState(patientToEdit ? patientToEdit.allergies : false);
 const [allergiesRemakrs, setAllergiesRemakrs] = useState(patientToEdit ? patientToEdit.allergiesRemakrs : false);

 const [medications, setMedications] = useState(patientToEdit ? patientToEdit.medications : '');
 const [surgerys, setSurgerys] = useState(patientToEdit ? patientToEdit.surgerys : '');
 const [hospitalizations, setHospitalizations] = useState(patientToEdit ? patientToEdit.hospitalizations : '');
 const [asthma, setAsthma] = useState(patientToEdit ? patientToEdit.asthma : false);
 const [heartDisease, setHeartDisease] = useState(patientToEdit ? patientToEdit.heartDisease : false);
 const [prostateCaner, setProstateCaner] = useState(patientToEdit ? patientToEdit.prostateCaner : false);

 const [hypertension, setHypertension] = useState(patientToEdit ? patientToEdit.hypertension : false);
 const [diabetes, setDiabetes] = useState(patientToEdit ? patientToEdit.diabetes : false);


 const [breastCancer, setBreastCancer] = useState(patientToEdit ? patientToEdit.breastCancer : false);
 const [ovarianCancer, setOvarianCancer] = useState(patientToEdit ? patientToEdit.ovarianCancer : false);
 const [metalIllness, setMetalIllness] = useState(patientToEdit ? patientToEdit.metalIllness : false);
 const [other, setOther] = useState(patientToEdit ? patientToEdit.other : false);
 const [otherRemarks, setOtherRemarks] = useState(patientToEdit ? patientToEdit.otherRemarks : false);




  const handleSubmit = (e) => {
    e.preventDefault();
    const patientData = {
      firstName,
      lastName,
      pesel,
      birthDate,
      gender,
        phoneNumber,
        email,
        city,
        street,
        apartmentNumber,
        postalCode,
        pregnant,
        pregnantRemakrs,
        smoking,
        smokingRemakrs,
        alcohol,
        alcoholRemakrs,
        specialDiet,
        specialDietRemakrs,
        allergies,
        allergiesRemakrs,
        medications,
        surgerys,
        hospitalizations,
        asthma,
        heartDisease,
        prostateCaner,
        hypertension,
        diabetes,
        breastCancer,
        ovarianCancer,
        metalIllness,
        other,
        otherRemarks
    };

    if (patientToEdit) {
      editPatientHandler(patientData, patientToEdit.id);
    } else {
      addPatientHandler(patientData);
    }

    // Resetowanie pól formularza
    setFirstName('');
    setLastName('');
    setPesel('');
    setBirthDate('');
    setGender('');
    setPhoneNumber('');
    setEmail('');
    setCity('');
    setStreet('');
    setApartmentNumber('');
    setPostalCode('');
    setPregnant('');
    setPregnantRemakrs('');
    setSmoking('');
    setSmokingRemakrs('');
    setAlcohol('');
    setAlcoholRemakrs('');
    setSpecialDiet('');
    setSpecialDietRemakrs('');
    setAllergies('');
    setAllergiesRemakrs('');
    setMedications('');
    setSurgerys('');
    setHospitalizations('');
    setAsthma('');
    setHeartDisease('');
    setProstateCaner('');
    setHypertension('');
    setDiabetes('');
    setBreastCancer('');
    setOvarianCancer('');
    setMetalIllness('');
    setOther('');
    setOtherRemarks('');
    
  };

  return (
    
    <form className="PatientAddForm" onSubmit={handleSubmit}>
        <ul>
      <li><h3>Formularz Pacjenta</h3></li>
      <br></br>
      <li>
        <label>Imię:</label>
        <br></br>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </li>
      <li>
        <label>Nazwisko:</label>
        <br></br>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </li>
      <li>
        <label>Pesel:</label>
        <br></br>
        <input type="text" value={pesel} onChange={(e) => setPesel(e.target.value)} required />
      </li>
      <li>
        <label>Data urodzenia:</label>
        <br></br>
        <input type="text" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
      </li>
      <li>
        <label>Płeć:</label>
        <br></br>
        <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} required />
      </li>
      <li>
        <label>Numer telefonu:</label>
        <br></br>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </li>
      <li>
        <label>Email:</label>
        <br></br>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
        <input type="text" value={apartmentNumber} onChange={(e) => setApartmentNumber(e.target.value)} required />
      </li>
      <li>
        <label>Kod pocztowy:</label>
        <br></br>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </li>
      <li>
        <label>Ciąża:</label>
        <br></br>
        <input type="text" value={pregnant} onChange={(e) => setPregnant(e.target.value)} required />
      </li>
      <li>
        <label>Ciąża uwagi:</label>
        <br></br>
        <input type="text" value={pregnantRemakrs} onChange={(e) => setPregnantRemakrs(e.target.value)} required />
      </li>
      <li>
        <label>Palenie:</label>
        <br></br>
        <input type="text" value={smoking} onChange={(e) => setSmoking(e.target.value)} required />
      </li>
      <li>
        <label>Palenie uwagi:</label>
        <br></br>
        <input type="text" value={smokingRemakrs} onChange={(e) => setSmokingRemakrs(e.target.value)} required />
      </li>
      <li>
        <label>Alkohol:</label>
        <br></br>
        <input type="text" value={alcohol} onChange={(e) => setAlcohol(e.target.value)} required />
      </li>
      <li>
        <label>Alkohol uwagi:</label>
        <br></br>
        <input type="text" value={alcoholRemakrs} onChange={(e) => setAlcoholRemakrs(e.target.value)} required />
      </li>
      <li>
        <label>Spcejalna dieta:</label>
        <br></br>
        <input type="text" value={specialDiet} onChange={(e) => setSpecialDiet(e.target.value)} required />
      </li>
      <li>
        <label>Spcejalna dieta uwagi:</label>
        <br></br>
        <input type="text" value={specialDietRemakrs} onChange={(e) => setSpecialDietRemakrs(e.target.value)} required />
      </li>
      <li>
        <label>Alergie:</label>
        <br></br>
        <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} required />
      </li>
      <li>
        <label>Alergie uwagi:</label>
        <br></br>
        <input type="text" value={allergiesRemakrs} onChange={(e) => setAllergiesRemakrs(e.target.value)} required />
      </li>
      <li>
        <label>Leki:</label>
        <br></br>
        <input type="text" value={medications} onChange={(e) => setMedications(e.target.value)} required />
      </li>
      <li>
        <label>Operacje:</label>
        <br></br>
        <input type="text" value={surgerys} onChange={(e) => setSurgerys(e.target.value)} required />
      </li>
      <li>
        <label>Hospitalizacja:</label>
        <br></br>
        <input type="text" value={hospitalizations} onChange={(e) => setHospitalizations(e.target.value)} required />
      </li>
      <li>
        <label>Astma:</label>
        <br></br>
        <input type="text" value={asthma} onChange={(e) => setAsthma(e.target.value)} required />
      </li>
      <li>
        <label>Choroby serca:</label>
        <br></br>
        <input type="text" value={heartDisease} onChange={(e) => setHeartDisease(e.target.value)} required />
      </li>
      <li>
        <label>Rak prostaty:</label>
        <br></br>
        <input type="text" value={prostateCaner} onChange={(e) => setProstateCaner(e.target.value)} required />
      </li>
      <li>
        <label>Nadciśnienie:</label>
        <br></br>
        <input type="text" value={hypertension} onChange={(e) => setHypertension(e.target.value)} required />
      </li>
      <li>
        <label>Cukrzyca:</label>
        <br></br>
        <input type="text" value={diabetes} onChange={(e) => setDiabetes(e.target.value)} required />
      </li>
      <li>
        <label>Rak piersi:</label>
        <br></br>
        <input type="text" value={breastCancer} onChange={(e) => setBreastCancer(e.target.value)} required />
      </li>
      <li>
        <label>Rak jajnika:</label>
        <br></br>
        <input type="text" value={ovarianCancer} onChange={(e) => setOvarianCancer(e.target.value)} required />
      </li>
      <li>
        <label>Choroba umysłowa:</label>
        <br></br>
        <input type="text" value={metalIllness} onChange={(e) => setMetalIllness(e.target.value)} required />
      </li>
      <li>
        <label>Inne:</label>
        <br></br>
        <input type="text" value={other} onChange={(e) => setOther(e.target.value)} required />
      </li>
      <li>
        <label>Inne uwagi:</label>
        <br></br>
        <input type="text" value={otherRemarks} onChange={(e) => setOtherRemarks(e.target.value)} required />
      </li>
      </ul>
      <button type="submit">{patientToEdit ? "Aktualizuj pacjenta" : "Dodaj pacjenta"}</button>
    
    </form>

  );
};

export default PatientAddForm;
