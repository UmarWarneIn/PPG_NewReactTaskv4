import React, { useEffect, useState } from 'react';

function App() {
  const [partData, setPartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = 'manager';
    const password = 'manager';
    const headers = new Headers({
      'Authorization': 'Basic ' + btoa(username + ':' + password),
      'Content-Type': 'application/json'
    });

    fetch('https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts', {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log({data})
        if (Array.isArray(data)) {
          setPartData({data});
        } else {
          setError('Data is not in the expected format.');
        }
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        setError('There was a problem fetching data from the server.');
      });
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  console.log(partData)
  return (
    <div>
      <h1>Fetch API Example</h1>
      <ul>
        {partData.map(part => (
          <li key={part.id}>
            <strong>Company:</strong> {part.Company ?? 'N/A'}<br />
            <strong>PartNum:</strong> {part.partNum ?? 'N/A'}<br />
            <strong>Parts Description:</strong> {part.partsDescription ?? 'N/A'}<br />
            <strong>Class ID:</strong> {part.classId ?? 'N/A'}<br />
            <strong>Type Code:</strong> {part.typeCode ?? 'N/A'}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
