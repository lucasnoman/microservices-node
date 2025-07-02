FROM kong:3.9

USER root

# gettext-base replaces the env var for the value required
RUN apt-get update && \
  apt-get install -y gettext-base

COPY ./config.template.yaml /kong/config.template.yaml
COPY ./startup.sh /usr/local/bin/startup.sh
RUN chmod +x /usr/local/bin/startup.sh

WORKDIR /kong

RUN chown kong:kong /kong

USER kong

ENTRYPOINT ["/usr/local/bin/startup.sh"]
CMD ["kong", "docker-start"]
