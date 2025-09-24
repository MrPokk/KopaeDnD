#!/bin/bash
set -e

echo "🚀 Starting PRODUCTION deployment..."
echo "📦 Building Docker image with nginx..."

# Сборка образа
sudo docker build -t kirillmokrousof/kopae-app:latest .

echo "📤 Pushing to Docker Hub..."
sudo docker push kirillmokrousof/kopae-app:latest

echo "✅ PRODUCTION deployment completed!"
echo "⏰ Watchtower will update the server within 60 seconds"