import React from "react";
import JobItem from "./JobItem";

export default function JobList({ jobs }) {
  if (jobs.length === 0) return <p>No jobs found.</p>;

  return (
    <ul className="job-list">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
}
