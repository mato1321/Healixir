from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.api.deps import get_current_user
from app.schemas.user import UserResponse, UserUpdate
from app.crud.user import update_user
from app.models.user import User

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    return current_user

@router.put("/me", response_model=UserResponse)
def update_current_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current user info"""
    updated_user = update_user(db, current_user.id, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return updated_user

@router.put("/update", response_model=dict)
def update_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user info (consistent with frontend API path)"""
    updated_user = update_user(db, current_user.id, user_update)
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Return response consistent with frontend expectations
    return {
        "message": "User updated successfully",
        "user": {
            "id": updated_user.id,
            "name": updated_user.name,
            "email": updated_user.email,
            "phone": updated_user.phone,
            "birth_date": str(updated_user.birth_date) if updated_user.birth_date else None,
            "gender": updated_user.gender.value if updated_user.gender else None,
            "is_active": updated_user.is_active,
            "created_at": updated_user.created_at.isoformat(),
            "updated_at": updated_user.updated_at.isoformat()
        }
    }