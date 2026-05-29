export default function Toast({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span style={{ fontSize: 18 }}>{t.type === "heart" ? "❤️" : "🗑️"}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}
