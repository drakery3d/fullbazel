# bin/bash

command yarn bazelisk build //libs/config:generate_docker_compose_env
command yarn bazelisk build //libs/config:flat_config_keys

command docker-compose -f docker-compose.yaml up --build