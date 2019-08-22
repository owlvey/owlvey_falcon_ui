FROM node:12.2.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . /app
CMD ng serve --host 0.0.0.0
