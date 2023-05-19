FROM node:16

USER node
  
WORKDIR usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

# ENV DEBUG=todo-backend:*
# ENV PORT=3001

USER node

CMD ["npm", "start"]