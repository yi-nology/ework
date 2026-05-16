FROM node:16-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN NODE_OPTIONS=--openssl-legacy-provider yarn build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html && \
    rm -f /usr/share/nginx/html/._* && \
    rm -rf /usr/share/nginx/html/css/._* /usr/share/nginx/html/js/._* /usr/share/nginx/html/fonts/._* /usr/share/nginx/html/img/._* && \
    chown -R nginx:nginx /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]

