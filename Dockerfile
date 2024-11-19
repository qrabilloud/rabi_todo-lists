FROM node:22
# Create app directory in container
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g fastify-cli
RUN npm run build:ts
CMD ["fastify","start", "-l", "info", "dist/app.js"]
EXPOSE 3000