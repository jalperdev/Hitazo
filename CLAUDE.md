# CLAUDE.md — Hitazo

Guía para trabajar en este repositorio. Responde y documenta **en español**.

## Qué es
Hitazo es una versión casera del juego **Hitster**, hecha como web instalable (PWA) para jugar **con un solo móvil** que se pasa de jugador en jugador. Suena una canción, el jugador dice el artista o el título y coloca la carta en su línea del tiempo, ordenada por año.

- Repositorio: `jalperdev/Hitazo`, rama `main`.
- Publicada con **GitHub Pages** desde la raíz de `main`, en `https://jalperdev.github.io/hitazo/` (comprobar la URL exacta en Settings → Pages).
- No tiene compilación ni dependencias: HTML, CSS y JavaScript (módulos ES) tal cual. **No hay Node ni npm.** El aviso de «Node.js 20 deprecated» que sale en Actions viene del proceso interno de GitHub Pages y no afecta.
- El nombre «Hitazo» es para evitar la marca registrada «Hitster».

## Reglas del juego (decididas por el usuario)
- De **1 a 10 jugadores**, cada uno con su nombre.
- Cada jugador empieza con **una carta descubierta** al azar.
- Turno:
  1. Aparece la pantalla «Le toca a X». El jugador coge el móvil y pulsa **Empezar mi turno**.
  2. Pulsa **Reproducir** (o **Escanear carta** en el modo QR).
  3. Dice en voz alta el artista y el título.
  4. **Arrastra con el dedo** la carta misteriosa entre sus cartas. También puede moverla con las flechas ▲▼ o con las teclas de cursor.
  5. Pulsa **Desvelar carta**: la app dice si el año está bien colocado.
  6. Se marcan los botones **Artista** y **Título** según lo que haya acertado, y se pulsa **Confirmar**.
- **La carta vale** si el año está bien colocado **y** se ha acertado al menos el artista o el título. Si no, se descarta.
- **Fichas:** solo se gana **una ficha cuando la carta vale**. Una ficha sirve para **pasar**: cambia la canción que está sonando por otra.
- Después se pasa el móvil al siguiente jugador, que es quien le da al play.
- Gana el primero que llega al **número de cartas configurado** (de 3 a 30; 10 por defecto). La carta inicial cuenta.
- Los años iguales valen en cualquier orden: la comprobación es `anterior.year <= y <= siguiente.year`.

## Pantalla de inicio
Título, jugadores (de 1 a 10, con nombres), **estilo**, forma de jugar, dónde suena la música y cartas para ganar.

Hay cinco estilos:
- Todos los tiempos
- Los 40 Principales
- Hits del verano
- Reguetón
- **Selecciona época**: cada jugador elige un año de inicio y otro de fin. El mazo se forma con todas las canciones de todas las listas, sin duplicados, y va alternando las épocas de los jugadores (`buildDeck`).

Hay dos formas de jugar:
- **Con las listas de la app**: la app elige las canciones del estilo escogido.
- **Escaneando cartas**: se escanean los QR de las cartas originales de Hitster o de cualquier canción de Spotify. El estilo solo se usa para la carta inicial.

## Dónde suena la música (`setup.audio`)
| Valor | Nombre en la app | Cómo funciona |
|---|---|---|
| `sdk` (por defecto) | En Hitazo | Spotify Web Playback SDK dentro de la web. Canción completa; requiere Premium. Si falla (`SpotifyError` de tipo `nosdk`), `fallbackToPreview` pasa sola a `preview` y avisa. |
| `preview` | Fragmentos | Fragmento de 30 s de la **búsqueda de iTunes** (JSONP, sin clave), en bucle, con un `<audio>` propio. No necesita Spotify salvo para el modo QR. |
| `spotify` | App Spotify | Spotify Connect: controla la app de Spotify del móvil a través de la Web API. Su notificación puede mostrar el título. |

