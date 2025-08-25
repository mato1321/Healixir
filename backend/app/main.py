from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.api import auth
from app.models import User, Assessment  # 確保所有模型都被導入

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI application
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["authentication"])

# Only import users router if it exists
try:
    from app.api.v1.users import router as users_router
    app.include_router(users_router, prefix="/api/user", tags=["users"])
except ImportError:
    print("Warning: users router not found, skipping...")

# Import assessments router
try:
    from app.api.v1.assessments import router as assessments_router
    app.include_router(assessments_router, prefix="/api/assessments", tags=["assessments"])
except ImportError:
    print("Warning: assessments router not found, skipping...")

@app.get("/")
def root():
    return {"message": "Drug Recommendation API", "version": settings.VERSION}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)