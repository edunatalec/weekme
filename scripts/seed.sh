#!/bin/bash

cd ./apps/api

npm run docker:up

sleep 2

npm run prisma:push
npm run prisma:generate
npm run prisma:seed

npm run docker:down