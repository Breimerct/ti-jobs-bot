# 1. Usar una imagen base
FROM node:18-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos de la aplicación
COPY package*.json ./

# 4. Instalar las dependencias
RUN npm install

# 5. Copiar el resto del código
COPY . .

# 6. Construir la aplicación para producción
RUN npm run build

# 7. Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# 8. Comando para construir la aplicación
CMD ["npm", "run", "build"]

# 9. Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]
