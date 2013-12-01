# ----------------------
source = cheet.js
minified = cheet.min.js
bin = node_modules/.bin
# ----------------------

install:; @npm install

test:; @$(bin)/mocha-phantomjs -R dot tests/index.html

test.open:; @open tests/index.html

minify:
	@echo "> Minifying..."
	@rm -f $(minified)
	@curl -s \
		-X POST \
		--data-urlencode 'compilation_level=SIMPLE_OPTIMIZATIONS' \
		--data-urlencode 'output_format=text' \
		--data-urlencode 'output_info=compiled_code' \
		--data-urlencode 'js_code@$(source)' \
		-o $(minified) \
		http://closure-compiler.appspot.com/compile

.PHONY: install test test.open minify
