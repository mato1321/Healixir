from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Dict, Any, Optional

class QuestionAnswer(BaseModel):
    questionNumber: int
    selectedOptions: List[str]
    question: str

class AssessmentCreate(BaseModel):
    # 健康分數
    overall_score: float = Field(..., ge=0, le=100)
    diet_score: float = Field(..., ge=0, le=100)
    lifestyle_score: float = Field(..., ge=0, le=100)
    mental_score: float = Field(..., ge=0, le=100)
    physical_score: float = Field(..., ge=0, le=100)
    exercise_score: float = Field(..., ge=0, le=100)
    
    # 用戶信息
    age: Optional[int] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    bmi: Optional[float] = None
    
    # 評估結果
    percentile: float = Field(..., ge=0, le=100)
    needs_improvement: List[str] = []
    recommendations: List[str] = []
    
    # 問卷答案
    questionnaire_answers: List[QuestionAnswer]

class AssessmentResponse(BaseModel):
    id: int
    user_id: int
    assessment_type: str
    created_at: datetime
    
    # 健康分數
    overall_score: float
    diet_score: float
    lifestyle_score: float
    mental_score: float
    physical_score: float
    exercise_score: float
    
    # 用戶信息
    age: Optional[int]
    height: Optional[float]
    weight: Optional[float]
    bmi: Optional[float]
    
    # 評估結果
    percentile: float
    needs_improvement: List[str]
    recommendations: List[str]
    
    class Config:
        from_attributes = True

class AssessmentListResponse(BaseModel):
    id: int
    assessment_type: str
    created_at: datetime
    overall_score: float
    
    class Config:
        from_attributes = True