- En `sdk` y `preview` se fuerza `navigator.mediaSession.metadata` a «Hitazo · ¿Qué canción es?» para que la notificación del móvil no muestre el título.
- **Desbloqueo de audio:** los móviles solo dejan sonar audio después de un toque. `unlockAudio()` se llama **de forma síncrona** en el toque (antes de cualquier `await`): reproduce un WAV de silencio generado en `preview.js` y llama a `activateElement()` del SDK.
- **Fallo conocido de Spotify Connect:** en algunos móviles, pedir una canción con `uris` reanuda la canción anterior que estaba en pausa. Por eso, en el modo `spotify`, `play()` prueba tres métodos en orden y comprueba después de cada uno qué suena de verdad con `currently-playing` (por id o por nombre):
  1. `context_uri` del álbum con `offset` en la canción.
  2. `uris`.
  3. Poner la canción en la cola y saltar a ella.

  Si nada funciona, lanza el error `stuck`. No uses el modo de repetición `track`: empeora el fallo.

## Archivos (todo en la raíz)
El usuario sube los archivos desde el móvil sin carpetas, así que **no crees subcarpetas**: las rutas de `index.html`, `manifest.webmanifest` y `sw.js` suponen que todo está en la raíz.

| Archivo | Contenido |
|---|---|
| `index.html` | Estructura mínima, fuentes de Google (Bungee y Bricolage Grotesque). Carga `jsQR.js` y `app.js` como módulo. |
| `app.js` | Estado, pantallas, reglas, arrastre, sonido y arranque. Las pantallas son `home`, `eras`, `settings`, `pass`, `turn` y `win`. Se pintan con plantillas de texto en `#app`. |
| `data.js` | Listas de canciones, una línea `Artista\|Título\|Año` por canción. Exporta `PLAYLISTS`, `allSongs()` y `songKey()`. |
| `spotify.js` | Login con PKCE, búsqueda (`resolveTrack`), `getTrack`, reproductor SDK, Spotify Connect, `pause`/`resume` y el registro de diagnóstico (`dbg`, `readLog`). |
| `preview.js` | Fragmentos de iTunes (`findPreview` por JSONP), el `<audio>` propio, `unlock()` y `hideMetadata()`. |
| `qr.js` | Cámara y lectura de QR (con `BarcodeDetector` si existe; si no, `jsQR`), importación de la base de datos de Hitster y `resolveQr`. |
| `jsQR.js` | Librería jsQR 1.4.0 copiada tal cual; no se toca. |
| `styles.css` | Todo el estilo. |
| `sw.js` | Service worker: red primero y caché si no hay conexión. |
| `manifest.webmanifest`, `icon-*.png` | Instalación como app. |
| `README.md` | Instrucciones de instalación para el usuario. |

## Estado guardado (`localStorage`)
| Clave | Contenido |
|---|---|
| `hz.setup` | Configuración de inicio: `count`, `names`, `style`, `mode` (`app`/`qr`), `target`, `eras`, `audio`. |
| `hz.game` | Partida en curso: `players[{name, cards, tokens}]`, `current`, `round`, `deck`, `deckIdx`, `skipped`, `pending` (turno actual: `phase` = `ready`/`listening`/`revealed`/`done`, `song`, `trackId`, `previewUrl`, `insertIndex`, `artistOk`, `titleOk`, `correct`, `result`), `winner`. |
| `hz.clientId` | Client ID de Spotify. |
| `hz.tokens`, `hz.verifier` | Tokens de Spotify y verificador PKCE. |
| `hz.profile` | Nombre del usuario en Spotify. |
| `hz.device` | Dispositivo de Spotify elegido por el usuario. |
| `hz.tracks` | Caché `artista\|título` → id de Spotify (o `none`). |
| `hz.trackinfo` | Caché id → álbum y nombre. |
| `hz.previews` | Caché `artista\|título` → URL del fragmento (o `none`). |
| `hz.hitsterdb` | Base de datos de cartas: `{sku: {name, cards: {número: idSpotify}}}`. |
| `hz.defaultSku` | Edición elegida para los QR antiguos sin código de edición. |
| `hz.log` | Últimas 60 líneas del registro de Spotify, que se ven en Ajustes. |

## Spotify (restricciones de 2026)
- La app de Spotify es del propio usuario, en el Developer Dashboard. En **modo desarrollo** exige **Premium**, permite **un Client ID por desarrollador** y como máximo **5 usuarios**.
- Redirect URI = `location.origin + location.pathname`, con la barra final. `localhost` no está permitido; para pruebas locales se usa `http://127.0.0.1:8000/`.
- Desde febrero de 2026, `GET /playlists/{id}/items` solo funciona con playlists propias. Por eso las listas viven en `data.js` y cada canción se **busca en Spotify al reproducirla**.
- El año del juego es el de `data.js`, no el de Spotify, porque los álbumes de Spotify suelen ser reediciones. En el modo QR el año viene de Spotify, y al desvelar la carta se puede corregir con −/+ mirando la carta física.
- Permisos que se piden: `user-read-playback-state user-modify-playback-state user-read-currently-playing streaming user-read-private user-read-email`.

