FROM node:20-alpine as fe-build-stage
COPY ./src/js/mediasorter .
RUN yarn build


FROM python:3.11.1 as be-build-stage
COPY pyproject.toml .
COPY poetry.lock .
RUN pip install poetry
COPY src/python ./src/python
COPY ./README.md .
RUN poetry build


FROM python:3.11.1-alpine

WORKDIR app

COPY --from=be-build-stage dist/*.whl wheels/
RUN pip install --no-cache-dir wheels/*

ENV MEDIASORTER_FE_DIR=./static
COPY --from=fe-build-stage dist ./static

EXPOSE 8000
ENTRYPOINT ["mediasorter-server"]
CMD ["--port", "8000"]
