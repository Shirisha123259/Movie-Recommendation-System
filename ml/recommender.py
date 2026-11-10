
import pandas as pd
from pathlib import Path
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load datasets
DATA_PATH = Path(__file__).parent / "dataset" / "movies.csv"
LINKS_PATH = Path(__file__).parent / "dataset" / "links.csv"

movies = pd.read_csv(DATA_PATH)
links = pd.read_csv(LINKS_PATH)

# Clean movie genres
movies["genres"] = movies["genres"].fillna("").replace(
    "(no genres listed)", ""
)

# Convert genres into numerical features
tfidf = TfidfVectorizer(token_pattern=r"(?u)\b[\w-]+\b")
tfidf_matrix = tfidf.fit_transform(movies["genres"])

# Calculate similarity
similarity_matrix = cosine_similarity(tfidf_matrix)


def get_recommendations(movie_title, limit=5):

    # Find selected movie
    matches = movies[
        movies["title"].str.lower() == movie_title.lower()
    ]

    if matches.empty:
        return []

    movie_index = matches.index[0]

    selected_movie_id = int(movies.iloc[movie_index]["movieId"])

    # Calculate similarity scores
    scores = list(enumerate(similarity_matrix[movie_index]))

    # Remove selected movie
    scores = [
        item for item in scores
        if item[0] != movie_index
    ]

    # Telugu movie filtering
    if selected_movie_id >= 900001:
        scores = [
            item for item in scores
            if int(movies.iloc[item[0]]["movieId"]) >= 900001
            and int(movies.iloc[item[0]]["movieId"]) <= 900030
        ]

    # Sort by similarity
    scores = sorted(
        scores,
        key=lambda item: item[1],
        reverse=True
    )

    recommendations = []

    # Get top recommendations
    for index, score in scores[:limit]:

        movie_id = int(movies.iloc[index]["movieId"])

        recommendations.append({
            "id": movie_id,
            "title": movies.iloc[index]["title"],
            "genre": movies.iloc[index]["genres"],
            "similarity": round(float(score), 3),
            "poster": None
        })

    return recommendations


# Test recommendation model
if __name__ == "__main__":

    results = get_recommendations("RRR (2022)", 5)

    print("\nRecommended Movies:\n")

    for movie in results:
        print(movie)
