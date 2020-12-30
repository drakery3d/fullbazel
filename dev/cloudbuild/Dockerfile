FROM ubuntu:20.04

COPY .bazelversion .bazelversion

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get -y install curl gnupg unzip python python3 git build-essential

# nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

RUN apt-get update && \
  # Firefox deps
  apt-get install -y --no-install-recommends --no-upgrade \
  libdbus-glib-1-2 \
  libgtk-3-dev \
  libxt6 \
  && \
  # Google Chrome deps
  apt-get install -y --no-install-recommends --no-upgrade \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatspi2.0-0 \
  libcairo2 \
  libcups2 \
  libgbm1 \
  libgdk-pixbuf2.0-0 \
  libgtk-3-0 \
  libpango-1.0-0 \
  libpangocairo-1.0-0 \
  libxcursor1 \
  libnss3 \
  xvfb \
  && \
  rm -rf /var/lib/apt/lists/*

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get -y install yarn

# bazelisk
RUN yarn global add @bazel/bazelisk --prefix /usr/local && bazelisk version

WORKDIR /workspace

ENTRYPOINT [ "bazelisk" ]
