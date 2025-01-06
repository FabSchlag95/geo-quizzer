
export default function Rules({ rules, toggleRules, isStart }) {
  return (
    <>
      <h3>Rules:</h3>
      <ul>
        {rules.map((rule,i) => (
          <li key={rule+i}>{rule}</li>
        ))}
      </ul>
      <button onClick={toggleRules}>{isStart?"Start First Round!":"Continue"}</button>
    </>
  );
}
