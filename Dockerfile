FROM node:12.2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
RUN npm install -g @angular/cli@7.3.9
CMD ng serve --host 0.0.0.0
