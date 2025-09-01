# Taylor Swift Eras Quiz 
## Work in Progress

This is a work-in-progress interactive quiz app inspired by **Taylor Swift's Eras**.  
The app lets users select an Era, get custom styling for that Era, and (in future versions) play quiz questions or songs directly from YouTube.  

<img src="./public/rep_screen.png" alt="Reputation Screen" width="400"/>
<img src="./public/home_screen.png" alt="Home Screen" width="400"/>


## Features (so far)

- **Interactive Eras Selector**  
  - Expandable, animated **Eras carousel** with album artwork.
  - Smooth hover and selection effects (flex-based with scaling animations).
  - Each Era has its own color theme and button styling.

- **Dynamic Start Button**  
  - Pixel-style retro button (`Press Start 2P` font).  
  - Era-specific background and text color.
  - Animations via **Framer Motion**.

- **Custom Theming**  
  - Background color of the app changes based on the selected Era.
  - Button styling is automatically tied to the Era.

- **YouTube Integration (Backend Helper)**  
  - `youtubeIDs.py` script fetches official audio video IDs from the **YouTube Data API** for each track in a `songs.json`.  
  - Saves results into `songs_with_ids.json` and a ready-to-use `songs_with_ids.js`.

---
