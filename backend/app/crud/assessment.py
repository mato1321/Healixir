from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from app.models.assessment import Assessment
from app.schemas.assessment import AssessmentCreate

def create_assessment(db: Session, assessment: AssessmentCreate, user_id: int) -> Assessment:
    """創建新的評估記錄"""
    # 將questionnaire_answers轉換為可序列化的格式
    answers_dict = [answer.dict() for answer in assessment.questionnaire_answers]
    
    db_assessment = Assessment(
        user_id=user_id,
        overall_score=assessment.overall_score,
        diet_score=assessment.diet_score,
        lifestyle_score=assessment.lifestyle_score,
        mental_score=assessment.mental_score,
        physical_score=assessment.physical_score,
        exercise_score=assessment.exercise_score,
        age=assessment.age,
        height=assessment.height,
        weight=assessment.weight,
        bmi=assessment.bmi,
        percentile=assessment.percentile,
        needs_improvement=assessment.needs_improvement,
        recommendations=assessment.recommendations,
        questionnaire_answers=answers_dict
    )
    
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

def get_user_assessments(db: Session, user_id: int, skip: int = 0, limit: int = 10) -> List[Assessment]:
    """獲取用戶的評估記錄列表"""
    return (
        db.query(Assessment)
        .filter(Assessment.user_id == user_id)
        .order_by(desc(Assessment.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

def get_assessment_by_id(db: Session, assessment_id: int, user_id: int) -> Optional[Assessment]:
    """根據ID獲取特定的評估記錄"""
    return (
        db.query(Assessment)
        .filter(Assessment.id == assessment_id, Assessment.user_id == user_id)
        .first()
    )

def get_latest_assessment(db: Session, user_id: int) -> Optional[Assessment]:
    """獲取用戶最新的評估記錄"""
    return (
        db.query(Assessment)
        .filter(Assessment.user_id == user_id)
        .order_by(desc(Assessment.created_at))
        .first()
    )

def delete_assessment(db: Session, assessment_id: int, user_id: int) -> bool:
    """刪除評估記錄"""
    assessment = get_assessment_by_id(db, assessment_id, user_id)
    if assessment:
        db.delete(assessment)
        db.commit()
        return True
    return False