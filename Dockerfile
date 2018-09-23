# docker build -t "gcr.io/${PROJECT_ID}/testistic-api:v1"
FROM node:10
RUN mkdir -p /server/src
# set working directory
WORKDIR /server

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /server/

# install project dependencies
RUN npm install

# copy project files
COPY src /server/src/

# run npm start:prod script
EXPOSE 8081
CMD ["npm", "start"]
