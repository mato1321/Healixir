from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.api.deps import get_current_user, get_db
from app.crud import assessment as assessment_crud
from app.schemas.assessment import (
    AssessmentCreate, 
    AssessmentResponse, 
    AssessmentListResponse
)
from app.schemas.user import UserResponse

router = APIRouter()

@router.post("/", response_model=AssessmentResponse)
def create_assessment(
    assessment_data: AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """創建新的健康評估記錄"""
    try:
        assessment = assessment_crud.create_assessment(
            db=db, 
            assessment=assessment_data, 
            user_id=current_user.id
        )
        return assessment
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create assessment: {str(e)}"
        )

@router.get("/", response_model=List[AssessmentListResponse])
def get_assessments(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """獲取用戶的評估記錄列表"""
    assessments = assessment_crud.get_user_assessments(
        db=db, 
        user_id=current_user.id, 
        skip=skip, 
        limit=limit
    )
    return assessments

@router.get("/latest", response_model=AssessmentResponse)
def get_latest_assessment(
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """獲取用戶最新的評估記錄"""
    assessment = assessment_crud.get_latest_assessment(db=db, user_id=current_user.id)
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No assessment found"
        )
    return assessment

@router.get("/{assessment_id}", response_model=AssessmentResponse)
def get_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """獲取特定的評估記錄"""
    assessment = assessment_crud.get_assessment_by_id(
        db=db, 
        assessment_id=assessment_id, 
        user_id=current_user.id
    )
    if not assessment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    return assessment

@router.delete("/{assessment_id}")
def delete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: UserResponse = Depends(get_current_user)
):
    """刪除評估記錄"""
    success = assessment_crud.delete_assessment(
        db=db, 
        assessment_id=assessment_id, 
        user_id=current_user.id
    )
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment not found"
        )
    return {"message": "Assessment deleted successfully"}