[![Docker Frontend](https://github.com/TheJakey/task-tracker/actions/workflows/main.yml/badge.svg)](https://github.com/TheJakey/task-tracker/actions/workflows/main.yml)

# Task Tracker
Based on [YouTube Crash-course](https://www.youtube.com/watch?v=3dHNOWTI7H8)
[Git repo](https://github.com/bradtraversy/angular-crash-2021)

## Usage

### Docker
1. As is right now, you need to modify `serviceUrl` located in [environment.prod.ts](src\environments\environment.prod.ts) and replace ip with the one you will be using. 

2. Than build image with 

```
docker build -t task-tracker:latest .
```

3. Last but not least, run image with docker-compose:

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
