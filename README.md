# hipchat-code-test

## Setup

Clone the repo, then from the terminal run `npm install`. The project uses gulp for its build processes with the following options:

* `gulp`: The default option runs the project in development mode. The CSS and JS both include sourcemaps and are unminified. The rendered files can be found in the `dev` folder.

* `gulp dist`: Prepares the project for distribution. The CSS and JS files are minified, and do not include sourcemaps. The rendered files can be found in the `dist` folder.

* `gulp test`: Uses [QUnit](http://qunitjs.com) to run several tests against the compiled and bundled `index-bundle.js` file. Note that running this does not execute the tests, you'll have to go to the url noted below for that to happen.

With all options, go to `http://localhost:8080` to view the output.

## Libraries/Tech of note

* **Bootstrap**: I didn't want to spend a lot of time putting together the UI, so I opted to go with Bootstrap to have something presentable. I should note that I only utilized its CSS libraries, and none of its JavaScript modules.

* **jQuery**: Although a very commonly used library, I have a tendency to not use it if I don't have to. My previous job put an emphasis on vanilla JavaScript, and in most situations using jQuery was unnecessary. However there are a few things this library offers that are incredibly useful, one of those being XHR requests. I used that for making calls to a webtask. That being said...

* **webtask.io**: I recently had the opportunity to start using webtasks, and I find them very useful. In this case, I wrote a webtask that would return the title of a page based on a given URL. I included the code for [the task](https://github.com/zero0Halo/hipchat-code-test/blob/master/getTitle.webtask.js) in this repo.

* **QUnit**: There are quite a few test suites available right now, but I find QUnit's approach the most 'JavaScript-y'. I especially appreciate that its tests are run from the browser, and since this isn't a backend-heavy project, I opted to go with something that leaned more towards a frontend implementation. 
