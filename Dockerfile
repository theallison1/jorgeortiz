# Etapa 1: Construcción (Build) - CAMBIAMOS 18 POR 20
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción (Nginx)
FROM nginx:stable-alpine

# Copiamos los archivos compilados desde la etapa anterior a la carpeta de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponemos el puerto 80
EXPOSE 80

# Comando para arrancar Nginx
CMD ["nginx", "-g", "daemon off;"]
