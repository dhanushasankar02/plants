import os
from PIL import Image

def compare_images_pil(p1, p2):
    try:
        img1 = Image.open(p1).convert('L').resize((64, 64))
        img2 = Image.open(p2).convert('L').resize((64, 64))
        p1_data = list(img1.getdata())
        p2_data = list(img2.getdata())
        
        # Mean absolute difference
        diff = sum(abs(a - b) for a, b in zip(p1_data, p2_data)) / len(p1_data)
        return diff
    except Exception as e:
        return f"Error: {e}"

print("Comparing plant_workshop and contact_workshop_community:")
print(compare_images_pil('images/plant_workshop.png', 'images/contact_workshop_community.png'))

print("Comparing plant_care_guide and contact_gardening_tools:")
print(compare_images_pil('images/plant_care_guide.png', 'images/contact_gardening_tools.png'))
