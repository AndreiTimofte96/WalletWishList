#!/bin/bash

lt --port 4000 --subdomain wishlist&
cd ./api
docker-compose up -d
cd ../frontend
 npm run build

 
