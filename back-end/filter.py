import csv
import pandas as pd
file_name = "filtered_authors.csv"
fields = ['Name']
rows = []

df = pd.read_csv(r'./authors.csv')

for ind in df.index:
    name = str(df['Name'][ind])
    genre = str(df['Genre'][ind])
    if "novelist" in genre or "author" in genre or "writer" in genre:
        rows.append(name)

dataframe=pd.DataFrame(rows, columns=['Name'])
print(dataframe)
dataframe.to_csv(file_name, encoding='utf-8', index=False)