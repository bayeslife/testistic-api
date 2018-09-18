# docker build -t "gcr.io/${PROJECT_ID}/testistic-api:v1"
FROM node:10
RUN mkdir -p /server/src
# set working directory
WORKDIR /server
# copy main project files
COPY package.json /server/
COPY src /server/src/
RUN npm install
# run npm start:prod script
EXPOSE 8081
CMD ["npm", "start"]
