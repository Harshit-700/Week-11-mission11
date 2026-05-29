
export default function NoApiBanner() {
  return (
    <div className="no-api-banner">
      <div className="no-api-icon">🔑</div>

      <div>
        <div className="no-api-title">
          TMDB API Key Required
        </div>

        <div className="no-api-text">
          The application is currently displaying mock movie data.  
          

          <br /><br />

          1. Create a free account on <strong>themoviedb.org</strong>  
          <br />

          2. Navigate to <strong>Settings → API</strong> and generate your API key  
          <br />

          3. Replace <code>YOUR_TMDB_API_KEY</code> inside
          <code> src/constants.js </code>

          <br /><br />

          The Favorites feature will continue to work using LocalStorage.
        </div>
      </div>
    </div>
  );
}
