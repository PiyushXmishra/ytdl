FROM node:20-alpine


# Install necessary system packages
# Install necessary system packages
RUN apk add --no-cache \
    python3 \
    py3-pip \
    ffmpeg

WORKDIR /app

# Remove EXTERNALLY-MANAGED flag (if present)
RUN rm -rf /usr/lib/python*/EXTERNALLY-MANAGED || true

# Install pip and setuptools
RUN python3 -m ensurepip \
    && rm -r /usr/lib/python*/ensurepip \
    && pip3 install --no-cache --upgrade pip setuptools

# Install yt-dlp and any other Python packages you need
RUN pip3 install --no-cache-dir yt-dlp


WORKDIR /app

COPY backend/package*.json ./

RUN NODE_ENV=development npm install

COPY backend .

RUN npm install -g typescript

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/index.js"]
