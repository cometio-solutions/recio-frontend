FROM alpine:3.8
RUN apk add python3
RUN apk add bash
WORKDIR /app
CMD ["python3", "-m", "http.server", "8080"]
