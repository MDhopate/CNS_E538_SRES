# Use Node.js 16 based on Debian Bullseye
FROM node:16-bullseye

# Install Python, R, and essential build tools and libraries
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    pkg-config \
    r-base \
    libudunits2-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    gdal-bin \
    libgdal-dev \
    libproj-dev \
    libgeos-dev \
    libfontconfig1-dev \
    libfreetype6-dev \
    libharfbuzz-dev \
    libfribidi-dev \
    pandoc \  
 && rm -rf /var/lib/apt/lists/*

# Upgrading pip
RUN pip3 install --upgrade pip setuptools wheel

# Install Python packages (Matplotlib, NumPy, Pandas, Plotly, rpy2 for Python-R interaction)
RUN pip3 install matplotlib numpy pandas plotly rpy2

# Configure CRAN repository globally for R
RUN echo "options(repos = c(CRAN = 'https://cloud.r-project.org'))" >> /etc/R/Rprofile.site

# Install essential R packages
RUN Rscript -e "install.packages(c('ggplot2', 'plyr', 'plotly', 'htmlwidgets'), dependencies=TRUE)"

# Set working directory for the Node.js app
WORKDIR /app

# Copy Node.js dependency files and install
COPY package*.json ./
RUN npm install

# Copy backend source code
COPY . .

# Expose the backend server port
EXPOSE 3001

# Start the backend server
CMD ["node", "server.js"]
