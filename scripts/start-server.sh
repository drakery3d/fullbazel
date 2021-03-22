# bin/bash

command yarn bazelisk build //libs/config:generate_docker_compose_env

command docker-compose -f docker-compose.yaml up --build