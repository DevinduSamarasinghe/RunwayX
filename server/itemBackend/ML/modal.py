import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
import sys

# Calculate cosine similarity between articles based on user ratings
def get_article_recommendations(dataset, article_id, num_recommendations=10):
    columns_to_encode = [
      'name',
      'product_type_name',
      'category',
      'graphical_appearance_name',
      'colour_group_name',
      'perceived_colour_value_name',
      'perceived_colour_master_name',
      'department_name',
      'index_code',
      'index_name',
      'index_group_name',
      'section_name',
      'garment_group_name',
      'description',
    ]

    label_encoder = LabelEncoder()

    for column in columns_to_encode:
        dataset[column] = label_encoder.fit_transform(dataset[column])

    # Create a pandas DataFrame from the dataset
    df = pd.DataFrame(dataset)

    # Check if the provided 'article_id' exists in the DataFrame
    if article_id not in df['article_id'].values:
        print(f"Article with 'article_id' {article_id} not found in the dataset.")
        return []

    # Calculate cosine similarity between articles
    cosine_sim = cosine_similarity(df)

    # Get the index of the given article
    article_index = df[df['article_id'] == article_id].index[0]

    # Get article similarity scores
    article_sim_scores = list(enumerate(cosine_sim[article_index]))

    # Sort articles by similarity score in descending order
    article_sim_scores = sorted(article_sim_scores, key=lambda x: x[1], reverse=True)

    # Get top N similar articles (excluding the input article itself)
    top_recommendations = []
    for i in range(1, num_recommendations + 1):
        if i < len(article_sim_scores):  # Ensure the index is within bounds
            similar_article_index = article_sim_scores[i][0]
            top_recommendations.append(df['article_id'][similar_article_index])

    return top_recommendations

id = int(sys.argv[2])
dfx = pd.read_csv(sys.argv[1])

recommendations = get_article_recommendations(dfx, id)
print(recommendations)