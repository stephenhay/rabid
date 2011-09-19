/**
* Rabid.js - A Toolset for Rapid Prototyping with jQuery and Handlebars.js
* versie 0.1
* author(s): Stephen Hay, Michiel Jelijs

To initialize, call rabid.init(pages) on page load
"pages" is an object, in which you can define individual pages as properties of "pages"

Each page is also an object. The properties of a page are regions.
They refer to elements in your html template by class="rabid-region-{property name}".

When a page is called, each region in the html is filled with the contents defined in the object.
These contents can be either text, text returned from the comp()-function (for Handlebars templates or just file includes), or a combination of these in an array.

**/

var rabid = {

	pages: {},
	currentpage: '',
	settings: {
		hashbang: '!/',
		path: 'rabid'
	},

	/**
	Initialize Rabid and load first page
	**/
	init: function(pages) {
		this.pages = (pages) ? pages : {};
		var page = document.location.hash.replace('#' + this.settings.hashbang, '');
		this.initLinks();
		this.loadPage(page);
	},

	/**
	Load Rabid page
	**/
	loadPage: function(ref) {
		if (!ref) { // if no ref is set, find the first page
			for (var page in this.pages) {
				if (this.pages.hasOwnProperty(page)) {
					ref = page;
					break;
				}
			}
		}
		window.location.hash = '#' + this.settings.hashbang + ref;
		$('body').removeClass(this.currentpage).addClass(ref);
		this.currentpage = ref;
		for (var region in this.pages[ref]) { // walk through regions in this page
			if (this.pages[ref].hasOwnProperty(region)) {
				$('.rabid-region-'+region).html('');
				if ($.isArray(this.pages[ref][region])) {
					for (var block in this.pages[ref][region]) {
						this.renderContent('.rabid-region-'+region, this.pages[ref][region][block]);
					}
				} else {
					this.renderContent('.rabid-region-'+region, this.pages[ref][region]);
				}
			}
		}
		this.renderNav();
	},

	/**
	Make links with class 'rabid' load Rabid pages
	**/
	initLinks: function() {
		var _this = this;
		$('body a.rabid').live('click', function(event){
			event.preventDefault();
			var hrefArr = $(this).attr('href').split('/'); // IE7 returns full path instead of just the href attribute
			var href = hrefArr[hrefArr.length-1];
			_this.loadPage(href);
		});
	},

	/**
	Append content to a region
	**/
	renderContent: function(selector, content) {
		if (typeof(content) == 'string') {
			$(selector).append(content);
		}
	},

	/**
	Load component (Handlebars or just include file)
	content is optional, without it just {component}.html is included
	**/
	comp: function(component, content) {
		var output = '';
		$.ajax({
			url: this.settings.path + '/components/' + component + '.html',
			success: function(source) {
				if (content && typeof Handlebars != 'undefined') { // Handlebars processing
					var template = Handlebars.compile(source);
					output = template(content);
				} else { // plain content of the file
					output = source;
				}
			},
			type: 'GET',
			async: false,
			dataType: 'html',
			error: function(xhr, textStatus, errorThrown) {
				alert("Some browsers don't allow local AJAX calls:\r\n" + errorThrown + "\r\n\r\nIf you want to use the comp() function, try putting it on a webserver.");
			}
		});
		return output;
	},

	/**
	Automatically generate navigation 
	**/
	renderNav: function() {
		var output = '<div id="rabid-nav"><ul>';
		var i = 0;
		for (var page in this.pages) {
			if (this.pages.hasOwnProperty(page)) {
				output += '<li class="rabid-nav-' + page + '"><a href="' + page + '" class="rabid">' + page + '</a></li>';
				i++;
			}
		}
		output += '</ul></div>';
		if (i > 0) {
			$('body').html($('body').html().replace('{{nav}}', output));
			$('#rabid-nav li').removeClass('active');
			$('#rabid-nav').find('li.rabid-nav-'+this.currentpage).addClass('active');
		}
	},



	/**
	// Templates (to be replaced with Handlebars components?)
	**/
	lipsum: function(n) {
		var output = '';
		var lipsum = new Array();
		lipsum[lipsum.length] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla rutrum diam vitae convallis. Suspendisse vulputate tincidunt ligula vitae ultrices. In eget odio et dolor ultrices ultrices accumsan et metus. Nam et risus nibh, eget mattis mi.';
		lipsum[lipsum.length] = 'Morbi ut nunc vitae neque pellentesque feugiat. Ut adipiscing tempor aliquam. Proin tristique blandit nunc in consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non urna nisl, et cursus justo. Etiam consectetur mauris mi.';
		lipsum[lipsum.length] = 'Sed eleifend lacus eu orci vehicula at congue neque vulputate. Phasellus consectetur tempor erat, et porttitor sapien luctus a. Nullam bibendum laoreet leo ac convallis. Morbi tincidunt sollicitudin sagittis. Proin lorem diam, pulvinar in iaculis ut, pretium nec urna.';
		lipsum[lipsum.length] = 'Suspendisse quis urna et ligula vehicula consectetur ac ut diam. Sed justo leo, condimentum in consectetur at, porttitor sit amet est. Donec accumsan convallis imperdiet. Proin quis felis ligula, ut viverra nulla. In fringilla tempus lorem, imperdiet euismod eros euismod ornare.';
		lipsum[lipsum.length] = 'Fusce ante massa, commodo ut ullamcorper nec, tincidunt quis justo. Nunc in luctus magna. Sed dignissim mattis odio, congue luctus neque venenatis quis. Praesent porttitor mattis tellus, eget ultricies orci semper id. Nullam sem sapien, rhoncus a egestas id, blandit ut nisl.';
		for (var i=0; i<n; i++) {
			if (i%3 == 2)
				output += '<h2>Lorem ipsum dolor</h2>';
			output += '<p>' + lipsum[i%lipsum.length] + '</p>';
		}
		if (n == 0) {
			output += '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>';
		}
		return output;
	},
	list: function(n, href) {
		if (n < 1) n = 1;
		var lipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
		var output = '<ul>';
		for (var i=1; i<=n; i++) {
			output += '<li>';
			if (href)
				output += '<a href="' + href + '" class="rabid">' + lipsum + '</a>';
			else
				output += lipsum;
			output += '</li>';
		}
		output += '</ul>';
		return output;
	},
	image: function(w, h) {
		return '<img src="' + this.settings.path + '/images/image.png" width="' + w + '" height="' + h + '" alt="Image" class="rabid-image" />';
	}

}

