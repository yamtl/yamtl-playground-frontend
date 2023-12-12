# syntax=docker/dockerfile:1

FROM node:19-alpine AS toolstaticbuild

WORKDIR /usr/src/mdenet-tool

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY static.emf/package*.json ./

COPY static.emf .

RUN npm install; npm run build; chmod -R 755 dist/


FROM nginx:1.25.0-alpine AS toolservice


# Needed for Cloud Build
ENV PORT=80

# Expose port 80 for web server 
EXPOSE 80

# Install Python, OpenJDK, Maven, tini, and netcat
# python3 openjdk17 maven 
RUN apk add --no-cache tini netcat-openbsd 

# Copy built tool and sources
# COPY --from=toolfunctions /root/.m2 /root/.m2
# COPY --from=toolfunctions /usr/src/toolfunctions /toolservice

# Copy files for webserver
COPY static.emf/nginx.conf.template /etc/nginx.conf.template

# Remove default HTML and copy new HTML
RUN rm -r /usr/share/nginx/html/*
COPY --from=toolstaticbuild /usr/src/mdenet-tool/dist /usr/share/nginx/html

WORKDIR /toolservice

# Copy start script and make it executable
ADD static.emf/start.sh /
RUN chmod +x /start.sh

ENTRYPOINT ["/sbin/tini", "--", "/start.sh"]