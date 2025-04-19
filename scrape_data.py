import requests
from bs4 import BeautifulSoup
import pandas as pd

# Scrape match data from a cricket website
def scrape_match_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    matches = []
    for match in soup.find_all('div', class_='match-info'):
        match_data = {
            'team1': match.find('div', class_='team-1').text.strip(),
            'team2': match.find('div', class_='team-2').text.strip(),
            'result': match.find('div', class_='result').text.strip(),
            'date': match.find('div', class_='date').text.strip()
        }
        matches.append(match_data)

    return matches

# Save data to CSV
save_to_csv(match_data, "scraped_matches.csv"):
df = pd.DataFrame(data)
df.to_csv(filename, index=False)

# Main function
if __name__ == "__main__":
    url = "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/match-results"
    match_data = scrape_match_data(url)
    save_to_csv(match_data, "")