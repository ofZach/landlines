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

GOAPP_CMD = $(shell sh -c "which goapp || echo 'missing-goapp'")

missing-%:
	$(error missing $*. please install)

deps: $(GOAPP_CMD)

###
# Development
###

dev: deps $(GOAPP_CMD)
	$(GOAPP_CMD) serve

###
# AppEngine Deploy
###

deploy: deploy-master

# Deploy to AppEngine with version = %
deploy-%: $(GOAPP_CMD) build
	$(GOAPP_CMD) deploy -version $* -application $(APPID) $(APPYAML)
	@echo "deployed to http://$*-dot-$(APPID).appspot.com/"

# Deploy to AppEngine, with version = current git revision
##deploy-commit: deploy-$(GIT_COMMIT)


