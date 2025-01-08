
export default function Rules({ rules, onClick, isStart }) {
  return (
    <>
      <h3>Rules:</h3>
      <ul>
        {rules.map((rule,i) => (
          <li key={rule+i}>{rule}</li>
        ))}
      </ul>
      <button onClick={onClick}>{isStart?"Start First Round!":"Continue"}</button>
    </>
  );
}
