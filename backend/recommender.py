MOVIES = [
    {"id": 1, "title": "Inception", "genre": "Sci-Fi"},
    {"id": 2, "title": "Interstellar", "genre": "Sci-Fi"},
    {"id": 3, "title": "The Dark Knight", "genre": "Action"},
    {"id": 4, "title": "Titanic", "genre": "Romance"},
    {"id": 5, "title": "Avatar", "genre": "Adventure"}
]


def get_recommendations(movie_title, genre, limit=5):
    recommendations = [
        movie for movie in MOVIES
        if movie["title"].lower() != movie_title.lower()
        and movie["genre"].lower() == genre.lower()
    ]

    return recommendations[:limit]
