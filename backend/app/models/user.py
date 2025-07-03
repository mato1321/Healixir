from sqlalchemy import Column, String, Date, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum

# 注意：這裡不再繼承 BaseModel，因為我們使用 email 作為主鍵
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class GenderEnum(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"  # 可選：添加其他性別選項

class User(Base):
    __tablename__ = "users"
    
    # email 作為主鍵
    email = Column(String, primary_key=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # 改為 password
    name = Column(String, nullable=True)
    gender = Column(SQLEnum(GenderEnum), nullable=True)
    birth_date = Column(Date, nullable=True)
    phone = Column(String, nullable=True)  # 新增 phone 欄位
    
    # 移除這些欄位：
    # hashed_password (改為 password)
    # is_active (已刪除)
    # is_verified (已刪除)
    # id (email 現在是主鍵)
    # created_at (已刪除)
    # updated_at (已刪除)
    
    # 關聯關係（如果需要的話）
    # orders = relationship("Order", back_populates="user")
    # reviews = relationship("Review", back_populates="user")
    
    def __repr__(self):
        return f"<User(email='{self.email}', name='{self.name}')>"