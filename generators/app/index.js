'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the pioneering ' + chalk.red('Redux Immutable') + ' generator!'
    ));

    var prompts = [{
      type: 'string',
      name: 'appName',
      message: 'What\'s the name of your application?',
      default: "My Redux App"
    }, {
      type: 'string',
      name: 'appDesc',
      message: 'Describe your application in one sentence:',
      default: '...'
    },{
      type: 'string',
      name: 'port',
      message: 'Which port would you like to run on?',
      default: '3000'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.appSlug = slug(props.appName).toLowerCase();
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  configuring: {
    libraries: function() {
      this.npmInstall([
        'react', 'react-redux', 'redux-devtools',
        'redux-thunk', 'lodash', 'redux-immutable',
        'immutable', 'material-ui', 'react-router@1.0.0-beta3',
        'react-tap-event-plugin', 'reselect'
      ], {'save': true });
    },

    buildTools: function() {
      this.npmInstall([
        'webpack', 'webpack-dev-server', 'css-loader', 'jsx-loader',
        'file-loader', 'url-loader', 'sass-loader', 'autoprefixer',
        'babel-core', 'babel-loader', 'react-hot-loader', 'style-loader',
        'extract-text-webpack-plugin', 'cssnext-loader', 'transfer-webpack-plugin',
        'html-webpack-plugin',
      ], {'saveDev': true });
    },

    polyfills: function() {
      this.npmInstall([
        'babel-runtime'//, 'es6-promise', 'whatwg-fetch'
      ], {'save': true });
    }
  },

  writing: {
    app: function () {
      this._copyTpl('_package.json' ,'package.json');
      this._copyTpl('npmrc' ,'.npmrc');
      this._copyTpl('gitignore' ,'.gitignore');
      this._copyTpl('_bower.json', 'bower.json');
      this.fs.copy(
        this.templatePath('babelrc'),
        this.destinationPath('.babelrc')
      );
      this._copyTpl('README.md' ,'README.md');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
      this._copyTpl('webpack.production.config.js', 'webpack.production.config.js');
      this._copyTpl('server.js', 'server.js');
      this._copyTpl('src/www/index.html', 'src/www/index.html');
      this.directory('src/www/images', 'src/www/images');
      this._copyTpl('src/app/index.js', 'src/app/index.js');
      this.directory('src/app/actions', 'src/app/actions');
      this.directory('src/app/components', 'src/app/components');
      this.directory('src/app/constants', 'src/app/constants');
      this.directory('src/app/containers', 'src/app/containers');
      this.directory('src/app/data', 'src/app/data');
      this.directory('src/app/reducers', 'src/app/reducers');
      this.directory('src/app/selector', 'src/app/selector');
      this.directory('src/app/store', 'src/app/store');
      this.directory('src/app/utils', 'src/app/utils');
      this.directory('src/css/', 'src/css/');
      this.directory('src/css/fonts', 'src/css/fonts');
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('eslintrc'),
        this.destinationPath('.eslintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  },

  _copyTpl: function (src, dest) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.props
    );
  }
});
