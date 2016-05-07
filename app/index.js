var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function () {
        return this.prompt([
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
        ]).then(function (answers) {
          this.log(answers.name.pluginName);
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('_.sketchplugin'),
            this.destinationPath(this.answers.plugin + '.sketchplugin')
        );
    }
});
