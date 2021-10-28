FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

#sudo docker build -t flask-docker .

#docker run -it -v `pwd`:/usr/backend -w /usr/backend -p 80:80 flask-docker


# https://forums.docker.com/t/hash-sum-mismatch-writing-more-data-as-expected/45940/3
# Uncomment this line and follow this if you have the same issue
COPY ./badproxy /etc/apt/apt.conf.d/99fixbadproxy

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get -y install nginx

COPY . usr/src/backend
COPY requirements.txt usr/src/backend/requirements.txt

WORKDIR /usr/src/backend

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 80

COPY nginx.conf /etc/nginx
RUN chmod +x ./start.sh
CMD ["./start.sh"]