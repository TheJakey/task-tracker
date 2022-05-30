[![Docker Frontend](https://github.com/TheJakey/task-tracker/actions/workflows/main.yml/badge.svg)](https://github.com/TheJakey/task-tracker/actions/workflows/main.yml)

# Task Tracker
Based on [YouTube Crash-course](https://www.youtube.com/watch?v=3dHNOWTI7H8)

Almost exact copy of:
https://github.com/bradtraversy/angular-crash-2021

## Usage

### Docker
Get docker-compose.yaml from this project and run:

```
docker-compose -p TaskTracker up -d
```

### Local
#### Install dependencies

```
npm install
```

#### Run Angular server (http://localhost:4200)

```
ng serve
```

#### Run the JSON server (http://localhost:5000)

```
npm run server
```

#### To build for production

```
ng build
```
