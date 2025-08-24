
# Movie Recommender App

<img width="1919" height="918" alt="image" src="https://github.com/user-attachments/assets/42cc3ac9-a56a-4897-a370-a597e6596824" />


A simple **Movie Recommendation Web App** built with:
- **Frontend:** React + Tailwind CSS
- **Backend:** Flask (Python) + scikit-learn + pandas
- **Deployment:** Render

---

## 🚀 Features
- Search for a movie and get similar recommendations.
- Backend uses TF-IDF + cosine similarity on movie overviews.
- Fully responsive UI with Tailwind CSS.
- Cross-origin requests handled with Flask-CORS.

---

## 📂 Project Structure

```
movie-recommender/
│
├── backend/
│   ├── app.py # Flask API
│   ├── assets/movies.csv # Dataset
│   ├── requirements.txt # Python dependencies
│
├── client/
│   ├── src/ # React components
│   ├── package.json
│   ├── tailwind.config.js
│
└── README.md
```
---

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/movie-recommender.git
cd movie-recommender
```

### 2️⃣ Backend Setup (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```


Backend will run at http://127.0.0.1:5000

### 3️⃣ Frontend Setup (React)
Open a new terminal:

```bash
cd client
npm install
npm run dev
```

change the axios post request url to http://127.0.0.1:5000/recommend

Frontend will run at http://127.0.0.1:5173

---

## 🔗 Example API Request
```bash
curl -X POST https://localhost:5000/recommend \
-H "Content-Type: application/json" \
-d '{"movie": "Inception"}'
```
