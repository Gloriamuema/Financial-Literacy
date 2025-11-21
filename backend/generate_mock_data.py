import csv
import random

CSV_FILE_PATH = 'local_aid_data.csv'
NUM_RECORDS = 50 # Change this number for more records

# Define the set of possible categories and zip codes
CATEGORIES = ["Food", "Housing", "Utilities", "Employment"]
ZIP_CODES = ["12345", "98765", "67890", "54321"]

mock_data = []

# Generate the header row
fieldnames = ['name', 'zip_code', 'category', 'link_url', 'description', 'vetted']

for i in range(1, NUM_RECORDS + 1):
    record = {
        'name': f"Org Name {i}",
        'zip_code': random.choice(ZIP_CODES),
        'category': random.choice(CATEGORIES),
        'link_url': f"https://mocklink{i}.org",
        'description': f"Mock description for aid service {i}",
        'vetted': random.choice(['TRUE', 'FALSE'])
    }
    mock_data.append(record)

try:
    with open(CSV_FILE_PATH, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(mock_data)
    print(f"✅ Successfully created {NUM_RECORDS} mock records in {CSV_FILE_PATH}")
except IOError:
    print(f"❌ Could not write to file {CSV_FILE_PATH}")