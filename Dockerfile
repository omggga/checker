FROM node:18.14.2-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .

ENV PORT=3006
ENV NODE_ENV production
ENV WEBSITE_URL xxxxxx
ENV MATTERMOST_HOOK_URL xxxxx
ENV MATTERMOST_CHANNEL_ID xxxxx
ENV APP_NAME Bigdata

EXPOSE 3006

CMD ["node", "index.js"]