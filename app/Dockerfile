FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source mongo:3.4-jessie
COPY . .

# RUN apt-get update && apt-get -y install locales build-essential python python-pip python-dev

# RUN pip install pandas

EXPOSE 3000
CMD [ "npm", "start" ]