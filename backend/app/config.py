# backend/app/config.py

import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # PostgreSQL Connection Settings
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "password"
    DB_HOST: str = "localhost"
    DB_PORT: str = "5432"
    DB_NAME: str = "assignment_planner"
    
    # Computed Database URL string
    DATABASE_URL: str = ""

    # Security Configuration
    SECRET_KEY: str = "supersecretkeychangeinproduction12345"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Frontend connection configuration
    CLIENT_ORIGIN: str = "http://localhost:5173"

    # Automatically read from a .env file if it exists
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    def __init__(self, **values):
        super().__init__(**values)
        # If DATABASE_URL isn't explicitly set in the .env file, assemble it from the parts
        if not self.DATABASE_URL:
            self.DATABASE_URL = f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

# Instantiate the settings object to use across the app
settings = Settings()



# Code snippet
#     DB_USER=your_postgres_username
#     DB_PASSWORD=your_postgres_password
#     DB_NAME=assignment_planner
#     SECRET_KEY=generate_a_random_secure_string_here