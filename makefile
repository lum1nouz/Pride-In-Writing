.DEFAULT_GOAL := all
MAKEFLAGS += --no-builtin-rules
SHELL         := bash

# check files, check their existence with make check
CFILES :=                                 \
    .gitignore                            \
    .gitlab-ci.yml  

# check the existence of check files
check: $(CFILES)

# install the front end dependencies
front-install:
		cd front-end/ && yarn install

run:
		cd front-end/ && yarn start