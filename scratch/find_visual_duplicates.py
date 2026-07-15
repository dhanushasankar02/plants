import os
from PIL import Image

def dhash(image, hash_size=8):
    # Grayscale and shrink the image
    image = image.convert('L').resize((hash_size + 1, hash_size), Image.Resampling.LANCZOS)
    pixels = list(image.getdata())
    # Compare adjacent pixels
    difference = []
    for row in range(hash_size):
        for col in range(hash_size):
            pixel_left = pixels[row * (hash_size + 1) + col]
            pixel_right = pixels[row * (hash_size + 1) + col + 1]
            difference.append(pixel_left > pixel_right)
    # Convert difference to hex string
    decimal_value = 0
    hex_string = []
    for index, value in enumerate(difference):
        if value:
            decimal_value += 2**(index % 8)
        if (index % 8) == 7:
            hex_string.append(hex(decimal_value)[2:].zfill(2))
            decimal_value = 0
    return ''.join(hex_string)

image_dir = 'images'
files = [f for f in os.listdir(image_dir) if f.endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp'))]

hashes = {}
for f in files:
    path = os.path.join(image_dir, f)
    try:
        with Image.open(path) as img:
            h = dhash(img)
            hashes.setdefault(h, []).append(f)
    except Exception as e:
        print(f"Error reading {f}: {e}")

print("VISUALLY IDENTICAL OR EXTREMELY SIMILAR IMAGES (DHASH):")
for h, f_list in hashes.items():
    if len(f_list) > 1:
        print(f"{h}: {f_list}")
