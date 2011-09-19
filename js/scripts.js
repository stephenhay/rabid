// define templates for re-use

var team = {
	heading: "Team",
    list: [
    	{ item: "Peter" },
    	{ item: "Michiel", url: "http://twitter.com/michielj" },
    	{ item: "Don", url: "http://twitter.com/dccrowley" },
    	{ item: "Jeroen"},
    	{ item: "Marjolein", url: "http://twitter.com/marjoverde" }
	]
};
var header = '{{nav}}';
var footer = '<p>[Footer]</p>';

// define regions & pages

var pages = {
	home: {
		article: '<h1>Homepage</h1>' + rabid.lipsum(2),
		aside: rabid.comp('linklist', team),
		header: header,
		footer: footer
	},
	news: {
		article: '<h1>Nieuws</h1>' + rabid.list(10, 'article'),
		aside: rabid.comp('linklist', team),
		header: header,
		footer: footer
	},
	article: {
		article: [
			'<h1>Nieuwsbericht</h1>',
			rabid.image(200, 150),
			rabid.lipsum(3),
			rabid.list(3),
			rabid.lipsum(3)
		],
		aside: rabid.comp('linklist', team),
		header: header,
		footer: footer
	}
}

$(document).ready(function(){
	rabid.init(pages);
});
