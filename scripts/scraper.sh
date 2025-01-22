#!/bin/bash

cd apps/api

npm run docker:up

npm run scraper

npm run docker:down