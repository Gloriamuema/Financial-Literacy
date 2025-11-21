# config.py

class Config:
    # Replace these placeholders with your actual MySQL credentials
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = '1234' 
    MYSQL_DATABASE = 'finance_forward_db'
    
    # Secret Key for Flask sessions (important for security)
    SECRET_KEY = '5834b89dd0d7e8c84a3746052fdc1e2cdaa28bace15c5ef7'