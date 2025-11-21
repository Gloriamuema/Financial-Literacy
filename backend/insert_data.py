# insert.py
import csv
import mysql.connector
from config import Config
from mysql.connector import errorcode # Used for detailed database error logging

# --- Configuration ---
csv_file_path = 'local_aid_data.csv' 
data_to_insert = []
conn = None
cursor = None

# Define the SQL Insertion Statement
# NOTE: The order of columns in the INSERT statement MUST match the order 
# in your CSV file: (name, zip_code, category, link_url, description, vetted)
sql = """
INSERT INTO resources 
(name, zip_code, category, link_url, description, vetted) 
VALUES (%s, %s, %s, %s, %s, %s)
"""

try:
    # 1. Database Connection Setup (Moved inside try block for better error handling)
    print("Attempting to connect to the database...")
    conn = mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DATABASE
    )
    cursor = conn.cursor()
    print("Connection successful. Reading CSV data...")

    # 2. Read CSV and Prepare Data with Conversion
    with open(csv_file_path, 'r', encoding='utf-8') as file:
        csv_reader = csv.reader(file)
        # Skip the header row
        next(csv_reader) 
        
        for row in csv_reader:
            # Create a mutable list from the row
            mutable_row = list(row) 
            
            # --- MANDATORY FIX FOR 'vetted' COLUMN (INDEX 5) ---
            # 1. Get the string value ('TRUE' or 'FALSE')
            vetted_string = mutable_row[5].upper()
            
            # 2. Convert to integer: 'TRUE' becomes 1, anything else becomes 0
            vetted_integer = int(vetted_string == 'TRUE') 
            
            # 3. Replace the string with the required integer
            mutable_row[5] = vetted_integer
            
            # Append the corrected list for bulk insertion
            data_to_insert.append(mutable_row)
    
    # 3. Execute Insertion
    print(f"Executing insertion of {len(data_to_insert)} records...")
    cursor.executemany(sql, data_to_insert)
    conn.commit()
    
    print(f"✅ Success! Successfully inserted {cursor.rowcount} records into the resources table.")

# --- Error Handling ---

except mysql.connector.Error as err:
    # Handles specific MySQL errors (e.g., Access Denied, DB not found)
    print(f"❌ MySQL Database Error: {err.msg} (Error Code: {err.errno})")
    if conn and conn.is_connected():
        conn.rollback()
except FileNotFoundError:
    # Handles the CSV file not found error
    print(f"❌ File Error: The file '{csv_file_path}' was not found. Check the path.")
except Exception as e:
    # Catches all other unexpected errors (e.g., KeyError if headers were used incorrectly)
    print(f"❌ General Error during operation: {e}")
    if conn and conn.is_connected():
        conn.rollback()

finally:
    # 4. Close Connections
    if cursor:
        cursor.close()
    if conn and conn.is_connected():
        conn.close()
        print("Database connection closed.")