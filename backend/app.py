import pandas as pd
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import os

app = Flask(__name__)
CORS(app)

df = pd.read_csv("./assets/movies.csv")
df = df.dropna(subset=["overview"]) 

tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df['overview'])

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(df.index, index=df['original_title'].str.lower())

def recommend_by_content(title, n=5):
    title = title.strip().lower()

    if title not in indices:
        return "movie not found"

    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:n+1]
    movie_indices = [i[0] for i in sim_scores]
    return df['original_title'].iloc[movie_indices].tolist()

@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    title = data.get("movie", "").strip()
    return jsonify(recommend_by_content(title))

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    print("✅ Flask server is running on http://127.0.0.1:5000")
    app.run(debug=True)
