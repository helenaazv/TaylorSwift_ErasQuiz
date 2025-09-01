import requests
import json
import time

API_KEY = "YOUR_API_KEY"  # enter your API key
BASE_URL = "https://www.googleapis.com/youtube/v3/search"

# Load songs.json as JSON
with open("songs.json", "r", encoding="utf-8") as f:
    songs = json.load(f)

def get_video_id(song_title, artist="Taylor Swift"):
    query = f"{song_title} {artist} official audio"
    params = {
        "part": "snippet",
        "q": query,
        "key": API_KEY,
        "maxResults": 1,
        "type": "video"
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    items = data.get("items")
    if items:
        return items[0]["id"]["videoId"]
    return None

# Iterate over albums and tracks to fetch IDs
for album in songs:
    for track in album["tracks"]:
        if track["id"] == "":
            video_id = get_video_id(track["title"])
            print(f"{track['title']} → {video_id}")
            track["id"] = video_id

            # Save progress to JSON after each track
            with open("songs_with_ids.json", "w", encoding="utf-8") as f:
                json.dump(songs, f, indent=2)

            time.sleep(1)  # small delay to avoid API limits

# Optional: Convert JSON to JS file once done
with open("songs_with_ids.json", "r", encoding="utf-8") as f:
    songs = json.load(f)

with open("songs_with_ids.js", "w", encoding="utf-8") as f:
    f.write("const songs = ")
    json.dump(songs, f, indent=2)
    f.write(";")
