# pull official base image
FROM node:17.4.0-alpine
# set working directory
WORKDIR /usr/src/app

# add `/react/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install client dependencies

COPY package*.json ./

RUN npm install --silent

# add client
COPY . ./
# start client
EXPOSE 3000
CMD ["npm", "start"]