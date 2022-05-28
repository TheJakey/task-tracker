FROM nginx:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN apk add nodejs-current npm
RUN npm install
RUN npm install -g json-server
COPY . .

RUN npm link @angular/cli
RUN npm run ng build -- --prod

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/task-tracker /usr/share/nginx/html

CMD ./docker-wrapper.sh