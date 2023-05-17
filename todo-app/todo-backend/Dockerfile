FROM node:16

USER node
  
WORKDIR ./

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=todo-backend:*

CMD npm start