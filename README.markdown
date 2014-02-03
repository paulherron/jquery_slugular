jQuery Slug Suggest
===================

A plugin for jQuery that takes the title text you enter and generates a sensible slug from it.

A slug is just a URL-safe version of a title. In this case that means converting it to a `lowercase_and_underscored` format.

![The plugin turns something like 'My Test Project' into 'my_test_project'](demo.gif)

The aim of the plugin is to:

* Suggest something sensible as a slug, based on the title provided. This include converting to a `lowercase_and_underscored` format and transliterating special characters, e.g. `á` becomes `a`.
* Be unobtrusive. It should be possible to override the suggested slug, and not have the plugin interfere once you've done this
* Give some visual indictation whether you're using the suggestion provided, or have manually overridden it
* Allowe multiple source fields to be combined into a single slug, e.g. `first_name` and `last_name` can be combined into one slug.


Usage
-----

`$('#title').slugular();`

For more examples, see the demo page.
