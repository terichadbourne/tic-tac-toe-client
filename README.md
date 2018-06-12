# Tic Tac Toe

## Teri Chadbourne


### About This Project

This tic tac toe game was built over the course of 4 workdays as an [assignment](https://git.generalassemb.ly/ga-wdi-boston/game-project) for General
Assembly's Web Development Immersive. It uses a [pre-built Rails API](https://git.generalassemb.ly/ga-wdi-boston/game-project-api) to store
user data and game board details for tic tac toe games on the server, while all
game logic, user authentication form, and styling are handled locally on the
client through my own code.

### Play Now!

You can play the game live at: [https://terichadbourne.github.io/tic-tac-toe-client/](https://terichadbourne.github.io/tic-tac-toe-client/)

### Technologies & Methodologies Used

- JavaScript
- jQuery
- JSON
- AJAX
- Third-Party API
- HTML
- CSS
- SASS
- Git & GitHub
- Responsive Design

### Planning Process

After reviewing our [assignment](https://git.generalassemb.ly/ga-wdi-boston/game-project) and examining the [API documentation](https://git.generalassemb.ly/ga-wdi-boston/game-project-api), I
laid out a plan of attack for this project.

#### Wireframes

With a responsive design in mind, I developed the following wireframes before
starting on development:
- [Desktop wireframe](https://git.generalassemb.ly/terichadbourne/game-project-scope-study/blob/response/images/DesktopWireframe.JPG)
- [Mobile wireframe](https://git.generalassemb.ly/terichadbourne/game-project-scope-study/blob/response/images/MobileWireframe.JPG)

TODO: Move these files into this repo and update links.

#### User Stories

I also developed a partial list of user stories to highlight development
requirements:

- Authentication & Game Statistics
    - As a [player], I want to [create an account] so I can [track my score].
    - As a [player], I want to [see how many games I've won and lost] so I can
[stay motivated].
- Gameplay
    - As a [player], I want to [play against the person sitting next to me] so I
can [whoop them at tic tac toe].
    - As a [player], I want to [see whose turn is next] so
I can [avoid confusion].
    - As a [player], I want to [clearly see who's won the game] so
I can [celebrate accordingly].

#### Work Process

My work process was laid out in advance:

- Start with the proposed timeline as a guide to stay on track.
- Thoroughly review the API docs before writing any of my own code.
- Build data structure based on requirements of existing API.
- Use psuedocode before writing any real code, and include comments as I go.
- Commit frequently.
- Separate gameplay work from authentication work.
- Meet all basic requirements before starting on enhancements.
- Use feature branches to work on discrete aspects of the project.

#### Keeping the Code Modular

To keep code manageable, I used Node modules to enforce separation of concerns:

- Gameplay
    - Events (click handlers, checking the board for wins, etc.)
    - UI (updating the board and user-facing messages)
- Game API (retrieving records of a user's game from the server):
    - API (AJAX calls)
- User authentication (signing Up, logging in, changing password, logging out):
    - Events (clicks and form submissions)
    - API (AJAX calls)
    - UI (UI updates based on changes to auth state)

### Unsolved Problems & Future Challenges

Given more time, I'd love to work on the following challenges:

#### Improving Existing Code
- Refactor my code to reduce repitition
- Improve styling for better responsiveness as the viewport changes size

#### Adding New Functionality
- Create a single-device offline mode that allows play without a login or
internet connection
- Enable two users to play from separate devices, using the [muliplayer API](https://git.generalassemb.ly/ga-wdi-boston/game-project-api/blob/master/docs/game-multiplayer.md)
- Allow users to choose from a selection of symbols to represent them on the
board
