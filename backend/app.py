import pandas as pd
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load saved files
df = pd.read_csv("./assets/movies.csv")
with open("./assets/cosine_sim.pkl", "rb") as f:
    cosine_sim = pickle.load(f)
with open("./assets/indices.pkl", "rb") as f:
    indices = pickle.load(f)

def recommend_by_content(title, n=5):
    title = title.strip().lower()
    indices_lower = indices.index.str.lower()

    if title not in indices_lower:
        return "movie not found"

    idx = indices[indices_lower == title].values[0]

    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:n+1]
    movie_indices = [i[0] for i in sim_scores]
    return df['original_title'].iloc[movie_indices].tolist()


@app.route("/recommend", methods=["POST"])
def recommend():
    data = request.get_json()
    title = data.get("movie")
    return jsonify(recommend_by_content(title))

if __name__ == "__main__":
    print("Flask server is running!")
    app.run(debug=True)
