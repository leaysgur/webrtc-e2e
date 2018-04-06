FROM circleci/node:8.11.0
USER root

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c "echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google-chrome.list" && \
    apt-get update && \
    apt-get install -y google-chrome-stable
RUN apt-get remove binutils && \
    sh -c "echo 'deb http://ftp.hr.debian.org/debian sid main' >> /etc/apt/sources.list" && \
    apt-get update && \
    apt-get install -t sid firefox
RUN git clone https://github.com/leader22/webrtc-e2e.git && \
    cd webrtc-e2e && \
    npm i && \
    echo "window.__SKYWAY_KEY__ = '<YOUR_KEY_HERE>';" >> ./src/shared/key.js

WORKDIR webrtc-e2e
