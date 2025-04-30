import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.cluster import KMeans
import os

# Load the data
df = pd.read_csv("ai/data/attendance_dataset.csv")

# Convert status to numeric
df['target'] = df['status'].map({'present': 0, 'late': 1, 'absent': 2})

# Task 1: Predict Absent (Binary classification)
df['is_absent'] = (df['status'] == 'absent').astype(int)

# Features (can expand this later)
features = ['student_id', 'weekday', 'month', 'hour']
X = df[features]
y = df['is_absent']

# Split and train
X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.25, random_state=42)
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)

# Save model
os.makedirs("ai/models", exist_ok=True)
joblib.dump(clf, "ai/models/predictor.pkl")

# Print metrics for classification model
print("📊 Classification Report (Presence Prediction):")
print(classification_report(y_test, clf.predict(X_test)))

# Task 2: NLP-style pattern detection
# Map weekdays to their names
weekday_map = {1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday', 0: 'Sunday'}

# Treat student absence days as sequences
absent_df = df[df['is_absent'] == 1]
text_patterns = absent_df.groupby('student_id')['weekday'].apply(
    lambda w: ' '.join(weekday_map[day] for day in w)
).reset_index(name='pattern_text')

# Debug: Check if the 'pattern_text' column looks correct
print(text_patterns.head())

# Check for empty or invalid patterns
print(f"Missing or Empty Patterns: {text_patterns[text_patterns['pattern_text'].isnull() | (text_patterns['pattern_text'] == '')]}")

# Optional: Clean up invalid or empty patterns (if any)
text_patterns['pattern_text'] = text_patterns['pattern_text'].fillna('')

# NLP feature extraction (no stop words and avoid empty documents)
vectorizer = CountVectorizer(stop_words=None, min_df=1)  # Avoid removing stop words
X_text = vectorizer.fit_transform(text_patterns['pattern_text'])

# Cluster behavior (detect absence patterns)
kmeans = KMeans(n_clusters=3, random_state=42)
text_patterns['cluster'] = kmeans.fit_predict(X_text)

# Save NLP components
joblib.dump((vectorizer, kmeans), "ai/models/nlp_cluster.pkl")

# Print completion message
print("✅ Model training completed and saved.")
