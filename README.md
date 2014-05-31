# grunt-broccoli-build

> Runs a Broccoli build via Grunt.

**Grunt:**
> The JavaScript Task Runner.

**Broccoli:**
> A fast, reliable asset pipeline, supporting constant-time rebuilds and compact build definitions.

[Broccoli](https://github.com/joliss/broccoli) can be used during development as your project's asset pipeline, making sure everything is compiled/built, up-to-date, and even serve assets to the browser. It does this in a smart way that only build what needs to be built.

When it's time to package your project for deployment you'll want to clean the `build/` or `dist/` dir, then run `broccoli build`, and probably a handful of other tasks. That's where this simple Grunt plugin comes in, it allows you to use Grunt for what it's good at — running tasks — including runing your Broccoli build as one of those tasks during packaging/deployment.

## Getting Started
This plugin requires `grunt` `>= 0.4.1 < 0.5.0` and `broccoli` `>= 0.2.1`. This plugin has a peer dependency on Broccoli to allow you to control which version you need for your Broccoli build.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-broccoli-build --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-broccoli-build');
```

## The "broccoli_build" task

### Overview
In your project's Gruntfile, add a section named `broccoli_build` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  broccoli_build: {
    assets: {
      // Where to stick the build files.
      dest: 'build/'
    }
  },
});
```

### Setting the `BROCCOLI_ENV` Environment Variable
If you need to run your Broccoli build with the `BROCCOLI_ENV` environment variable set to either `"development"` or `"production"`, use the [`grunt-env`](https://github.com/jsoverson/grunt-env) plugin.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* 0.0.1: Initial release.
* 0.0.2: Updated README docs.
* 0.0.3: Updated keywords in package.json.
* 0.0.4: Fixed to work with Broccoli 0.4.x.
* 0.1.0: Added support for multiple build environments. (#3, @treppo)
* 0.2.0: Updated to work with Broccoli 0.12.x. Removed support for multiple build environments, use `grunt-env`. (#4)
* 0.3.0: Output Broccoli build times.
