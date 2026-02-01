#!/usr/bin/env python3
import shutil
import os

# Rutas
origen = "/Users/vlad/Real America"
destino = "/Users/vlad/Real America/imagenes"

# Archivos a mover
archivos = ["america1.jpg", "america2.jpg", "america3.jpg", "realamericaescudo.jpg"]

print("=" * 70)
print("MOVIENDO IMÁGENES A LA CARPETA imagenes/")
print("=" * 70)

for archivo in archivos:
    ruta_origen = os.path.join(origen, archivo)
    ruta_destino = os.path.join(destino, archivo)
    
    if os.path.exists(ruta_origen):
        shutil.move(ruta_origen, ruta_destino)
        print(f"✓ Movido: {archivo}")

print("\n✓ Todas las imágenes han sido movidas a imagenes/")

