FROM python:3.11-slim

RUN pip install --upgrade pip

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . /app/backend/AccountTransfer
WORKDIR /app/backend/AccountTransfer

COPY ./entrypoint.sh .
ENTRYPOINT ["sh", "/app/backend/AccountTransfer/entrypoint.sh"]