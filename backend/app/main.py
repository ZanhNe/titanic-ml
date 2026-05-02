from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from typing import Optional
import sys

from app import preprocessor

sys.modules['__main__'] = preprocessor

app = FastAPI(title="Titanic Predictor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    model_pipeline = joblib.load('../models/titanic_svm_final.joblib')
    print("Model load thành công!")
except Exception as e:
    print(f"Lỗi load model: {e}")
    model_pipeline = None

class PassengerInput(BaseModel):
    PassengerId: int
    Pclass: int
    Name: str
    Sex: str
    Age: Optional[float] = None
    SibSp: int
    Parch: int
    Ticket: str
    Fare: Optional[float] = None
    Cabin: Optional[str] = None
    Embarked: Optional[str] = None


@app.post("/predict")
def predict(passenger: PassengerInput):
    if model_pipeline is None:
        raise HTTPException(status_code=500, detail="Model chưa sẵn sàng.")

    df_input = pd.DataFrame([passenger.model_dump()])

    try:
        prediction = model_pipeline.predict(df_input)
        probability = model_pipeline.predict_proba(df_input)

        return {
            "status": "success",
            "prediction": int(prediction[0]),
            "probability_survived": round(float(probability[0][1]), 4)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))