
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.schemas import MovieRequest
from ml.recommender import movies, get_recommendations

app = FastAPI(
    title="Movie Recommendation System",
    description="An AI-powered movie recommendation API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Movie Recommendation System!",
        "status": "Backend is running successfully"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "application": "Movie Recommendation System"
    }

@app.get("/movies")
def get_movies():
    return {
        "movies": [
            {
                "id": int(row["movieId"]),
                "title": row["title"],
                "genre": row["genres"]
            }
            for _, row in movies.iterrows()
        ]
    }


@app.post("/recommendations")
def recommend_movies(request: MovieRequest):
    results = get_recommendations(
        request.movie_title,
        request.limit
    )

    return {
        "input_movie": request.movie_title,
        "recommendations": results
    }
