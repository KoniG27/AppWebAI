
La Aplicación de Gestión y Traducción de Textos es una herramienta web diseñada para facilitar la parafraseo, corrección gramatical y traducción de textos en tiempo real. Está dirigida a estudiantes y profesionales que necesitan mejorar la calidad de sus escritos y gestionar textos multilingües de manera eficiente.


npm install
Configurar variables de entorno
Crea un archivo src/environments/environment.ts y agrega las credenciales de la API de OpenAI y cualquier otra configuración necesaria:

typescript
Copiar código
export const environment = {
  production: false,
  openAIApiKey: 'YOUR_OPENAI_API_KEY'
};
Ejecutar la aplicación

ng serve
Acceder a la aplicación
Abre tu navegador y visita http://localhost:4200.

