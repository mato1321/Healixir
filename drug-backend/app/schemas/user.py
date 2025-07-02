from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from app.models.user import GenderEnum

# 基礎用戶模式
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birth_date: Optional[date] = None

# 用戶註冊
class UserCreate(UserBase):
    password: str

# 用戶登入
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 用戶響應
class UserResponse(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    
    class Config:
        from_attributes = True

# Token 模式
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None