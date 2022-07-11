#!/bin/bash

GREEN='\033[0;32m'
NOCOLOR='\033[0m'

BRANCH_TO_PULL=$1

if [ -z "$BRANCH_TO_PULL" ]
  then
    BRANCH_TO_PULL="EMW_Production_Branch_1.0"
fi

# echo -e "${GREEN}======================${NOCOLOR}"
# echo -e "${GREEN}Checking out to ${BRANCH_TO_PULL}${NOCOLOR}"
# echo -e "${GREEN}======================${NOCOLOR}"
# git checkout $BRANCH_TO_PULL
# echo -e "${GREEN}===============================${NOCOLOR}"
# echo -e "${GREEN}Fetching the latest ${BRANCH_TO_PULL} code${NOCOLOR}"
# echo -e "${GREEN}===============================${NOCOLOR}"
# git pull origin $BRANCH_TO_PULL
echo -e "${GREEN}====================================${NOCOLOR}"
echo -e "${GREEN}Installing the depdencies Storefront${NOCOLOR}"
echo -e "${GREEN}====================================${NOCOLOR}"
npm install
echo -e "${GREEN}======================${NOCOLOR}"
echo -e "${GREEN}Building the Storefront${NOCOLOR}"
echo -e "${GREEN}======================${NOCOLOR}"
npm run build:prod
echo -e "${GREEN}======================${NOCOLOR}"
echo -e "${GREEN}Copying the Files${NOCOLOR}"
echo -e "${GREEN}======================${NOCOLOR}"
npm run copy
echo -e "${GREEN}======================${NOCOLOR}"
echo -e "${GREEN}Stopping the instance${NOCOLOR}"
echo -e "${GREEN}======================${NOCOLOR}"
npm run stop-server
echo -e "${GREEN}======================${NOCOLOR}"
echo -e "${GREEN}Starting the instance${NOCOLOR}"
echo -e "${GREEN}======================${NOCOLOR}"
npm run start-server
echo -e "${GREEN}===============================${NOCOLOR}"
echo -e "${GREEN}Storefront is live on PORT 3000${NOCOLOR}"
echo -e "${GREEN}===============================${NOCOLOR}"
