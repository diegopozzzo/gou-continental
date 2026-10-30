# GOU × Universidad Continental — deck web (Reveal.js 5.1)
Sitio estático. Sin build.
## Local
`cd site && python3 -m http.server 8080` → http://localhost:8080 (flechas para navegar, `F` pantalla completa, `S` notas).
## Deploy Vercel
`cd site && npx vercel --prod` (Framework: Other, sin build command, output = raíz). O importar la carpeta `site/` como proyecto en vercel.com.
