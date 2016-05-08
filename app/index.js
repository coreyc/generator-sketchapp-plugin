'use strict';

var generators = require('yeoman-generator');

var SketchAppPluginGenerator = generators.Base.extend({
    prompting: function () {
        var done = this.async();

        this.log('Please answer the prompts that follow');

        var prompts = [
            {
                name    : 'pluginName',
                message : 'What will your plugin be named?'
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
            }
        ];

        this.prompt(prompts, function(answers) {
            this.pluginName = answers.pluginName;
            this.pluginDescription = answers.pluginDescription;
            this.authorName = answers.authorName;
            done();
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('_.sketchplugin'),
            this.destinationPath('app/templates/' + this.pluginName + '.sketchplugin')
        );
    }
});

module.exports = SketchAppPluginGenerator;
