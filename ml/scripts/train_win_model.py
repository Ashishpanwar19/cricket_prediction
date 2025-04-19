import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

# Load preprocessed data
df = pd.read_csv("C://Users//ashis//Downloads//match_data.csv")

# Features and target

X = df[['team1', 'team2', 'pitch_type', 'weather']]  # Example features
y = df['result']  # 1 for win, 0 for loss

# Convert categorical features to numerical
X = pd.get_dummies(X, drop_first=True)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Logistic Regression model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy}")

# Save model
with open("../backend/models/win_percentage_model.pkl", "wb") as f:
    pickle.dump(model, f)