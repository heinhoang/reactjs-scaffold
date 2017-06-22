test: test-unit test-e2e ## launch all tests

test-unit: ## launch unit tests
	@NODE_ENV=test NODE_ICU_DATA=node_modules/full-icu ./node_modules/.bin/mocha \
		--require ignore-styles \
		--compilers js:babel-register \
		'./src/**/*.spec.js'

test-unit-watch: ## launch unit tests and watch for changes
	@NODE_ENV=test NODE_ICU_DATA=node_modules/full-icu ./node_modules/.bin/mocha \
		--require ignore-styles \
		--compilers js:babel-register \
		--watch \
		'./src/**/*.spec.js'

test-e2e: ## launch end-to-end tests
	@if [ "$(build)" != "false" ]; then \
		echo 'Building your project (call "make build=false test-e2e" to skip the build)...'; \
		cd src && ../node_modules/.bin/webpack; \
	fi
	@echo 'Launching e2e tests...'
	@NODE_ENV=test node_modules/.bin/mocha \
		--compilers js:babel-register \
		--timeout 15000 \
		./e2e/tests/server.js \
		./e2e/tests/*.js