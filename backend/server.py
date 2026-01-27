from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    subject: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    full_name: str
    email: EmailStr
    subject: str
    message: str


class Project(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    title: str
    category: str
    image: str
    description: str


class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    role: str
    image: str


@api_router.get("/")
async def root():
    return {"message": "Birds Eye Media API"}


@api_router.post("/contact")
async def submit_contact_form(form_data: ContactFormCreate):
    contact_obj = ContactForm(**form_data.model_dump())
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contact_forms.insert_one(doc)
    return {"success": True, "message": "Contact form submitted successfully"}


@api_router.get("/portfolio", response_model=List[Project])
async def get_portfolio():
    projects = [
        {
            "id": "1",
            "title": "Urban Pulse",
            "category": "Aerial Film",
            "image": "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=800&auto=format&fit=crop",
            "description": "Cinematic aerial tour of urban landscapes"
        },
        {
            "id": "2",
            "title": "Azure Shores",
            "category": "Photography",
            "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
            "description": "Coastal beauty captured from above"
        },
        {
            "id": "3",
            "title": "Summit Quest",
            "category": "Aerial Film",
            "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
            "description": "Mountain adventure cinematography"
        },
        {
            "id": "4",
            "title": "Monolith",
            "category": "Brand Design",
            "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
            "description": "Corporate brand identity development"
        },
        {
            "id": "5",
            "title": "Silent Water",
            "category": "Photography",
            "image": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=800&auto=format&fit=crop",
            "description": "Serene lake reflections"
        },
        {
            "id": "6",
            "title": "Tech Launch",
            "category": "Motion Graphics",
            "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
            "description": "Product launch animation"
        },
        {
            "id": "7",
            "title": "Forest Canopy",
            "category": "Aerial Film",
            "image": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
            "description": "Nature documentary footage"
        },
        {
            "id": "8",
            "title": "Neon Nights",
            "category": "Motion Graphics",
            "image": "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=800&auto=format&fit=crop",
            "description": "Urban night time lapse"
        },
        {
            "id": "9",
            "title": "Luxe Living",
            "category": "Brand Design",
            "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
            "description": "Luxury real estate branding"
        }
    ]
    return projects


@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    team = [
        {
            "id": "1",
            "name": "Alex Sterling",
            "role": "Creative Director",
            "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
        },
        {
            "id": "2",
            "name": "Sarah Chen",
            "role": "Lead Producer",
            "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
        },
        {
            "id": "3",
            "name": "Marcus Thomas",
            "role": "Senior Designer",
            "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
        }
    ]
    return team


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
