#!/bin/bash

pushd ./apps/api

npm run docker:up
npm run prisma:generate

popd

npm run dev

cd ./apps/api && npm run docker:down