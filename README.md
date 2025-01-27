# Geo Quizzer

    @author Fabian Schlagheck
    @date 26.01.2025

## Description

GeoQuizzer is a quiz game that combines location guessing and quiz game play. So it's the user's task to find a place on the map lead by hints. Starting with one hint and three free guesses the user can earn more hints and guesses. The user can also activate a compass that support the directions. A detailed description of each features follows below:

### Features

**Hints System**:

    Users receive up to five hints to find the location.
    Hints can include text and images.
    Users can purchase additional hints using in-game credits.
    
**Guessing Mechanism**:

    Users have a limited number of guesses to find the location.
    Users can purchase additional guesses using the same in-game credits.
    Distance from the target location is calculated via harvesine-algorithm and displayed after each guess.

**Compass Feature:**

    If a guess is within a certain distance, users can purchase a compass to get the direction to the target.
    Compass is displayed where the previous hint was set.

**Scoring and Credits:**

    Users earn credits for correct guesses.
    Depending of the difficulty of that previous item they earn more or less.
    Credits can be used to purchase additional hints and guesses.

**Interactive Map:**

    The app uses Leaflet/React Leaflet for interactive maps.
    Users can switch between different map styles (Satellite, Open Street Map).
    Optional display of borders and streets on the map.

**Initial animation:**

    Sequence when the game starts.
    Animations for hints and guess results.

**Modals:**

    Various modals for displaying rules, hints, guess results, and end of round information.

**Game State Management:**

    The app uses custom hooks and context for managing game states and user interactions.
    A complex game state algorithm allows switching to the right screen depending on users decisions, credits etc.

## Interaction

- preferably, the user interacts with a mouse that has a scroll function. Touchscreens are supported, but may not work correctly with css.

## Project Structure

- the code base is organized in modules in /src; /App structures all 
    - there can be found /modals for intermediate screens (not including the external pop-up window)
    - a folder /ui-elements for inner ui-elements such as clock, guesses, hints etc.
    - /GameMap for map related components 
- a separate folder /components contains re-usable components such as TextButton or PopUpWindow

## Deployment 

- a deployed version can be visited: [GeoQuizzer](https://fabschlag95.github.io/geo-quizzer/)

## Installation 

- npm install
- npm run dev
- follow the link for localhost

## Testing

- tested on Microsoft Edge, Google Chrome and Safari vor Ipad
- not optimized for smartphones

## Technologies in use

- This webpage is based on React.js
- The map is integrated using leaflet

## External Libraries

- React: ^18.3.1
- React DOM: ^18.3.1
- React Leaflet: ^4.2.1
- Leaflet: ^1.9.4
- Maplibre GL: ^5.0.1
- Haversine Distance: ^1.2.3
- @turf/turf: ^7.1.0
- Vite: ^5.4.10
- ESLint: ^9.13.0
- ESLint Plugins: react, react-hooks, react-refresh
- Globals: ^15.11.0

## References

- all pictures used are in the public domain; attribution is only provided below, not in the game to avoid spoiling game play
- map providers are: (also credited in the footer)
    - for satellite imagery: Esri, i-cubed, USDA, USGS, AEX,
          GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User
          Community 
    - Open Street Map: https://www.openstreetmap.org/copyright
- FontAwesome-Icons are in use
- for borders: Runfola, D. et al. (2020) geoBoundaries: A global database of political administrative boundaries. PLoS ONE 15(4): e0231866. https://doi.org/10.1371/journal.pone.0231866

**Image References**

- https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Venice_Beach%2C_Los_Angeles%2C_CA_01_%28cropped%29.jpg/1200px-Venice_Beach%2C_Los_Angeles%2C_CA_01_%28cropped%29.jpg?20200429051833
- https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Kafka.jpg/840px-Kafka.jpg?uselang=de
- https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chernobyl_30_Years_after_%E2%80%93_Public_Domain_CC0_-_29910952187.jpg/1200px-Chernobyl_30_Years_after_%E2%80%93_Public_Domain_CC0_-_29910952187.jpg?20200315142444
- https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Machu_Picchu.png/1280px-Machu_Picchu.png?uselang=de
- https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Angkor_Wat_%289709626400%29.jpg/1200px-Angkor_Wat_%289709626400%29.jpg?20200903211412
- https://upload.wikimedia.org/wikipedia/commons/d/d3/Boulevard_du_Temple_by_Daguerre.jpg?uselang=de
- https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Ice-cream-2097480.jpg/900px-Ice-cream-2097480.jpg?20220407144753
- https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Kilimanjaro_2006-08-13.JPG/800px-Kilimanjaro_2006-08-13.JPG
- https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Ayers_Rock-view_from_50k.jpg/1024px-Ayers_Rock-view_from_50k.jpg
- https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Friedrich_Eibner_Marienplatz_in_M%C3%BCnchen.jpg/1280px-Friedrich_Eibner_Marienplatz_in_M%C3%BCnchen.jpg
- https://upload.wikimedia.org/wikipedia/commons/1/10/Bushes_watch_USA_vs._Czech_Republic_women%27s_basketball_game_at_2008_Summer_Olympics_2008-08-09.jpg?2010041618161
- https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/USS_Arizona_in_New_York_City_Crisco_edit.jpg/981px-USS_Arizona_in_New_York_City_Crisco_edit.jpg
- https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Nybrogatan_Stockholm_2022-09-20_01.jpg/1024px-Nybrogatan_Stockholm_2022-09-20_01.jpg"
- https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Brandenburg-townhall.JPG/512px-Brandenburg-townhall.JPG
- 