jQuery Slugular: Unobtrusive Slug Suggestion Plugin
===================================================


Unobtrusive slug generator plugin for jQuery. Makes a URL-safe slug from the title text you enter. If you don't like the suggestion, it's easily overridden.

![The plugin turns something like 'My Test Project' into 'my_test_project'](https://raw2.github.com/paulherron/jquery_slugular/master/demo.gif)

The aim of the plugin is to:

* Automatically generate a URL-safe version of your title, and populate a text input with it. This includes converting your text to a `lowercase_and_underscored` format and transliterating special characters, e.g. `á` becomes `a`.
* Be unobtrusive. You can reject the suggested slug by editing it. Once you've done this, the plugin no longer generates suggestions for you.
* Give some visual indictation whether you're using the suggestion provided, or have manually overridden it.
* Allow multiple source fields to be combined into a single slug, e.g. `first_name` and `last_name` can be concatenated.


Usage
-----

Basic usage is like this:

`$('#title').slugular();`

For more examples, see the [demo page](http://paulherron.github.io/jquery_slugular/).
