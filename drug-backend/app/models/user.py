from sqlalchemy import Column, String, Boolean, Date, Enum as SQLEnum
from sqlalchemy.orm import relationship
from .base import BaseModel
import enum

class GenderEnum(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"

class User(BaseModel):
    __tablename__ = "users"
    
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=True)
    gender = Column(SQLEnum(GenderEnum), nullable=True)
    birth_date = Column(Date, nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    
    # ????????????????????
    # orders = relationship("Order", back_populates="user")
    # reviews = relationship("Review", back_populates="user")