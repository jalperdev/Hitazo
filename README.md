# Hitazo

Juego musical tipo Hitster para un solo móvil que va pasando de mano en mano. Es una web instalable (PWA): no necesita compilarse.

## Ponerla en marcha (unos 10 minutos)

### 1. Publicar la web
Spotify y la cámara exigen HTTPS. La forma más sencilla es GitHub Pages:

1. Crea un repositorio (por ejemplo `hitazo`) y sube el contenido de esta carpeta a la raíz.
2. En el repositorio: **Settings → Pages → Branch: main / (root) → Save**.
3. Unos minutos después la tienes en `https://TU_USUARIO.github.io/hitazo/`.

También sirven Netlify, Vercel o Cloudflare Pages: basta con arrastrar la carpeta.

### 2. Crear la app de Spotify
1. Entra en <https://developer.spotify.com/dashboard> con tu cuenta **Premium** y pulsa **Create app**.
2. En **Redirect URIs** pon la dirección exacta de la web, con la barra final (por ejemplo `https://TU_USUARIO.github.io/hitazo/`). La app te la muestra en **Ajustes** con un botón para copiarla.
3. Marca **Web API** y **Web Playback SDK**, y guarda.
4. Copia el **Client ID**.
5. En **User Management**, añade el email de la cuenta de Spotify con la que vais a jugar. En modo desarrollo, Spotify solo permite cinco usuarios por app.

### 3. Configurar el móvil
1. Abre la web en el móvil y, en el menú del navegador, pulsa **Añadir a pantalla de inicio**.
2. Ve a **Ajustes** (el engranaje), pega el Client ID y pulsa **Conectar Spotify**.
3. Antes de jugar, abre la app de Spotify y reproduce algo unos segundos para que quede «activa». Desde ese momento Hitazo la controla.

## Cómo se juega
- En la pantalla de inicio se eligen los jugadores (de 1 a 10, con nombre), el estilo, la forma de jugar (con las listas de la app o escaneando cartas) y las cartas necesarias para ganar.
- Cada jugador empieza con una carta descubierta.
- En su turno, el jugador pulsa **Reproducir**, dice en voz alta el artista y el título, y arrastra la carta misteriosa a su sitio en su línea del tiempo. También puede moverla con las flechas ▲▼.
- Con **Desvelar carta** se ve si el año está bien colocado. Después se marca si ha acertado el **Artista** y/o el **Título**.
  - Si acierta al menos uno, gana **una ficha**, aunque el año esté mal.
  - La carta se queda en su línea del tiempo solo si el año está bien colocado **y** ha acertado al menos uno de los dos.
  - Una ficha sirve para **Pasar**: cambia la canción que está sonando por otra.
- Después se pasa el móvil al siguiente jugador, que es quien pulsa el play.
- Gana el primero que llega al número de cartas elegido. El botón de la lista (arriba a la derecha) muestra las cartas de todos.
- **Selecciona época:** cada jugador elige un año de inicio y otro de fin. Las canciones de los distintos rangos se van alternando.

## Cartas originales (QR)
Los QR de Hitster contienen una dirección del tipo `hitstergame.com/es/<edición>/<número>`. Para saber qué canción corresponde a cada carta, la app usa la base de datos oficial de Jumbo:

- En **Ajustes → Cartas originales**, pulsa **Descargar de la web de Hitster**.
- Si falla porque la web bloquea la descarga desde otra página, abre el enlace que aparece debajo, guarda el `.json` en el móvil y usa **Importar archivo**.
- Las cartas antiguas, cuyo QR no incluye la edición, necesitan que elijas tu edición en el desplegable.

También funcionan los QR que llevan directamente a una canción de Spotify (`open.spotify.com/track/...`), así que puedes imprimir tus propias cartas.

Con cartas, el año que se muestra es el que da Spotify, que a veces corresponde a una reedición. Al desvelar la carta se puede corregir con −/+ para que coincida con el de la carta física.

## Editar las listas
Las canciones están en `js/data.js`, una por línea con el formato `Artista|Título|Año`. Puedes añadir, quitar o corregir años sin tocar nada más: la app busca cada canción en Spotify en el momento de reproducirla y guarda el resultado.

Si una canción no aparece en Spotify, la app la salta sola. Si sale una versión equivocada, corrige el título o el artista en `data.js` y pulsa **Ajustes → Olvidar canciones encontradas**.

## Limitaciones
- En el móvil la música suena en la app de Spotify, porque Spotify no permite reproducir dentro del navegador del móvil. Su notificación muestra el título, así que no conviene desplegarla.
- En iPhone, si Spotify pasa mucho tiempo en segundo plano, puede «dormirse». Si ocurre, Hitazo te pide que lo abras de nuevo.
- En un ordenador, la música puede sonar directamente en el navegador.
- Los años los he puesto a mano según la primera publicación de cada canción, y puede haber alguno discutible.

## Archivos
```
index.html            estructura
css/styles.css        estilo
js/app.js             pantallas y reglas
js/data.js            listas de canciones
js/spotify.js         login, búsqueda y reproducción
js/qr.js              escáner y base de datos de cartas
vendor/jsQR.js        lector QR para navegadores sin BarcodeDetector (iPhone)
sw.js, manifest       instalación como app
```
