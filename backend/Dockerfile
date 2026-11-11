FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json tsconfig.json ./

# Instalar dependencias de producción y compilación
RUN npm install

# Copiar código fuente
COPY src ./src

# Compilar TypeScript a JavaScript
RUN npm run build

# Exponer el puerto del API
EXPOSE 4000

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=4000

# Iniciar servidor
CMD ["npm", "start"]
