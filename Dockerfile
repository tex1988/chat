FROM gradle:7.6.1-jdk17-alpine AS build
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
FROM eclipse-temurin:17-alpine
COPY --from=build /app/build/libs/chat-0.0.1-SNAPSHOT.jar chat.jar
# ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java","-jar","chat.jar"]