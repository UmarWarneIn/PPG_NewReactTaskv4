import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const username = 'manager'; // Replace 'your_username' with your actual username
    const password = 'manager'; // Replace 'your_password' with your actual password
    const apiUrl = 'https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts'; // Replace with your API URL

    fetch(apiUrl, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(json => setData(json.value))
      .catch(error => {
        console.error('Error fetching data: ', error);
        setMessage('Failed to fetch data. Please try again later.');
      });
  };

  const saveEdit = (PartNum) => {
    const updatedData = data.map(part => {
      if (part.PartNum === PartNum) {
        return { ...part, PartDescription: editTitle };
      }
      return part;
    });

    const username = 'manager'; // Replace 'your_username' with your actual username
    const password = 'manager'; // Replace 'your_password' with your actual password

    fetch(`https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts/${PartNum}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      body: JSON.stringify({ PartDescription: editTitle })
    })
      .then(response => {
        if (response.ok) {
          setMessage('Data saved successfully');
          setData(updatedData);
          setEditId(null);
        } else {
          //setMessage('Failed to save data');
          throw new Error('Failed to save data');
        }
      })
      .catch(error => {
        console.error('Error saving data: ', error);
        setMessage('Failed to save data');
      });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(element =>
    element.PartNum.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Part Number..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      {message && <div className="message">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Part Number</th>
            <th>Description</th>
            <th>Type Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(element => (
            <tr key={element.PartNum}>
              <td>{element.Company}</td>
              <td>{element.PartNum}</td>
              <td>
                {editId === element.PartNum ? (
                  <input
                    className="edit-input"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  element.PartDescription
                )}
              </td>
              <td>{element.TypeCode}</td>
              <td>
                {editId === element.PartNum ? (
                  <button
                    className="save-button"
                    onClick={() => saveEdit(element.PartNum)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => {
                      setEditId(element.PartNum);
                      setEditTitle(element.PartDescription);
                    }}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
