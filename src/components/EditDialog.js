// components/EditDialog.js
import React, { useState } from 'react';
import './EditDialog.css';

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
      <button onClick={() => onSave(formData)}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditDialog;
