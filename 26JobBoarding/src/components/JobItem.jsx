import React from "react";

export default function JobItem({ job }) {
  return (
    <li className="job-item">
      <h3><a href={job.url} target="_blank" rel="noopener noreferrer">{job.title}</a></h3>
      <p className="company">{job.company_name} • {job.candidate_required_location}</p>
      <p className="type">{job.job_type}</p>
      <p className="description">{job.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200)}…</p>
    </li>
  );
}
