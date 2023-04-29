FROM bellsoft/liberica-openjdk-alpine:17.0.7-7 AS build
# Install Node.js 19
RUN apk add --update nodejs npm

# Copy the project files
COPY . /app
WORKDIR /app

# Install Node.js packages
RUN npm install

# Build the Gradle project
RUN chmod +x gradlew
RUN ./gradlew build --no-daemon

#
# Package stage
#
FROM bellsoft/liberica-openjdk-alpine:17.0.7-7
COPY --from=build /app/build/libs/chat-0.0.1-SNAPSHOT.jar chat.jar
# ENV PORT=443
EXPOSE 443
ENTRYPOINT ["java","-jar", "chat.jar", "--spring.profiles.active=prod"]