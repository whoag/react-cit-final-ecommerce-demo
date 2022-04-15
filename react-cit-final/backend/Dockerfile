FROM node:17.4.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent
RUN npm install --save multer
# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]