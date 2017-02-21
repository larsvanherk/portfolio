FROM node:6

RUN useradd -ms /bin/bash worker
WORKDIR /home/worker/app

EXPOSE 5000

ADD dist/ /home/worker/app/dist/
ADD package.json index.js /home/worker/app/

RUN chown -R worker:worker /home/worker \
 && npm install --production

USER worker

ENTRYPOINT ["npm", "start"]