FROM node:12.2.0 as builder
WORKDIR /lionnix-dashboard
ADD ./ /lionnix-dashboard
RUN cp .env.production .env
RUN yarn global add @vue/cli
RUN yarn install
RUN yarn run build --mode production

# Serve
FROM nginx
WORKDIR /usr/share/nginx
COPY --from=builder /lionnix-dashboard/dist dist
RUN rm -rf html
RUN mv dist html
COPY --chown=root:root ./deploy/docker/nginx.conf /etc/nginx/conf.d/default.conf
