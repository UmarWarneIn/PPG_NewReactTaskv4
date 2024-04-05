import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [idFilter, setIdFilter] = useState('');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const username = 'manager'; // Replace 'your_username' with your actual username
    const password = 'manager'; // Replace 'your_password' with your actual password

    fetch(`https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts`, {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }
    })
      .then(response => response.json())
      .then(json =>setData(json.value) )
      .catch(error => console.error('Error fetching data: ', error));
  };

  const saveEdit = (id) => {
    const username = 'manager'; // Replace 'your_username' with your actual username
    const password = 'manager'; // Replace 'your_password' with your actual password

    fetch(`https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      body: JSON.stringify({ partsdescription: editTitle })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update');
        }
        // Assuming successful update, update local state
        const updatedData = data.map(item => {
          if (item.id === id) {
            return { ...item, partsdescription: editTitle };
          }
          return item;
        });
        setData(updatedData);
        setEditId(null);
        setEditTitle('');
      })
      .catch(error => console.error('Error updating data: ', error));
  };

  return (
    <div className="App">
      <h1>Fetch Details</h1>
      <div className="search-container">
        <input 
          className="search-input"
          type="text" 
          placeholder="Filter by element ID" 
          value={idFilter} 
          onChange={(e) => setIdFilter(e.target.value)} 
        />
        <button className="search-button" onClick={fetchData}>Search</button>
      </div>
            <table className="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>PartNum</th>
            <th>Parts Description</th>
            <th>Class ID</th>
            <th>Type Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map(element => (
            <tr key={element.PartNum}>
              <td>{element.Company}</td>
              <td>{element.PartNum}</td>
              <td>
                {editId === element.id ? (
                  <>
                    <input className="edit-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <button className="save-button" onClick={() => saveEdit(element.id)}>Save</button>
                  </>
                ) : (
                  element.PartDescription // Use partsdescription instead of title
                )}
              </td>
              <td>
                {editId !== element.id && (
                  <button className="edit-button" onClick={() => { setEditId(element.id); setEditTitle(element.partsdescription); }}>Edit</button>
                )}
              </td>
              <td>{element.TypeCode}</td>
            </tr>
          ))}           
        </tbody>
      </table>
    </div>
  );
}

export default App;
