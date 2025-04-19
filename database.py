import psycopg2

def get_db_connection():
    conn = psycopg2.connect(
        dbname="cricket_db",
        user="your_username",
        password="your_password",
        host="localhost"
    )
    return conn