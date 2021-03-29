#!/bin/bash

POSTGRES_DIRECTORY="$(pwd)/postgres_data";

if [ ! -d "$POSTGRES_DIRECTORY" ]; then
    mkdir -p $POSTGRES_DIRECTORY;
fi

docker-compose -p datagrid-service up -d --remove-orphans;