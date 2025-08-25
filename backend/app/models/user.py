from sqlalchemy import Column, Integer, String, Date, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .base import Base

class GenderEnum(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class User(Base):
    __tablename__ = "users"
    
    # Primary key using id, not email
    id = Column(Integer, primary_key=True, index=True)
    
    # Basic data
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)  # Store encrypted password
    name = Column(String, nullable=True)
    gender = Column(SQLEnum(GenderEnum), nullable=True)
    birth_date = Column(Date, nullable=True)
    phone = Column(String, nullable=True)
    
    # Status fields
    is_active = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 關聯評估記錄 (使用字符串引用避免循環導入)
    assessments = relationship("Assessment", back_populates="user", lazy="dynamic")
    
    def __repr__(self):
        return f"<User(id={self.id}, email='{self.email}', name='{self.name}')>"