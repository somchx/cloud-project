from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/login", response_model=schemas.LoginResponse)
def login(request: schemas.LoginRequest, db: Session = Depends(get_db)):
    """
    Login endpoint - validates email and password
    """
    user = db.query(models.User).filter(models.User.email == request.email).first()
    
    if not user:
        return schemas.LoginResponse(
            success=False,
            message="Invalid email or password",
            user=None
        )
    
    if user.password != request.password:  # In production, use password hashing
        return schemas.LoginResponse(
            success=False,
            message="Invalid email or password",
            user=None
        )
    
    return schemas.LoginResponse(
        success=True,
        message="Login successful",
        user=schemas.User.model_validate(user)
    )
