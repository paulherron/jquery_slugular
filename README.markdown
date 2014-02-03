jQuery Slug Suggest
===================

Unobtrusive slug generator plugin for jQuery. Generates a URL-safe slug from the title text you enter, using one or more fields as the source. If you don't like the suggestion, it's easily overridden.

![The plugin turns something like 'My Test Project' into 'my_test_project'](https://raw2.github.com/paulherron/jquery_slugular/master/demo.gif)

The aim of the plugin is to:

* Suggest something sensible as a slug, including converting to a `lowercase_and_underscored` format and transliterating special characters, e.g. `á` becomes `a`.
* Be unobtrusive. It should be possible to override the suggested slug, and not have the plugin interfere once you've done this.
* Give some visual indictation whether you're using the suggestion provided, or have manually overridden it.
* Allow multiple source fields to be combined into a single slug, e.g. `first_name` and `last_name` are concatenated.


Usage
-----

`$('#title').slugular();`

For more examples, see the demo page.
