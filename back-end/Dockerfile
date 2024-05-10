# Stage 1: Build the application
FROM openjdk:17-slim AS build
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y wget && \
    wget https://downloads.apache.org/maven/maven-3/3.9.5/binaries/apache-maven-3.9.5-bin.tar.gz && \
    tar xzvf apache-maven-3.9.5-bin.tar.gz && \
    ln -s /app/apache-maven-3.9.5/bin/mvn /usr/bin/mvn

COPY pom.xml .

# Download all required dependencies into one layer
RUN mvn dependency:go-offline -B

COPY . .
RUN mvn clean package

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/hci-aphasia-1.0-SNAPSHOT.jar hci-aphasia-1.0-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "hci-aphasia-1.0-SNAPSHOT.jar"]