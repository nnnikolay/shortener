FROM node
WORKDIR /app
COPY package*.json ./
COPY generate.js .
RUN npm install --quiet
# COPY . .
# RUN node generate.js
EXPOSE 3000
# CMD [ "node", "index.js" ]