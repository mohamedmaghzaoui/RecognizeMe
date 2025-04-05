from deepface import DeepFace
result = DeepFace.verify(
  img1_path = "Photo7.jpg",
  img2_path = "Photo4.jpg",
)
print("Is it same person: ",result["verified"])