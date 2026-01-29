Optimizar imágenes y videos

Requisitos (instalar en la máquina donde ejecutarás el script):

- ffmpeg (recomendado). En Windows, instala via choco/scoop o descarga desde ffmpeg.org.
- cwebp (opcional, parte de libwebp) para convertir a WebP rápidamente.
- avifenc (opcional, parte de libavif) para codificar AVIF más rápido; si no existe se usa ffmpeg/libaom.

Uso

Desde la raíz del frontend:

```bash
# dry-run: solo lista archivos que se optimizarían
./scripts/optimize_assets.sh --dry-run

# optimizar imágenes y videos (genera carpeta `optimized/` con la estructura de archivos)
./scripts/optimize_assets.sh

# solamente imágenes
./scripts/optimize_assets.sh --images-only

# solamente videos
./scripts/optimize_assets.sh --videos-only
```

Notas

- El script crea `optimized/` con una copia optimizada de cada recurso (no reemplaza tus fuentes originales).
- Para `mp4` se usa `-movflags +faststart` para streaming progresivo.
- Para AVIF, el script usa `avifenc` si está disponible; ffmpeg/libaom se usa como fallback (pero es lento).
- Ajusta parámetros CRF / bitrate en el script según el trade-off calidad/peso.
