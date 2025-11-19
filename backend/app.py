# app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from config import Config

# --- Initialization ---
app = Flask(__name__)
app.config.from_object(Config)
CORS(app) # Enables Cross-Origin Resource Sharing for front-end access

def get_db_connection():
    """Establishes and returns a database connection."""
    try:
        conn = mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DATABASE']
        )
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

# --- API Endpoints ---

@app.route('/', methods=['GET'])
def home():
    """Simple health check endpoint."""
    return "Finance Forward API is running!", 200

# [API ENDPOINTS FOR RESOURCES WILL GO HERE]

if __name__ == '__main__':
    # You might want to run this on a different port than your front-end (e.g., 5000)
    app.run(debug=True, port=5000)
    
    # app.py (continued)

@app.route('/api/resources', methods=['GET'])
def get_resources():
    """
    Fetches resources filtered by zip code and category.
    Example: /api/resources?zip=77002&category=Food
    """
    zip_code = request.args.get('zip')
    category = request.args.get('category')
    
    if not zip_code:
        return jsonify({"error": "Zip code parameter is required"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
        
    cursor = conn.cursor(dictionary=True)
    
    # Base SQL query
    query = "SELECT name, link_url, description, category, vetted FROM resources WHERE zip_code = %s"
    params = [zip_code]
    
    if category and category != 'All':
        query += " AND category = %s"
        params.append(category)

    try:
        cursor.execute(query, tuple(params))
        resources = cursor.fetchall()
        
        return jsonify(resources), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
        
    finally:
        cursor.close()
        conn.close()