FROM node as builder
    WORKDIR /build/
    COPY ./ .
    # RUN ls -l
    RUN npm install
    RUN npm rebuild node-sass
    RUN npm run build:docker

FROM nginx:1.16.0-alpine
    COPY --from=builder /build/dist /usr/share/nginx/html
    # RUN ls /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
