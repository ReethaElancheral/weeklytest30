export default function Summary({ data }) {
  return (
    <div className="step summary">
      <h2>Review Your Feedback</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Feedback:</strong></p>
      <p>{data.feedback}</p>
    </div>
  );
}
