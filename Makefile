upgrade: 
	yarn --cwd server upgrade
	yarn --cwd client upgrade

install:
	yarn --cwd server install
	yarn --cwd client install

runc:
	yarn --cwd client start:client
runs:
	yarn --cwd server start:server

build:
	rm -rf client/public/assets/js client/public/assets/css client/public/index.html
	yarn --cwd client build