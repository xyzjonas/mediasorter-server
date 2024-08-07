import os.path
from copy import deepcopy

import uvicorn
import argparse
from distutils.sysconfig import get_python_lib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles
from dotenv import load_dotenv

from mediasorter import MediaSorter, MediaSorterConfig, read_config
from mediasorter import __version__ as lib_version
from mediasorter.lib.config import ScanConfig
from mediasorter.lib.sort import Operation


__version__ = "0.3.1"


class AppConfiguration(MediaSorterConfig):
    version: str
    lib_version: str


load_dotenv()

config = read_config()

app = FastAPI(
    title="Mediasorter",
    summary="Remotely sort your media files!",
    version=__version__,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/scans")
async def get_scans() -> list[ScanConfig]:
    return config.scan_sources


@app.post("/scan")
async def scan(sources: list[ScanConfig]) -> list[Operation]:
    config_copy = deepcopy(config)
    config_copy.scan_sources = sources
    sorter = MediaSorter(config=config_copy)
    ops = await sorter.scan_all()
    for op in ops:
        op.exception = str(op.exception) if op.exception else None
    return ops


@app.post("/sort")
async def sort(sort_operations: list[Operation]):
    ops = await MediaSorter.commit_all(sort_operations)
    for op in ops:
        op.exception = str(op.exception) if op.exception else None
    return ops


@app.get("/configuration", response_model=AppConfiguration)
def get_config() -> AppConfiguration:
    return AppConfiguration(**config.dict(), version=__version__, lib_version=lib_version)


# @app.put("/configuration")
# def put_config():
#     raise NotImplemented


if fe_dir := os.getenv("MEDIASORTER_FE_DIR", None):
    app.mount("/", StaticFiles(directory=fe_dir, html=True))
else:
    bundled_fe_dir_path = os.path.join(get_python_lib(), "src", "js", "mediasorter", "dist")
    app.mount("/", StaticFiles(directory=bundled_fe_dir_path, html=True))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="0.0.0.0")
    parser.add_argument("--port", default=8080, type=int)

    args = parser.parse_args()

    uvicorn.run(app, host=args.host, port=args.port)


if __name__ == "__main__":
    main()
