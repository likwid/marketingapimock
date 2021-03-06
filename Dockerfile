FROM gliderlabs/alpine
ADD package.json /srv/app/
WORKDIR /srv/app

RUN apk-install nodejs \
    && npm install -g npm \
    && npm install

ADD . /srv/app

EXPOSE 5000
CMD ["npm", "start"]
