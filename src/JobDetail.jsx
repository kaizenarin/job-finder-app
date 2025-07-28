import React, { useState } from 'react';

function JobDetail({ job, onBack }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const truncateDescription = (text, maxLength = 300) => {
    if (!text) return 'No description available';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Not disclosed';
    return salary;
  }; 

  return (
    <div className="job-detail-container">
      <button onClick={onBack} className="back-btn">← Back</button>
      
      <div className="job-header">
        <h1>{job.job_title}</h1>
        <div className="company-info">
          <h2>{job.employer_name}</h2>
          <p className="location">{job.job_city}, {job.job_country}</p>
        </div>
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <label>Salary:</label>
          <span className="salary-value">{formatSalary(job.job_salary)}</span>
        </div>
        
        <div className="meta-item">
          <label>Job Type:</label>
          <span>{job.job_employment_type || 'Full Time'}</span>
        </div>
        
        <div className="meta-item">
          <label>Posted:</label>
          <span>{new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="description-section">
        <h3>Job Description:</h3>
        <div className="description-content">
          {showFullDescription 
            ? job.job_description 
            : truncateDescription(job.job_description)
          }
        </div>
        {job.job_description && job.job_description.length > 300 && (
          <button 
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="read-more-btn"
          >
            {showFullDescription ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {job.job_apply_link && (
        <div className="apply-section">
          <a 
            href={job.job_apply_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="apply-btn"
          >
            Apply Now
          </a>
        </div>
      )}
    </div>
  );
}

export default JobDetail;
