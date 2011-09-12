/** 
 * Rabid.js - A Toolset for Rapid Prototyping with jQuery and Handlebars.js
 * versie 0.1
 * author(s): Stephen Hay
 **/

function comp(component, content) {
    $.get(comp_path + component + '.html', function(source) {
        var template = Handlebars.compile(source);
        $.getJSON(cont_path + content + '.js', function(data) {
            $('.' + component + '-' + content).html(template(data));
        });
    });
}
