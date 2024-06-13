Aplicación de Gestión y Traducción de Textos
Descripción
La Aplicación de Gestión y Traducción de Textos es una herramienta web diseñada para facilitar la parafraseo, corrección gramatical y traducción de textos en tiempo real. Está dirigida a estudiantes y profesionales que necesitan mejorar la calidad de sus escritos y gestionar textos multilingües de manera eficiente.

Características Principales
Parafraseo: Reformula textos para evitar el plagio y mejorar la redacción.
Corrección Gramatical: Detecta y corrige errores gramaticales en tiempo real.
Traducción: Traduce textos a múltiples idiomas usando la API de OpenAI.
Soporte Multilingüe: Interfaz de usuario disponible en varios idiomas.
Historial de Actividades: Guarda un historial de textos parafraseados, corregidos y traducidos.
Interfaz Intuitiva: Diseño responsivo y fácil de usar.
Tecnologías Utilizadas
Frontend: Angular, TypeScript
Backend: API de OpenAI para servicios de parafraseo y traducción
Multilingüe: @ngx-translate/core
Gestión de Estado: Angular Services
Diseño: HTML, SCSS
Requisitos Previos
Node.js (versión 12 o superior)
Angular CLI
Cuenta en OpenAI para acceso a la API
Instalación
Clonar el repositorio

git clone https://github.com/tuusuario/gestion-traduccion-textos.git
cd gestion-traduccion-textos
Instalar dependencias


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

