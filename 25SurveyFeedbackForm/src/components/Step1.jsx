export default function Step1({ data, onChange }) {
  return (
    <div className="step">
      <label>
        Name*:
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={onChange}
          placeholder="Enter your name"
          required
        />
      </label>
      <label>
        Email*:
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="Enter your email"
          required
        />
      </label>
    </div>
  );
}
