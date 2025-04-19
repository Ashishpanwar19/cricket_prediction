import pandas as pd

df = pd.read_csv(filename)
df.to_csv("C://Users//ashis//Downloads//match_data.csv", index=False)


    # Handle missing values
df.fillna(0, inplace=True)

    # Feature engineering (example: add a 'total_runs' column)
df['total_runs'] = df['team1_runs'] + df['team2_runs']

    # Save preprocessed data
df.to_csv("C://Users//ashis//Downloads//match_data.csv", index=False)

if __name__ == "__main__":
    preprocess_data("C://Users//ashis//Downloads//match_data.csv")