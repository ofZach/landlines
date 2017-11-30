.PHONY: default css dev deps missing-% watch test build deploy deploy-% deploy-commit

default: dev

###
# Variables
###

APPID=zach-navigator
APPYAML=app.yaml

CURRENT_DIR=$(shell pwd)

###
# Dependencies
###

GCLOUD_CMD = $(shell sh -c "which gcloud || echo 'missing-gcloud'")

missing-%:
	$(error missing $*. please install)

deps: $(GCLOUD_CMD)

###
# Development
###

dev: deps $(GCLOUD_CMD)
	$(GCLOUD_CMD) serve -host 0.0.0.0

###
# AppEngine Deploy
###

deploy: deploy-master

# Deploy to AppEngine with version = %
deploy-%: $(GCLOUD_CMD) build
	gcloud app deploy --version $* --no-promote --project $(APPID)
	@echo "deployed to http://$*-dot-$(APPID).appspot.com/"

# Deploy to AppEngine, with version = current git revision
##deploy-commit: deploy-$(GIT_COMMIT)


