import base64

def embed_logo():
    with open("f:/groww/plant/images/logo.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <image href="data:image/png;base64,{encoded_string}" x="0" y="0" height="24" width="24"/>
</svg>
'''
    with open("f:/groww/plant/favicon.svg", "w", encoding="utf-8") as svg_file:
        svg_file.write(svg_content)
    print("Embedded logo inside favicon.svg successfully!")

embed_logo()
