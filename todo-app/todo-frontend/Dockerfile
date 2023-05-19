# TEST_STAGE
FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

RUN CI=true npm run test

# BUILD_STAGE
FROM node:16 AS build-stage

WORKDIR usr/src/app

COPY --from=test-stage /usr/src/app .

RUN npm ci

ENV NODE_ENV production

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

COPY --from=test-stage /usr/src/app .

RUN npm ci --only=production

RUN npm run build

# Production stage
FROM node:16

WORKDIR /usr/src/app

COPY --from=build-stage --chown=node:node /usr/src/app/build /usr/src/app/build

RUN npm install -g serve

USER node

CMD ["serve", "-s", "build"]

# FROM nginx:1.20-alpine
# # COPY the directory build from build-stage to /usr/share/nginx/html
# # The target location here was found from the Docker hub page
# COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html