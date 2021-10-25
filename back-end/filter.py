import csv
import pandas as pd
file_name = "filtered_authors.csv"
fields = ['Name']
rows = []

df = pd.read_csv(r'./lgbtAuthors.csv')

for ind in df.index:
    name = str(df['Name'][ind])
    genre = str(df['Genre'][ind])
    if "novelist" in genre or "author" in genre or "writer" in genre:
        life = str(df['Lifetime'][ind])
        filt = filter(str.isdigit, life)
        life = "".join(filt)
        if life is "": 
            life = "None"
        nat = str(df['Nationality'][ind])
        notable = str(df['Notable works'][ind])
        rows.append([name, life[0:4], nat, genre, notable])


dataframe=pd.DataFrame(rows, columns=['Name','Lifetime','Nationality','Genre','Notable Works'])
print(dataframe)
dataframe.to_csv(file_name, encoding='utf-8', index=False)