'use strict';

var generators = require('yeoman-generator');
var utils = require('./utils');

var SketchAppPluginGenerator = generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log('Please answer the prompts that follow');

        var prompts = [
            {
                name    : 'pluginName',
                message : 'What will your plugin be named?',
                validate: function(input) {
                    var rgx = new RegExp("^[a-zA-Z0-9-]+$");
                    return rgx.test(input);
                },
                default : this.appname
            },
            {
                name    : 'pluginDescription',
                message : 'Description',
                default : ''
            },
            {
                name    : 'authorName',
                message : 'Author name',
                default : '',
                store   : true
            },
            {
                name    : 'authorEmail',
                message : 'Email',
                default : '',
                store   : true
            },
            {
                name    : 'authorHomepage',
                message : 'Website',
                default : '',
                store   : true
            },
            {
                type    : 'confirm',
                name    : 'setRoot',
                message : 'Set this plugin to the root of the menu?',
                default : false
            }
        ];

        this.prompt(prompts, function(answers) {
            utils.extend(this, answers);
            this.pluginIdentifier = 'com.sketch.' + this.pluginName;
            done();
        }.bind(this));
    },

    writing: function () {
        var done = this.async();

        var sketchPlugin = this.pluginName + '.sketchplugin';
        var destinationPath = 'app/templates/' + sketchPlugin;

        this.fs.copy(
            this.templatePath('_.sketchplugin/Contents/Sketch/_.cocoascript'),
            this.destinationPath(destinationPath + '/Contents/Sketch/' +
                this.pluginName + '.cocoascript')
        );
        this.fs.copyTpl(
            this.templatePath('_.sketchplugin/Contents/Sketch/manifest.json'),
            this.destinationPath(destinationPath + '/Contents/Sketch/manifest.json'),
            {
                pluginName: this.pluginName,
                pluginDescription: this.pluginDescription,
                authorName: this.authorName,
                authorEmail: this.authorEmail,
                authorHomepage: this.authorHomepage,
                pluginIdentifier: this.pluginIdentifier,
                setRoot: this.setRoot
            }
        );
        done();
    }
});

module.exports = SketchAppPluginGenerator;
