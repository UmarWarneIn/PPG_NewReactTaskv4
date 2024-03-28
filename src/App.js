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
  
    fetch('https://77.92.189.102/iit_vertical_precast/api/v1/Erp.BO.PartSvc/Parts', {
      headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(json => setData(json))
    .catch(error => console.error('Error fetching data: ', error));
  };
  
  const applyFilter = () => {
    fetchData();
    const filtered = data.filter(item => item.id.toString().includes(idFilter));
    setData(filtered);
  };

  const resetFilter = () => {
    fetchData();
    setIdFilter('');
  };

  const saveEdit = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, partsdescription: editTitle }; // Update partsdescription instead of title
      }
      return item;
    });
    setData(updatedData);
    setEditId(null);
    setEditTitle('');
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
        <button className="search-button" onClick={applyFilter}>Search</button>
        <button className="reset-button" onClick={resetFilter}>Reset</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>PartNum</th>
            <th>Parts Description</th>
            <th>Class ID</th>
            <th>Type Code</th>
            <th>ProdCode</th>
          </tr>
        </thead>
        <tbody>
          {data.map(element => (
            <tr key={element.Company}>
              <td>{element.PartNum}</td>
              <td>{element.partsdescription}</td>
              <td>{element.TypeCode}</td>
              <td>{element.ProdCode}</td>
              <td>
                {editId === element.PartNum ? (
                  <>
                    <input className="edit-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <button className="save-button" onClick={() => saveEdit(element.PartNum)}>Save</button>
                  </>
                ) : (
                  element.partsdescription // Use partsdescription instead of title
                )}
              </td>
              <td>
                {editId !== element.PartNum && (
                  <button className="edit-button" onClick={() => { setEditId(element.id); setEditTitle(element.partsdescription); }}>Edit</button>
                )}
              </td>
              <td>{element.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
