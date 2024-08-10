.PHONY: install build

install:
	npm install
	poetry install

build:
	poetry run npm run build

run:
	poetry run npm run dev