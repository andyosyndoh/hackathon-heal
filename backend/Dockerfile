# Multi-stage build for Go application
FROM golang:1.21-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies, including 'build-base' for the C compiler (gcc)
RUN apk add --no-cache git ca-certificates build-base

# Copy go mod files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy source code
COPY . .

RUN CGO_ENABLED=1 GOOS=linux go build -a -tags "osusergo netgo sqlite_omit_syscall_vfs" -ldflags '-extldflags "-static"' -o main .

# Final stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests and sqlite
RUN apk --no-cache add ca-certificates sqlite

# Set the working directory
WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Create directory for database
RUN mkdir -p /data

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]