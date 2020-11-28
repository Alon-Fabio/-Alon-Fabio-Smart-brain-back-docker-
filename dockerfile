FROM node:12.13.0

WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install

CMD ["sh"]