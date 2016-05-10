'use strict';

var generators = require('yeoman-generator');

var SketchAppPluginGenerator = generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log('Please answer the prompts that follow');

        var prompts = [
            {
                name    : 'pluginName',
                message : 'What will your plugin be named?',
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
                type    : 'boolean',
                name    : 'setRoot',
                message : 'Set this plugin to the root of the menu?',
                default : false
            }
        ];

        this.prompt(prompts, function(answers) {
            // TODO: add merge function here instead of explicitly mapping answers
            this.pluginName = answers.pluginName;
            this.pluginDescription = answers.pluginDescription;
            this.authorName = answers.authorName;
            this.authorEmail = answers.authorEmail;
            this.authorHomepage = answers.authorHomepage;
            this.setRoot = answers.setRoot;
            this.pluginIdentifier = 'com.sketch.' + this.pluginName
            done();
        }.bind(this));
    },

    writing: function () {
        var done = this.async();

        var sketchPlugin = this.pluginName + '.sketchplugin';
        var destinationPath = 'app/templates/' + sketchPlugin;

        this.fs.copy(
            this.templatePath('_.sketchplugin'),
            this.destinationPath(destinationPath)
        );
        this.fs.copyTpl(
            this.templatePath(sketchPlugin + '/Contents/Sketch/manifest.json'),
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
    }
});

module.exports = SketchAppPluginGenerator;
