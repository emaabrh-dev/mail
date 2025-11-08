from fastapi import FastAPI

app = FastAPI(title="EMAABRH API")

@app.get("/")
def root():
    return {"message": "API is running"}
