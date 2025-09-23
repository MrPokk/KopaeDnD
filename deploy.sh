#!/bin/bash
set -e

echo "🚀 Starting deployment..."
echo "📦 Building Docker image..."

# Сборка образа
docker build -t kirillmokrousof/kopae-app:latest .

echo "📤 Pushing to Docker Hub..."
docker push kirillmokrousof/kopae-app:latest

echo "✅ Deployment completed!"
echo "⏰ Watchtower will update the server within 60 seconds"