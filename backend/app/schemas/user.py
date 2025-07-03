from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from app.models.user import GenderEnum

# 基本用戶架構
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    gender: Optional[GenderEnum] = None
    birth_date: Optional[date] = None
    phone: Optional[str] = None  # 新增 phone 欄位

# 用戶註冊
class UserCreate(UserBase):
    password: str

# 用戶登入
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# 用戶回應 - 更新為匹配新的資料庫結構
class UserResponse(UserBase):
    # 移除這些欄位，因為資料庫中已經沒有了：
    # id: int (email 現在是主鍵)
    # is_active: bool (已刪除)
    # is_verified: bool (已刪除)
    
    # email 已經在 UserBase 中定義了，作為主鍵
    
    class Config:
        from_attributes = True

# Token 架構
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None