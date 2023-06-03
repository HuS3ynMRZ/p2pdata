#!/bin/bash

# Get the IP address of the host
ip_address=$(hostname -I | awk '{print $1}')

# Create or update the .env file
echo "WEB_HOST=$ip_address" > .env

echo "IP address ($ip_address) has been written to .env file."