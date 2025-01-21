export default function GlobalPoints({ globalPoints }) {
  return (
    <div className="global-points">
      <p className="hidden-text">Credits:</p>
      <p>{globalPoints || 0}🪙</p>
    </div>
  );
}
