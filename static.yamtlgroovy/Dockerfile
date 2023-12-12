# syntax=docker/dockerfile:1


# FROM node:19-bullseye AS toolstaticbuild
FROM node:19-alpine AS toolstaticbuild

WORKDIR /usr/src/mdenet-tool

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY static.yamtlgroovy/package*.json ./

COPY static.yamtlgroovy .


RUN npm install; npm run build; chmod -R 755 dist/

# Use Alpine-based Nginx
FROM nginx:1.24.0-alpine AS toolservice

# Environment variables
ENV PORT=80

# Expose port 80 for web server 
EXPOSE 80

# Install Python, OpenJDK, Maven, tini, and netcat
RUN apk add --no-cache python3 openjdk17 maven tini netcat-openbsd

# Copy built tool and sources
# COPY --from=toolfunctions /root/.m2 /root/.m2
# COPY --from=toolfunctions /usr/src/toolfunctions /toolservice

# Copy files for web server
COPY static.yamtlgroovy/nginx.conf.template /etc/nginx.conf.template

# Remove default HTML and copy new HTML
RUN rm -r /usr/share/nginx/html/*
COPY --from=toolstaticbuild /usr/src/mdenet-tool/dist /usr/share/nginx/html

# Set working directory
WORKDIR /toolservice

# Copy start script and make it executable
ADD static.yamtlgroovy/start.sh /
RUN chmod +x /start.sh

# Set the entry point
ENTRYPOINT ["/sbin/tini", "--", "/start.sh"]