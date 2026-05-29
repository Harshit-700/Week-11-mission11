// WatchlistPage.jsx
// Phase 2 (P1): POST form + DELETE + loading skeleton + error boundary
import { useState } from "react";
import { useWatchlist } from "../hooks";

// ── Skeleton card ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="wl-card wl-skeleton">
      <div className="sk-line sk-title" />
      <div className="sk-line sk-body" />
      <div className="sk-line sk-body sk-short" />
    </div>
  );
}

// ── Single post card ───────────────────────────────────────────────────────
function PostCard({ post, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(post._id);
  };

  const date = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div className={`wl-card${deleting ? " wl-card--deleting" : ""}`}>
      <div className="wl-card__meta">
        <span className="wl-card__date">📅 {date}</span>
      </div>
      <h3 className="wl-card__title">{post.title}</h3>
      <p className="wl-card__content">{post.content}</p>
      <button
        className="wl-delete-btn"
        onClick={handleDelete}
        disabled={deleting}
      >
        {deleting ? "Removing…" : "🗑 Remove"}
      </button>
    </div>
  );
}

// ── Add-post form ──────────────────────────────────────────────────────────
function AddPostForm({ onSubmit, submitting }) {
  const [title,   setTitle]   = useState("");
  const [content, setContent] = useState("");
  const [touched, setTouched] = useState({});

  const titleErr   = !title.trim()   ? "Title is required"   : "";
  const contentErr = !content.trim() ? "Content is required" : "";
  const valid = !titleErr && !contentErr;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ title: true, content: true });
    if (!valid) return;
    const ok = await onSubmit({ title: title.trim(), content: content.trim() });
    if (ok) { setTitle(""); setContent(""); setTouched({}); }
  };

  return (
    <form className="wl-form" onSubmit={handleSubmit} noValidate>
      <h3 className="wl-form__heading">➕ Add to Watchlist</h3>

      <div className="wl-field">
        <label htmlFor="wl-title">Movie / Note Title *</label>
        <input
          id="wl-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, title: true }))}
          placeholder="e.g. Dune: Part Two"
          disabled={submitting}
          className={touched.title && titleErr ? "input-err" : ""}
        />
        {touched.title && titleErr && <span className="field-err">{titleErr}</span>}
      </div>

      <div className="wl-field">
        <label htmlFor="wl-content">Notes</label>
        <textarea
          id="wl-content"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, content: true }))}
          placeholder="Why do you want to watch this?"
          disabled={submitting}
          className={touched.content && contentErr ? "input-err" : ""}
        />
        {touched.content && contentErr && <span className="field-err">{contentErr}</span>}
      </div>

      <button type="submit" className="wl-submit-btn" disabled={submitting}>
        {submitting ? (
          <><span className="spin" />  Saving…</>
        ) : "Save to MongoDB"}
      </button>
    </form>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function WatchlistPage() {
  const { posts, loading, error, submitting, addPost, removePost, reload } = useWatchlist();

  return (
    <div className="wl-page">
      {/* Header */}
      <div className="wl-header">
        <div>
          <h1 className="wl-title">📋 My Watchlist</h1>
          <p className="wl-subtitle">Powered by MongoDB · Express · React · Node</p>
        </div>
        <button className="wl-refresh-btn" onClick={reload} disabled={loading}>
          {loading ? "⏳" : "↻"} Refresh
        </button>
      </div>

      {/* Error boundary */}
      {error && (
        <div className="wl-error" role="alert">
          <span>⚠️ {error}</span>
          <button onClick={reload}>Retry</button>
        </div>
      )}

      <div className="wl-layout">
        {/* Add form (left / top) */}
        <AddPostForm onSubmit={addPost} submitting={submitting} />

        {/* Posts feed (right / bottom) */}
        <div className="wl-feed">
          <div className="wl-feed-header">
            <span className="wl-count">
              {loading ? "Loading…" : `${posts.length} note${posts.length !== 1 ? "s" : ""} saved`}
            </span>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="wl-list">
              {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && posts.length === 0 && (
            <div className="wl-empty">
              <span>🎬</span>
              <p>No notes yet. Add your first movie above!</p>
            </div>
          )}

          {/* Post list */}
          {!loading && posts.length > 0 && (
            <div className="wl-list">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} onDelete={removePost} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
