FROM armbuild/debian

RUN apt-get update

RUN apt-get install -y  php5-common \
                        libapache2-mod-php5 \
                        php5-cli

VOLUME /app
WORKDIR /app
EXPOSE 8000
CMD [ "php", "-S", "0.0.0.0:8000" ]
