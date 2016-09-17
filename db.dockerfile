FROM postgres:9.5

RUN localedef -i sv_SE -c -f UTF-8 -A /usr/share/locale/locale.alias sv_SE.UTF-8
ENV LANG sv_SE.utf8


ENV POSTGIS_MAJOR 2.2

RUN ["echo", "deb http://http.debian.net/debian jessie-backports main", ">>", "/etc/apt/sources.list"]
RUN apt-get install postgis -y
# RUN DEBIAN_FRONTEND=noninteractive apt-get update &&\
#    DEBIAN_FRONTEND=noninteractive apt-get install -y \
#    postgresql-9.5-postgis-2.2 \
#    postgresql-9.5-postgis-scripts


COPY ./docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
