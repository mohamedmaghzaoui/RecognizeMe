import os
import requests

# Dossier pour stocker les images
folder = "images"
if not os.path.exists(folder):
    os.makedirs(folder)

# Fonction pour télécharger des images de personnes
def download_images_from_random_user():
    for i in range(1, 31):
        # Requête pour récupérer une image de personne aléatoire
        url = "https://randomuser.me/api/?results=1"
        
        try:
            # Effectuer la requête GET
            response = requests.get(url)
            response.raise_for_status()  # Vérifie si la requête a réussi
            
            # Extraire l'URL de l'image
            data = response.json()
            image_url = data['results'][0]['picture']['large']  # Récupérer l'URL de l'image

            # Télécharger l'image
            image_response = requests.get(image_url)
            image_response.raise_for_status()

            # Sauvegarder l'image dans le dossier
            image_path = os.path.join(folder, f"image_{i}.jpg")
            with open(image_path, 'wb') as file:
                file.write(image_response.content)

            print(f"Image {i} téléchargée avec succès.")
        
        except requests.exceptions.RequestException as e:
            print(f"Erreur lors du téléchargement de l'image {i}: {e}")

# Lancer le téléchargement des images
download_images_from_random_user()
