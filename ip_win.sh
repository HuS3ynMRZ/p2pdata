#!/bin/bash

# Get the IP address of the host using ipconfig
ip_address=$(ipconfig | awk '/IPv4 Address/ { print $NF }' | head -n 1)

# Append the WEB_HOST variable to the end of the .env file
echo "" >> .env
echo "WEB_HOST=$ip_address" >> .env

echo "WEB_HOST=$ip_address has been added to the .env file."