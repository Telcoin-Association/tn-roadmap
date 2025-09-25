.PHONY: help docker stop clean logs bash build-dev

# full path for the Makefile
ROOT_DIR:=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))
BASE_DIR:=$(shell basename $(ROOT_DIR))

.DEFAULT: help

# Project configuration
PROJECT_NAME := tn-roadmap
DEV_PORT := 5173
# Docker image names
DEV_IMAGE := $(PROJECT_NAME):dev
# Container names
DEV_CONTAINER := $(PROJECT_NAME)-dev

help:
	@echo "Available commands:"
	@echo "  build-dev    - Build development Docker image"
	@echo "  docker       - Build and run development container"
	@echo "  stop         - Stop all running containers"
	@echo "  clean        - Remove containers and images"
	@echo "  bash         - Open bash in development container"
	@echo "  logs         - Show logs from running container"

# Build development image
build-dev:
	@echo "Building development image..."
	docker build --target development -t $(DEV_IMAGE) .

# Run development server with hot reload
docker: build-dev
	@echo "Starting development server on http://localhost:$(DEV_PORT)"
	docker run --rm -d \
		--name $(DEV_CONTAINER) \
		-p $(DEV_PORT):5173 \
		-v $(PWD):/app \
		-v /app/node_modules \
		$(DEV_IMAGE)
	@echo "Development server running. Use 'make logs' to see output or 'make stop' to stop."

# Stop all containers
stop:
	@echo "Stopping containers..."
	-docker stop $(DEV_CONTAINER) 2>/dev/null || true

# Clean up containers and images
clean: stop
	@echo "Cleaning up..."
	-docker rm $(DEV_CONTAINER) 2>/dev/null || true
	-docker rmi $(DEV_IMAGE) 2>/dev/null || true

# Show logs from running containers
logs:
	@if docker ps | grep -q $(DEV_CONTAINER); then \
		echo "=== Development container logs ==="; \
		docker logs -f $(DEV_CONTAINER); \
	else \
		echo "No containers are currently running."; \
		echo "Use 'make docker' to start a container."; \
	fi

# Open shell in development container
bash: build-dev
	docker run --rm -it \
		-v $(PWD):/app \
		-v /app/node_modules \
		$(DEV_IMAGE) /bin/bash
