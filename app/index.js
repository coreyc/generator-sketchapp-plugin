var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    prompting: function () {
        return this.prompt({
            plugin: 'plugin name',
            description: 'description',
            author: 'author name',
            default: this.appname
        }).then(function (answers) {
            this.log(answers);
        }).bind(this);
    }
});
