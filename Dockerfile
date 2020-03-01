FROM node:10
COPY ./ /store_ui
WORKDIR /store_ui
RUN npm install && npm run build

FROM nginx
RUN mkdir /store_ui
COPY --from=0 /store_ui/dist /store_ui
COPY nginx.conf /etc/nginx/nginx.conf