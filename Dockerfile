FROM nginx:alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN apk add nodejs-current npm
RUN npm install
RUN npm install -g json-server
COPY . .

RUN npm link @angular/cli
RUN npm run ng build --configuration production --aot

COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["sh", "docker-wrapper.sh"]