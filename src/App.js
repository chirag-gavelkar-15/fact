import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(null);

  // Fetch data from JSON file
  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);  // Log fetched data
        setUsers(data);
      })
      .catch((error) => console.error("Error loading data:", error));
  }, []);
  

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name ? user.name.toLowerCase().includes(searchTerm.toLowerCase()) : false
  );
  
  return (
    <div className="App">
      <h1>FactWise Assessment Visual Reference</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search user"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* User List */}
      <div className="user-list">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={() => setEditingUser(user)}
            onDelete={() => setDeleteDialog(user)}
          />
        ))}
      </div>

      {/* Edit User Dialog */}
      {editingUser && (
        <EditDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(updatedUser) => {
            setUsers(
              users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );
            setEditingUser(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialog && (
        <DeleteDialog
          user={deleteDialog}
          onCancel={() => setDeleteDialog(null)}
          onConfirm={() => {
            setUsers(users.filter((u) => u.id !== deleteDialog.id));
            setDeleteDialog(null);
          }}
        />
      )}
    </div>
  );
}

const UserCard = ({ user, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log("Rendering UserCard with user:", user);  // Debugging log

  return (
    <div className="user-card">
      <div className="user-header" onClick={() => setIsOpen(!isOpen)}>
        <img src="path/to/avatar.png" alt="User Avatar" className="avatar" />
        <span>{user.name}</span>
        <button className="toggle-btn">{isOpen ? '▲' : '▼'}</button>
      </div>
      {isOpen && (
        <div className="user-details">
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Country:</strong> {user.country}</p>
          <p><strong>Description:</strong> {user.description}</p>
          <div className="actions">
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};


const EditDialog = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="dialog">
      <h2>Edit {user.name}</h2>
      <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
      <input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
      <div className="dialog-actions">
        <button onClick={() => onSave(formData)}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

const DeleteDialog = ({ user, onCancel, onConfirm }) => (
  <div className="dialog">
    <p>Are you sure you want to delete {user.name}?</p>
    <button onClick={onCancel}>Cancel</button>
    <button onClick={onConfirm} className="delete">Delete</button>
  </div>
);

export default App;
