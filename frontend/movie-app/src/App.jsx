
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Local movie poster images
    const posterImages = {
  900001: '/posters/RRR.jfif',
  900002: '/posters/Bahubali the beginning.jfif',
  900003: '/posters/Baahubali the conclusion.jfif',
  900004: '/posters/Pushpa the rise.jfif',
  900005: '/posters/Arjun Reddy.jfif',
  900006: '/posters/Eega.jfif',
  900007: '/posters/Magadheera.jfif',
  900008: '/posters/Rangasthalam.jfif',
  900009: '/posters/Ala Vaikunthapurramuloo.jfif',
  900010: '/posters/Janatha Garaga.jfif',
  900011: '/posters/Srimanthudu.jfif',
  900012: '/posters/Pokiri.jfif',
  900013: '/posters/Athadu.jfif',
  900014: '/posters/Okkadu.jfif',
  900015: '/posters/Dookudu.jfif',
  900016: '/posters/Business Man.jfif',
  900017: '/posters/Jersey.jfif',
  900018: '/posters/Mahanati.jfif',
  900019: '/posters/Fidaa.jfif',
  900020: '/posters/Geetha Govindam.jfif',
  900021: '/posters/Sita Ramam.jfif',
  900022: '/posters/Hi Nanna.jfif',
  900023: '/posters/Dasara.jfif',
  900024: '/posters/Hanuman.jfif',
  900025: '/posters/Karthikeya 2.jfif',
  900026: '/posters/Devara Part-1.jfif',
  900027: '/posters/Salaar.jfif',
  900028: '/posters/Kalki 2898-AD.jfif',
  900029: '/posters/Agent Sai Srinivasa Athreya.jfif',
  900030: '/posters/Goodachari.jfif',

  // Existing MovieLens posters
  2294: '/posters/antz.jpg',
  3114: '/posters/toy-story-2.jpg',
  3754: '/posters/rocky-bullwinkle.jpg',
  4016: '/posters/emperors-new-groove.jpg',
  4886: '/posters/monsters-inc.jpg'
}

  // Load movies from backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/movies')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load movies')
        }
        return response.json()
      })
      .then((data) => {
        setMovies(data.movies)
      })
      .catch(() => {
        setError(
          'Unable to connect to backend. Please check that it is running.'
        )
      })
  }, [])

  // Get movie recommendations
  const recommendMovies = async () => {
    const movie = movies.find(
      (item) => item.title === selectedMovie
    )

    if (!movie) return

    setLoading(true)
    setError('')
    setRecommendations([])

    try {
      const response = await fetch(
        'http://127.0.0.1:8000/recommendations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            movie_title: movie.title,
            limit: 5
          })
        }
      )

      if (!response.ok) {
        throw new Error('Recommendation request failed')
      }

      const data = await response.json()
      setRecommendations(data.recommendations)

    } catch {
      setError(
        'Could not get recommendations. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">

      {/* Navigation Bar */}
      <header className="navbar">
        <h2>🎬 CineMatch</h2>
        <span>Movie Recommendation System</span>
      </header>

      {/* Main Section */}
      <main className="hero">

        <p className="tagline">
          YOUR PERSONAL MOVIE GUIDE
        </p>

        <h1>
          Discover Your Next
          <br />
          Favorite Movie
        </h1>

        <p className="description">
          Choose a movie you love and find more movies
          matching its genre.
        </p>

        {/* Movie Selection */}
        <div className="recommend-box">

          <label htmlFor="movie">
            Select a movie
          </label>

          <select
            id="movie"
            value={selectedMovie}
            onChange={(event) => {
              setSelectedMovie(event.target.value)
              setRecommendations([])
              setError('')
            }}
          >
            <option value="">
              Choose a movie...
            </option>

            {movies.map((movie) => (
              <option
                key={movie.id}
                value={movie.title}
              >
                {movie.title}
              </option>
            ))}
          </select>

          <button
            onClick={recommendMovies}
            disabled={!selectedMovie || loading}
          >
            {loading
              ? 'Finding movies...'
              : 'Get Recommendations →'}
          </button>

        </div>

        {/* Error Message */}
        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {/* Recommendation Results */}
        {recommendations.length > 0 && (
          <section className="results">

            <h2>Recommended For You</h2>

            <div className="movie-grid">

              {recommendations.map((movie) => (
                <div
                  className="movie-card"
                  key={movie.id}
                >

                  {/* Movie Poster */}
                  {posterImages[movie.id] ? (
                    <img
                      src={posterImages[movie.id]}
                      alt={movie.title}
                      className="movie-poster"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="movie-icon">
                      🎥
                    </div>
                  )}

                  {/* Movie Information */}
                <h3>{movie.title}</h3>
<p>{movie.genre.replaceAll('|', ', ')}</p>
<p>
  Similarity: {(movie.similarity * 100).toFixed(1)}%
</p>

                </div>
              ))}

            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <footer>
        © 2026 CineMatch | Movie Recommendation System
      </footer>

    </div>
  )
}

export default App
