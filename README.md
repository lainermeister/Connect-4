# Connect-4

Playable Connect 4 Game built in Javascript.

![example game](/client/src/img/example.png)

## Features

- All Connect Four rules implemented
- Ability for users to enter player names
- Game records kept and displayed via Recent Games and Leaderboard dashboards

## To run deployed app

[Click here](https://connect4-lainermeister.herokuapp.com/)

## To run app locally

First install dependencies:

```sh
npm install
```

To setup the MySQL database (in mySQL shell):

```mysql
drop database connect4; create database connect4; use connect4;
```

To create a production build and start server:

```sh
npm run build-prod
```

```sh
npm start
```

To create a development build and start server:

```sh
npm run build-dev
```

```sh
npm run server-dev
```

Navigate to `http://localhost:3000` in your browser
