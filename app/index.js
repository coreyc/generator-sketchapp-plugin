var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function () {
        return this.prompt({
            plugin: 'plugin name',
            description: 'description',
            author: 'author name',
            default: this.appname,
            store: true
        }).then(function (answers) {
            this.answers = answers;
            this.log(answers);
        }).bind(this);
    }

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('_.sketchplugin'),
            this.destinationPath(this.answers.plugin + '.sketchplugin')
        );
    }
});
