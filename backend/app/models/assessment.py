from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .base import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # 評估基本信息
    assessment_type = Column(String, default="nutrition_assessment")
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # 健康分數
    overall_score = Column(Float, nullable=False)
    diet_score = Column(Float, nullable=False)
    lifestyle_score = Column(Float, nullable=False)
    mental_score = Column(Float, nullable=False)
    physical_score = Column(Float, nullable=False)
    exercise_score = Column(Float, nullable=False)
    
    # 用戶信息
    age = Column(Integer)
    height = Column(Float)
    weight = Column(Float)
    bmi = Column(Float)
    
    # 評估結果
    percentile = Column(Float)
    needs_improvement = Column(JSON)  # 存儲需要改善的領域列表
    recommendations = Column(JSON)    # 存儲建議列表
    
    # 問卷答案 (JSON格式存儲)
    questionnaire_answers = Column(JSON)
    
    # 關聯用戶
    user = relationship("User", back_populates="assessments")