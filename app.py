from flask import Flask, request, jsonify
import pickle
import pandas as pd # type: ignore

app = Flask(__name__)

# Load models
with open("models/score_prediction_model.pkl", "rb") as f:
    score_model = pickle.load(f)

with open("models/win_percentage_model.pkl", "rb") as f:
    win_model = pickle.load(f)

# Score prediction endpoint
@app.route('/predict_score', methods=['POST'])
def predict_score():
    data = request.get_json()
    features = pd.DataFrame([data])
    features = pd.get_dummies(features, drop_first=True)
    prediction = score_model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

# Win percentage endpoint
@app.route('/predict_win', methods=['POST'])
def predict_win():
    data = request.get_json()
    features = pd.DataFrame([data])
    features = pd.get_dummies(features, drop_first=True)
    prediction = win_model.predict(features)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)