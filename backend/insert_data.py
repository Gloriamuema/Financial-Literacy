# insert_data.py
import csv
import mysql.connector
from config import Config # Reuse your configuration file

# 1. Database Connection Setup
conn = mysql.connector.connect(
    host=Config.MYSQL_HOST,
    user=Config.MYSQL_USER,
    password=Config.MYSQL_PASSWORD,
    database=Config.MYSQL_DATABASE
)
cursor = conn.cursor()

# 2. Define the SQL Insertion Statement
# NOTE: The order of columns in the INSERT statement MUST match the order in your CSV file.
sql = """
INSERT INTO resources 
(name, zip_code, category, link_url, description, vetted) 
VALUES (%s, %s, %s, %s, %s, %s)
"""

# 3. Read CSV and Execute Insertion
csv_file_path = 'local_aid_data.csv' 
data_to_insert = []

try:
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        # Skip the header row
        next(csv_reader) 
        
        for row in csv_reader:
            # Append the row data (which should match the SQL statement columns)
            data_to_insert.append(row)
    
    # Execute the insertion of all rows at once
    cursor.executemany(sql, data_to_insert)
    conn.commit()
    
    print(f"✅ Successfully inserted {cursor.rowcount} records into the resources table.")

except Exception as e:
    conn.rollback()
    print(f"❌ Error during insertion: {e}")

finally:
    cursor.close()
    conn.close()