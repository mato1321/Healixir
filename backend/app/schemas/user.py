from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime
from app.models.user import GenderEnum

# Basic user structure
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birth_date: Optional[date] = None
    phone: Optional[str] = None

# User registration
class UserCreate(UserBase):
    password: str

# User login
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# User update (for editProfile functionality)
class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    birth_date: Optional[date] = None
    gender: Optional[GenderEnum] = None
    password: Optional[str] = None

# User response - contains complete database fields
class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

# Token structure
class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse  # Add user info to token response

class TokenData(BaseModel):
    email: Optional[str] = None