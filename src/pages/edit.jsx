import React, { useState } from 'react';
import '../styles/edit.css';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    otherName: '',
    occupation: '',
    pricingType: 'set',
    amount: 0,
    description: '',
    tags: [],
    workExperience: 0,
    paymentMethod: 'mobile',
    employees: 1,
    daysSelection: 'weekdays',
    timeSelection: 'weekdays',
    showCustomDays: false,
    showCustomTimes: false,
    weekdaysTime: { start: '09:00', end: '17:00' },
    weekendTime: { start: '10:00', end: '16:00' },
    customDays: {
      sunday: { selected: false, start: '09:00', end: '17:00' },
      monday: { selected: false, start: '09:00', end: '17:00' },
      tuesday: { selected: false, start: '09:00', end: '17:00' },
      wednesday: { selected: false, start: '09:00', end: '17:00' },
      thursday: { selected: false, start: '09:00', end: '17:00' },
      friday: { selected: false, start: '09:00', end: '17:00' },
      saturday: { selected: false, start: '09:00', end: '17:00' }
    }
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !profile.tags.includes(newTag.trim())) {
      setProfile(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const toggleCustomDays = () => {
    setProfile(prev => ({ ...prev, showCustomDays: !prev.showCustomDays }));
  };

  const toggleCustomTimes = () => {
    setProfile(prev => ({ ...prev, showCustomTimes: !prev.showCustomTimes }));
  };

  const handleCustomDayChange = (day, field, value) => {
    setProfile(prev => ({
      ...prev,
      customDays: {
        ...prev.customDays,
        [day]: {
          ...prev.customDays[day],
          [field]: value
        }
      }
    }));
  };

  const handleTimeChange = (type, field, value) => {
    setProfile(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value
      }
    }));
  };

  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayLabels = {
    sunday: 'Sunday',
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday'
  };

  return (
    <div className="edit-profile">
      {/* Profile Picture Section - Always at top center */}
      <div className="profile-header">
        <div className="profile-section">
          <h3 className="section-title">Profile Picture</h3>
          <div className="profile-pic-container">
            <img 
              src="/src/assets/blank-profile-picture-973460_1280.png" 
              alt="Profile" 
              className="profile-pic"
            />
          </div>
          <button className="change-pic-btn">Change picture</button>
        </div>
      </div>

      {/* Form Content */}
      <div className="form-content">
        <div className="form-section">
          <div className="name-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="text-input"
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="text-input"
              />
            </div>
          </div>

          <div className="name-row">
            <div className="input-group">
              <label>Other Name</label>
              <input
                type="text"
                value={profile.otherName}
                onChange={(e) => handleInputChange('otherName', e.target.value)}
                className="text-input"
              />
            </div>
            <div className="input-group">
              <label>Occupation</label>
              <input
                type="text"
                value={profile.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                className="text-input"
              />
            </div>
          </div>

          <div className="pricing-section">
            <div className="pricing-left">
              <h3 className="section-title">Pricing</h3>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={profile.pricingType === 'set'}
                    onChange={() => handleInputChange('pricingType', 'set')}
                  />
                  Set pricing rate
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    checked={profile.pricingType === 'contact'}
                    onChange={() => handleInputChange('pricingType', 'contact')}
                  />
                  Contact for price
                </label>
              </div>

              {profile.pricingType === 'set' && (
                <>
                  <label className="amount-label">Amount (GHC)</label>
                  <div className="number-input">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('amount', Math.max(0, profile.amount - 1))}
                      className="number-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={profile.amount}
                      onChange={(e) => handleInputChange('amount', parseInt(e.target.value) || 0)}
                      className="number-field"
                    />
                    <button 
                      type="button"
                      onClick={() => handleInputChange('amount', profile.amount + 1)}
                      className="number-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="input-group">
                    <label>Description</label>
                    <textarea
                      value={profile.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="description-input"
                      rows="4"
                    />
                  </div>
                </>
              )}

              {/* Overview Section */}
              <div className="overview-section">
                <h3 className="section-title">Overview</h3>
                
                <div className="overview-item">
                  <div className="overview-header">
                    <span>Verification Status</span>
                    <img src="/src/assets/verified.svg" alt="Verified" className="overview-icon" />
                  </div>
                  <span className="verified-text">Verified</span>
                </div>

                <div className="overview-item">
                  <div className="overview-header">
                    <span>Number of Employees</span>
                    <img src="/src/assets/people.svg" alt="People" className="overview-icon" />
                  </div>
                  <div className="number-input small">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('employees', Math.max(1, profile.employees - 1))}
                      className="number-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={profile.employees}
                      onChange={(e) => handleInputChange('employees', parseInt(e.target.value) || 1)}
                      className="number-field"
                      min="1"
                    />
                    <button 
                      type="button"
                      onClick={() => handleInputChange('employees', profile.employees + 1)}
                      className="number-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-header">
                    <span>Work Experience (years)</span>
                    <img src="/src/assets/time.svg" alt="Time" className="overview-icon" />
                  </div>
                  <div className="number-input small">
                    <button 
                      type="button"
                      onClick={() => handleInputChange('workExperience', Math.max(0, profile.workExperience - 1))}
                      className="number-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={profile.workExperience}
                      onChange={(e) => handleInputChange('workExperience', parseInt(e.target.value) || 0)}
                      className="number-field"
                      min="0"
                    />
                    <button 
                      type="button"
                      onClick={() => handleInputChange('workExperience', profile.workExperience + 1)}
                      className="number-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Working Hours Section */}
                <div className="working-hours-section">
                  <h3 className="section-title">Working Hours</h3>
                  <div className="hours-container">
                    <div className="days-section">
                      <h4 className="subsection-title">Days</h4>
                      <div className="radio-group vertical compact">
                        <label className="radio-label">
                          <input
                            type="radio"
                            checked={profile.daysSelection === 'weekdays'}
                            onChange={() => handleInputChange('daysSelection', 'weekdays')}
                          />
                          Weekdays
                        </label>
                        <label className="radio-label">
                          <input
                            type="radio"
                            checked={profile.daysSelection === 'weekend'}
                            onChange={() => handleInputChange('daysSelection', 'weekend')}
                          />
                          Weekend
                        </label>
                        <div className="custom-option">
                          <label className="radio-label">
                            <input
                              type="radio"
                              checked={profile.daysSelection === 'custom'}
                              onChange={() => handleInputChange('daysSelection', 'custom')}
                            />
                            Custom
                            <button 
                              type="button"
                              onClick={toggleCustomDays}
                              className="toggle-arrow"
                            >
                              {profile.showCustomDays ? '▼' : '▶'}
                            </button>
                          </label>
                          {profile.showCustomDays && profile.daysSelection === 'custom' && (
                            <div className="custom-days-list">
                              {daysOfWeek.map(day => (
                                <label key={day} className="radio-label sub-radio">
                                  <input
                                    type="checkbox"
                                    checked={profile.customDays[day].selected}
                                    onChange={(e) => handleCustomDayChange(day, 'selected', e.target.checked)}
                                  />
                                  {dayLabels[day]}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="time-section">
                      <h4 className="subsection-title">Time</h4>
                      <div className="radio-group vertical compact">
                        <div className="time-option">
                          <label className="radio-label">
                            <input
                              type="radio"
                              checked={profile.timeSelection === 'weekdays'}
                              onChange={() => handleInputChange('timeSelection', 'weekdays')}
                            />
                            Weekdays
                          </label>
                          {profile.timeSelection === 'weekdays' && (
                            <div className="time-inputs">
                              <div className="time-input-group">
                                <label>Start</label>
                                <input
                                  type="time"
                                  value={profile.weekdaysTime.start}
                                  onChange={(e) => handleTimeChange('weekdaysTime', 'start', e.target.value)}
                                  className="time-input"
                                />
                              </div>
                              <div className="time-input-group">
                                <label>End</label>
                                <input
                                  type="time"
                                  value={profile.weekdaysTime.end}
                                  onChange={(e) => handleTimeChange('weekdaysTime', 'end', e.target.value)}
                                  className="time-input"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="time-option">
                          <label className="radio-label">
                            <input
                              type="radio"
                              checked={profile.timeSelection === 'weekend'}
                              onChange={() => handleInputChange('timeSelection', 'weekend')}
                            />
                            Weekend
                          </label>
                          {profile.timeSelection === 'weekend' && (
                            <div className="time-inputs">
                              <div className="time-input-group">
                                <label>Start</label>
                                <input
                                  type="time"
                                  value={profile.weekendTime.start}
                                  onChange={(e) => handleTimeChange('weekendTime', 'start', e.target.value)}
                                  className="time-input"
                                />
                              </div>
                              <div className="time-input-group">
                                <label>End</label>
                                <input
                                  type="time"
                                  value={profile.weekendTime.end}
                                  onChange={(e) => handleTimeChange('weekendTime', 'end', e.target.value)}
                                  className="time-input"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="custom-option">
                          <label className="radio-label">
                            <input
                              type="radio"
                              checked={profile.timeSelection === 'custom'}
                              onChange={() => handleInputChange('timeSelection', 'custom')}
                            />
                            Custom
                            <button 
                              type="button"
                              onClick={toggleCustomTimes}
                              className="toggle-arrow"
                            >
                              {profile.showCustomTimes ? '▼' : '▶'}
                            </button>
                          </label>
                          {profile.showCustomTimes && profile.timeSelection === 'custom' && (
                            <div className="custom-times-list">
                              {daysOfWeek.map(day => (
                                <div key={day} className="custom-day-time">
                                  <span className="day-label">{dayLabels[day]}</span>
                                  <div className="time-inputs">
                                    <div className="time-input-group">
                                      <label>Start</label>
                                      <input
                                        type="time"
                                        value={profile.customDays[day].start}
                                        onChange={(e) => handleCustomDayChange(day, 'start', e.target.value)}
                                        className="time-input"
                                      />
                                    </div>
                                    <div className="time-input-group">
                                      <label>End</label>
                                      <input
                                        type="time"
                                        value={profile.customDays[day].end}
                                        onChange={(e) => handleCustomDayChange(day, 'end', e.target.value)}
                                        className="time-input"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Projects Section */}
                <div className="projects-section">
                  <h3 className="section-title">Projects</h3>
                  <p className="projects-subtitle">Upload or delete pictures of previous work done</p>
                  <div className="upload-area">
                    <button className="upload-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#2563eb">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="right-section">
              <div className="tags-section">
                <h3 className="section-title">Worker Tags</h3>
                <div className="tag-input-container">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add a tag"
                    className="tag-input"
                  />
                  <button 
                    type="button"
                    onClick={handleAddTag}
                    className="add-tag-btn"
                  >
                    +
                  </button>
                </div>
                <div className="tags-list">
                  {profile.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Payment Methods Section */}
              <div className="payment-section">
                <h3 className="section-title">Payment Methods</h3>
                <div className="radio-group vertical">
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={profile.paymentMethod === 'mobile'}
                      onChange={() => handleInputChange('paymentMethod', 'mobile')}
                    />
                    Mobile Transfer
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      checked={profile.paymentMethod === 'bank'}
                      onChange={() => handleInputChange('paymentMethod', 'bank')}
                    />
                    Bank Transfer
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;