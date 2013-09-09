# Rabid: A toolkit for rapid web mockups/prototyping

Rabid is itself a tool, but also a group of tools, which can be used for creating visualizations of web pages/screens/apps/whatever *in the browser*. "Designing in the browser" offers many benefits, including observing how a design will work in different browsers and on different devices. Rabid aims to speed up the process of creating these types of prototypes by providing useful tools for rapidly generating HTML components and creating pages with them.

## Features

- HTML templating via Mustache/Handlebars.js with a growing library of generic templates (you can also add your own)
- Template library allows for static HTML components
- Paging: all pages within a prototype are dynamically created from a single HTML file
- Navigation across prototype pages can be automatically generated
- Some Javascript helper functions for rapidly generating content such as lists, image placeholders and plain text
- Some basic CSS helper styles: you will need to write your own layout in CSS; no miracles in here ;)

We are planning on adding as many templates, helper functions and styles as necessary to help people work more easily and quickly. We do plan on keeping only the most useful, as part of working quickly means being able to memorize which functions and templates are available.

## Quick Start (coming soon)

## Dependencies

Rabid depends on jQuery (http://jquery.com). If you want to take advantage of Mustache templating, you'll want Handlebars.js (http://www.handlebarsjs.com/).

## Caveats

Rabid is meant to be a design/wireframing/prototyping tool, and as such is not intended to be used for production sites. It does not need to work everywhere. It will have bugs. It is in progress. Hashbangs are killing the Web. Kittens are dying. You get the idea.

Due to Javascript permissions in some browsers, you may need to install Rabid onto a (local) web server to get all components to work properly.

## Contributors

Rabid is brainchild of Stephen Hay (http://twitter.com/stephenhay) and Michiel Jelijs (http://twitter.com/michielj), who tired of spending time doing things outside of the browser, only to have to redo them inside the browser. We have computers to make things easier, someone said.

## License

Rabid is released under the MIT license: http://stephenhay.mit-license.org/.
