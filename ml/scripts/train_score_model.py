import pandas as pd
from sklearn.model_selection import train_test_split
import xgboost as xgb
from sklearn.metrics import mean_squared_error
import pickle

# Load preprocessed data
df = pd.read_csv("C://Users//ashis//OneDrive//Desktop//cricket prediction//data//match_data.csv")

# Features and target
X = df[['team1', 'team2', 'pitch_type', 'weather']]  # Example features
y = df['total_runs']

# Convert categorical features to numerical
X = pd.get_dummies(X, drop_first=True)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost model
model = xgb.XGBRegressor()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")

# Save model
with open("../backend/models/score_prediction_model.pkl", "wb") as f:
    pickle.dump(model, f)