## Cartas originales (QR)
- Formatos de QR que se leen:
  - `hitstergame.com/<idioma>/<sku>/<número>` (ediciones nuevas).
  - `hitstergame.com/<idioma>/<número>` (ediciones antiguas; usan `hz.defaultSku`).
  - `open.spotify.com/track/<id>` y `spotify:track:<id>`.
- Base de datos oficial: `https://hitster.jumboplay.com/hitster-assets/gameset_database.json`, con la estructura `gamesets[].sku` y `gamesets[].gameset_data.cards[{CardNumber, Spotify}]`. Puede que la web bloquee la descarga directa; para ese caso existe «Importar archivo» en Ajustes. **No incluyas esa base de datos en el repositorio.**

## Listas de canciones (`data.js`)
- Tamaño actual: Todos los tiempos 1.595, Los 40 Principales 314, Hits del verano 334 y Reguetón 254. Son 1.980 canciones distintas.
- El año es el de la **primera publicación** de la canción, como single o en un álbum, la que fuera antes.
- Reglas al añadir canciones:
  - Nada de duplicados dentro de una lista (por `artista|título`).
  - Una canción que esté en varias listas lleva **el mismo año** en todas.
  - Años entre 1950 y el actual.
  - El título y el artista, escritos como aparecen en Spotify o iTunes, para que la búsqueda los encuentre.
- Si una canción no se encuentra, la app la salta sola y la añade a `game.skipped`.

## Diseño
- Estética de **azul eléctrico, pero divertida**. Colores:

  | Nombre | Color |
  |---|---|
  | `--night` | `#070C38` |
  | `--volt` | `#2D4BFF` |
  | `--ice` | `#5CE1FF` |
  | `--spark` (botón principal y fichas) | `#FFE04A` |
  | `--pop` (fallo) | `#FF4FA0` |
  | `--mint` (acierto) | `#38F2AE` |

- Tipografía: **Bungee** para títulos, nombres y años; **Bricolage Grotesque** para el texto.
- Las cartas toman el color de su década (`DECADE_COLORS`). El logo «HITAZO» se forma con letras que son cartas inclinadas.
- Diseño solo para móvil en vertical, con un ancho máximo de 520 px y respeto a `prefers-reduced-motion`.
- Todos los textos de la interfaz en español y con frases normales (sin mayúsculas en las etiquetas).

## Al hacer cambios
- **Sube la versión de la caché** en `sw.js` (`const CACHE = 'hitazo-vN'`) en cada cambio, para que los móviles reciban la nueva versión. Si añades un archivo, inclúyelo en `SHELL`.
- Comprueba la sintaxis con `node --check <archivo>.js`; Node solo se usa para eso, no lo necesita la app.
- Para probar en local:
  1. Ejecuta `python3 -m http.server 8000` en la raíz.
  2. Abre `http://127.0.0.1:8000/`.
  3. Simula móvil con Playwright e intercepta `api.spotify.com`, `itunes.apple.com` y `sdk.scdn.co` con respuestas falsas.

  Desde la nube no se puede probar con el Spotify real del usuario.
- Para diagnosticar fallos de reproducción en el móvil del usuario, pídele lo que muestra **Ajustes → Registro de Spotify**.
- Después de publicar, el usuario tiene que **cerrar y volver a abrir** la app, a veces dos veces, para que el service worker cargue la versión nueva.
- Los mensajes de commit, en español.

## Historial de decisiones
- Es una PWA y no una app nativa, a petición del usuario. El usuario tiene Spotify Premium.
- Al principio la música sonaba solo en la app de Spotify. Se añadieron `sdk` y `preview` porque la notificación de Spotify mostraba el título.
- Las canciones no cambiaban al pasar de turno ni al usar fichas. Se solucionó con los tres métodos de `play()` y quitando el modo de repetición.
- Antes se ganaba una ficha con solo acertar el artista o el título. Ahora, a petición del usuario, **solo se gana si la carta vale**.
- Los archivos van en la raíz porque desde el móvil no se pueden crear carpetas en GitHub.
