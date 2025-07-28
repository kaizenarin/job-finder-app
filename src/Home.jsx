import React, { useState } from 'react';
import JobCard from './JobCard.jsx';
import JobDetail from './JobDetail.jsx';
import Loader from './Load.jsx';

function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('search');

  // Saved jobs state
  const [savedJobs, setSavedJobs] = useState(() => {
    const saved = localStorage.getItem('savedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchJobs = async () => {
    if (!searchTerm.trim()) return;
   
    setIsLoading(true);
    setError(null);
    
    const url = `https://jsearch.p.rapidapi.com/search?query=${searchTerm}&page=1&num_pages=1`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a309a0564fmsh2b0f2d9de697637p152f28jsn5d3c804c24c4',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
     setJobs(data.data || []);
    } catch (err) {
      setError('Failed to fetch jobs');
    }
    setIsLoading(false);
  };

  // Save/Unsave job
  const toggleSaveJob = (job) => {
    const isAlreadySaved = savedJobs.some(savedJob => savedJob.job_id === job.job_id);
    
    let updatedSavedJobs;
    if (isAlreadySaved) {
      updatedSavedJobs = savedJobs.filter(savedJob => savedJob.job_id !== job.job_id);
    } else {
      updatedSavedJobs = [...savedJobs, job];
    }
    
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };

  const isSaved = (jobId) => {
    return savedJobs.some(job => job.job_id === jobId);
  };

  if (selectedJob) {
    return <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />;
  }

  return (
    <div className="homepage">
      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button 
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search Jobs
        </button>
        <button 
          className={activeTab === 'saved' ? 'active' : ''}
          onClick={() => setActiveTab('saved')}
        >
          Saved Jobs ({savedJobs.length})
        </button>
      </div>

      {activeTab === 'search' ? (
        <div>
          {/* Search Section */}
          <div className="search-section">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for jobs..."
              className="search-input"
            />
            <button onClick={fetchJobs} className="search-btn">
              Search
            </button>
          </div>

          {error && <div className="error">{error}</div>}
          {isLoading && <Loader />}
          
          {jobs.length > 0 && (
            <div className="jobs-grid">
              {jobs.map(job => (
                <JobCard 
                  key={job.job_id} 
                  job={job} 
                  onClick={setSelectedJob}
                  onSave={toggleSaveJob}
                  isSaved={isSaved(job.job_id)}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="saved-jobs-section">
          <h2>Your Saved Jobs</h2>
          {savedJobs.length === 0 ? (
            <p>No saved jobs yet. Start saving jobs you're interested in!</p>
          ) : (
            <div className="jobs-grid">
              {savedJobs.map(job => (
                <JobCard 
                  key={job.job_id} 
                  job={job} 
                  onClick={setSelectedJob}
                  onSave={toggleSaveJob}
                  isSaved={true}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
