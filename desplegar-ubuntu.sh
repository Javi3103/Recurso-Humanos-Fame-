#!/bin/bash
# ==============================================================================
# Script de Despliegue Automático para Ubuntu (Docker)
# Buzón de Sugerencias y Denuncias — FAME S.A.C.
# ==============================================================================

set -e

echo "======================================================="
echo "   Iniciando Despliegue en Ubuntu - FAME Talento Humano"
echo "======================================================="
echo ""

# 1. Detectar comando de Docker Compose (soporta versión moderna 'docker compose' y legacy 'docker-compose')
if docker compose version &> /dev/null; then
    COMPOSE="docker compose"
elif command -v docker-compose &> /dev/null; then
    COMPOSE="docker-compose"
else
    echo "⚠️ Docker Compose no encontrado. Instalando paquete necesario..."
    sudo apt-get update
    sudo apt-get install -y docker-compose-plugin docker-compose
    if docker compose version &> /dev/null; then
        COMPOSE="docker compose"
    else
        COMPOSE="docker-compose"
    fi
fi

echo "✅ Usando comando: $COMPOSE"

# 2. Levantar los contenedores
echo "🚀 Construyendo y levantando contenedores..."
sudo $COMPOSE up --build -d

echo ""
echo "======================================================="
echo "   Estado de los Contenedores:"
echo "======================================================="
sudo $COMPOSE ps

# 3. Obtener la IP local del servidor Ubuntu
IP_LOCAL=$(hostname -I | awk '{print $1}')

echo ""
echo "======================================================="
echo "🎉 ¡Despliegue completado con éxito!"
echo "======================================================="
echo ""
echo "Accede a la aplicación desde cualquier computadora de la red en:"
echo "👉 URL Local / Intranet: http://${IP_LOCAL}"
echo ""
echo "Para ver los registros en tiempo real:"
echo "sudo $COMPOSE logs -f"
echo ""
