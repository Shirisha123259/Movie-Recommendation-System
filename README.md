
# 🎬 CineMatch – Movie Recommendation System

CineMatch is a full-stack movie recommendation application that helps users discover movies based on their selected movie's genre.

## 🚀 Features

- Search and select movies from a movie database.
- Get five movie recommendations.
- Genre-based movie similarity calculation.
- Telugu movie recommendations.
- Movie poster display.
- Similarity percentage for each recommendation.
- Interactive and responsive React interface.

## 🧠 Machine Learning

The recommendation engine uses:
- Python
- Pandas
- TF-IDF Vectorization
- Cosine Similarity

Movie genres are converted into numerical features using TF-IDF. Cosine similarity is then used to identify movies with similar genres.

**Note:** Similarity scores represent genre similarity, not plot or story similarity.

## 🛠️ Technologies Used

| Component | Technology |
|---|---|
| Frontend | React, Vite |
| Backend | Python, FastAPI |
| Machine Learning | Scikit-learn |
| Data Processing | Pandas |
| Database | CSV datasets |
| API Testing | Swagger UI |

## 📂 Project Structure

```text
Movie-Recommendation-System/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── requirements.txt
│
├── frontend/
│   └── movie-app/
│       ├── public/
│       │   └── posters/
│       └── src/
│           ├── App.jsx
│           ├── App.css
│           └── index.css
│
├── ml/
│   ├── dataset/
│   │   ├── movies.csv
│   │   ├── ratings.csv
│   │   ├── tags.csv
│   │   └── links.csv
│   └── recommender.py
│
├── docker-compose.yml
└── README.md
```

## ⚙️ How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/Shirisha123259/Movie-Recommendation-System.git
cd Movie-Recommendation-System
```

### 2. Activate the Python environment

```powershell
python -m venv .venv
.venv\Scripts\activate
```

### 3. Install backend dependencies

```powershell
pip install -r backend/requirements.txt
```

### 4. Start the backend

Run from the project root:

```powershell
python -m uvicorn backend.main:app --reload
```

Backend: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

### 5. Start the frontend

Open another terminal:

```powershell
cd frontend/movie-app
npm install
npm run dev
```

Frontend: http://localhost:5173

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/movies` | Retrieves movie titles |
| POST | `/recommendations` | Generates movie recommendations |

## 🎯 Project Objective

To build an interactive movie recommendation platform using machine learning, Python, FastAPI, and React.

## 👩‍💻 Author

P Shirisha

GitHub: https://github.com/Shirisha123259
