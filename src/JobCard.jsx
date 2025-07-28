import React from 'react';

function JobCard({ job, onClick, onSave, isSaved }) {
  const formatSalary = (salary) => {
    if (!salary) return 'Salary not disclosed';
    return salary;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently posted';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="job-card" onClick={() => onClick(job)}>
      <div className="job-card-header">
        <div className="job-title-section">
          <h3 className="job-title">{job.job_title}</h3>
          <button 
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSave(job);
            }}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div className="company-info">
          <p className="company-name">{job.employer_name}</p>
          <p className="location">{job.job_city}, {job.job_country}</p>
        </div>

        <div className="salary-info">
          <strong>{formatSalary(job.job_salary)}</strong>
        </div>

        <div className="job-type-badge">
          {job.job_employment_type || 'Full Time'}
        </div>

        <div className="quick-info">
          <span className="posted-time">
            Posted: {formatDate(job.job_posted_at_datetime_utc)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
