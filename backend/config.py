# config.py

class Config:
    # Replace these placeholders with your actual MySQL credentials
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'your_mysql_password' 
    MYSQL_DATABASE = 'finance_forward_db'
    
    # Secret Key for Flask sessions (important for security)
    SECRET_KEY = 'your_strong_secret_key_here'