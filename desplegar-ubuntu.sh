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

# 1. Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "⚠️ Docker no está instalado. Instalando Docker en Ubuntu..."
    sudo apt-get update
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-compose
    sudo usermod -aG docker $USER
    echo "✅ Docker instalado exitosamente."
fi

# 2. Levantar los contenedores con Docker Compose
echo "🚀 Construyendo y levantando contenedores..."
sudo docker-compose up --build -d

echo ""
echo "======================================================="
echo "   Estado de los Contenedores:"
echo "======================================================="
sudo docker-compose ps

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
echo "sudo docker-compose logs -f"
echo ""

