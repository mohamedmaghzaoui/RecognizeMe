import os
import time
import cv2
from deepface import DeepFace

# Reference image
img1_path = "images/image_38.jpg"

# Get all images in the directory
photos_to_check = [f for f in os.listdir("images") if f.endswith(".jpg")]

# Function to resize images for faster processing
def preprocess_image(image_path, target_size=(160, 160)):
    img = cv2.imread(image_path)
    img = cv2.resize(img, target_size)  # Resize for faster processing
    cv2.imwrite(image_path, img)  # Overwrite with smaller size

# Resize images before comparison (optional but speeds up processing)
preprocess_image(img1_path)
for img_name in photos_to_check:
    preprocess_image(os.path.join("images", img_name))

# Start measuring time
start_time = time.time()

# Loop through each image and compare
for img2_path in photos_to_check:
    try:
        img2_full_path = os.path.join("images", img2_path)
        
        # Measure time per image (optional)
        img_start_time = time.time()
        
        # Perform verification using a faster model and disable some checks
        result = DeepFace.verify(
            img1_path,
            img2_full_path,
            model_name="Facenet",  # Faster model
            enforce_detection=False,  # Skip face detection errors
            align=False  # Skip face alignment for faster processing
        )
        
        # Print the result
        print(f"✅ Is {img1_path} the same person as {img2_path}? {result['verified']} "
              f"(Time: {time.time() - img_start_time:.2f}s)")
        
    except ValueError as e:
        print(f"❌ Error processing {img2_path}: {e}")

# Print total processing time
print(f"\n⏳ Total processing time: {time.time() - start_time:.2f} seconds")
