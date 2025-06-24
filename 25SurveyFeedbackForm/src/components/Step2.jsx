export default function Step2({ data, onChange }) {
  return (
    <div className="step">
      <label>
        How would you rate our service?*
        <select name="rating" value={data.rating} onChange={onChange} required>
          <option value="">Select rating</option>
          <option value="5">Excellent (5)</option>
          <option value="4">Good (4)</option>
          <option value="3">Average (3)</option>
          <option value="2">Poor (2)</option>
          <option value="1">Very Poor (1)</option>
        </select>
      </label>
    </div>
  );
}
