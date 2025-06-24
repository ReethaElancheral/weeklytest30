export default function Step3({ data, onChange }) {
  return (
    <div className="step">
      <label>
        Please provide your feedback*:
        <textarea
          name="feedback"
          value={data.feedback}
          onChange={onChange}
          rows="5"
          placeholder="Write your feedback here..."
          required
        />
      </label>
    </div>
  );
}
