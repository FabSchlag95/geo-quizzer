export default function GlobalPoints({ globalPoints }) {
  return (
    <div className="global-points">
      <p>Score {globalPoints || 0} p.</p>
    </div>
  );
}
