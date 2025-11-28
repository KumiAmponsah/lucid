import React, { useState } from 'react';
import '../styles/accountsettings.css';
import editIcon from '../assets/edit.svg';

const AccountSettings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    otherName: 'Michael',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    region: 'North America',
    city: 'New York'
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    setIsEditing(false);
    console.log('Saved data:', formData);
  };

  const handleCancel = () => {
    // Handle cancel logic here - reset form data if needed
    setIsEditing(false);
  };

  return (
    <div className="account-settings">
      <div className="settings-container">
        {/* User Information Section */}
        <div className="section-header">
          <h2 className="section-title">User Information</h2>
          {!isEditing && (
            <button className="edit-button" onClick={handleEditToggle}>
              <img src={editIcon} alt="Edit" className="edit-icon" />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="form-section">
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="text-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="text-input"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Other Name</label>
            <input
              type="text"
              name="otherName"
              value={formData.otherName}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className="text-input"
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="section-header">
          <h2 className="section-title">Location</h2>
        </div>

        <div className="form-section">
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Region</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="text-input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">City/Town</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="text-input"
              />
            </div>
          </div>
        </div>

        {/* Account Status Section - Only show when not editing */}
        {!isEditing && (
          <>
            <div className="section-header no-border">
              <h2 className="section-title">Account Status</h2>
            </div>

            <div className="account-status-section">
              <div className="action-buttons centered">
                <button className="deactivate-button">
                  Deactivate Account
                </button>
                <button className="delete-button">
                  Delete Account
                </button>
              </div>
            </div>
          </>
        )}

        {/* Save/Cancel Buttons - Only show when editing */}
        {isEditing && (
          <div className="save-cancel-section">
            <div className="action-buttons centered">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;