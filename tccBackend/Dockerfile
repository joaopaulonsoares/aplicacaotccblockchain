FROM python:3.7-alpine
ENV PYTHONUNBUFFERED 1

ENV PROJECT=tcc_backend
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime && \
    echo "America/Sao_Paulo" > /etc/timezone

RUN apk update && apk add postgresql-dev python3-dev gcc musl-dev git \
    jpeg-dev zlib-dev linux-headers
RUN apk add --no-cache bash 

RUN mkdir -p /var/$PROJECT
WORKDIR /var/$PROJECT
ADD . /var/$PROJECT/
RUN pip install -r requirements.txt

RUN chmod 755 start_backend.sh
