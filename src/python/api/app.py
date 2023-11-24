from copy import deepcopy

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mediasorter.lib.sorter import Operation
from pydantic import BaseModel
from mediasorter import MediaSorter, MediaSorterConfig, read_config
from mediasorter.lib.config import ScanConfig
import asyncio

config = read_config()


class Foo(BaseModel):
    x: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def get_scans() -> list[ScanConfig]:
    return config.scan_sources


@app.post("/scan")
async def scan(sources: list[ScanConfig]) -> list[Operation]:
    config_copy = deepcopy(config)
    config_copy.scan_sources = sources
    sorter = MediaSorter(config=config_copy)
    ops = await sorter.scan_all()
    for op in ops:
        op.exception = str(op.exception)
    return ops


@app.post("sort")
def sort():
    pass


@app.get("config", response_model=MediaSorterConfig)
def get_config() -> MediaSorterConfig:
    pass


@app.put("config")
def put_config():
    raise NotImplemented


def main():
    uvicorn.run(app)


if __name__ == "__main__":
    main()
