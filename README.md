# ChessDrilla


ChessDrilla is a custom chess drill application where users can create positions and practice move sequences.


## Current Status


Early development.


## Planned Features


- Interactive chessboard ✅
- Drill Creation and Editing (In development) 
- Backend and PostgreSQL persistence
- Training Mode with arrow-guided sequence demonstrations followed by user recall
- Memorize Mode where the user performs the sequence without an initial demonstration
- Folders for organizing related openings, variations, and drill groups
- Folder-level Training and Memorize practice
- Quizlet-style drill queues where correct drills move forward and missed drills are requeued
- Study mode for engine analysis and note taking 
- Move annotations such as blunder, mistake, inaccuracy, interesting move, good move, and brilliant move for either side
- A later weighted-practice mode where lower-accuracy drills can appear more frequently than drills the user consistently answers correctly




## Development & Acknowledgements


This project began with a tutorial-guided implementation of the chessboard and chess rules, based on the YouTube tutorial Create a Chess Game with React by Frontend-Coder.
Chess piece artwork by RhosGFX. Used under CC0 1.0 Universal 
The custom drill system and later application features are being developed independently.


## Development Milestones

v0.1.0 
Chess Tutorial Completed — Commit fe8c156 "Added Inssufficient material and checkmate logic. Added Chess Notation and take back feature"

Bugs fixed and missing features added in chess engine:
- Takeback function not updating castling right 
- check and checkmate notation 
- disambigous moves in notation 
- certain scenarios breaking castling rights (check commit c41266a for more information)
v0.1.1
Sucessful migration to vite 

v0.2.0
Chess drills now createable and playable in one happy path loop
- Must play all moves for both opponent and self 
- No persistent saving yet 






## Version History


v0.1.0 Playabble chess game 
v0.2.0 Playable drill engine  


## Credits


Tutorial-guided implementation of the chessboard and chess rules, based on the YouTube tutorial Create a Chess Game with React by Frontend-Coder. His Repo can also be found at https://github.com/felerticia/chess
Chess piece artwork by RhosGFX. Creator: https://rhosgfx.itch.io/

