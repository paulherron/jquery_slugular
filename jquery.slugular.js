jQuery.fn.slugular = function(options) {

	var settings = {
		slugSelector: "input[name*='slug']:first",
		separator: '_',
		suggestionClass: 'has_suggested_slug'
	};

	if(options) {
		jQuery.extend(settings, options);
	}

	var titleField = this;
	var slugField = $(settings.slugSelector);

	// Do nothing if the title and slug fields aren't present.
	if(!slugField.length || !titleField.length) {
		return;
	}

	var hasEdited = false;

	// If there's a slug already present, and it looks different to what would have been generated from the current title, show that the slug has already been manually edited.
	if(slugField.attr('value') !== '' && slugify(getTitle()) !== slugField.attr('value')) {
		hasEdited = true;
	} else {
		hasEdited = false;
		slugField.addClass(settings.suggestionClass);
	}
	
	// Generate the slug automatically as soon as the script loads, as the 'title' field may have been prepopulated with a value.
	populateSlugField(titleField);

	// Generate a new slug each time the title has been edited. 
	titleField.bind('keyup change', function() {
		populateSlugField();
	});

	// Check for a manual override of the generated slug. Once the slug has been manually overridden, automatic slug generation should stop. 
	slugField.bind('input', function() {
		if(!hasEdited) {
			console.log('slug field has been edited');
			hasEdited = true;
			$(this).removeClass(settings.suggestionClass);
		}
	});

/**
 * Populates the 'slug' field with a URL-safe version of the 'title' field.
 */
	function populateSlugField() {
		if(!hasEdited && titleField.length > 0) {
			slug = slugify(getTitle());
			slugField.val(slug);
		}
	}

/**
 * Converts text to a URL-safe form. For example, 'My Title' would become 'my_title'.
 *
 * @param  string  text The text to be slugified.
 * @return string		Slugified text
 */	
	function slugify(text) {
		text = text.toLowerCase();
		
		// Remove any characters that aren't URL-safe.
		slug = text
			// Replace spaces, and also the commonly-used ' - ', with underscores.
			.replace(/\s+(-)?(\s+)?/g, settings.separator)
			// Replace special characters.
			.replace(/[àáâãäå]/g, 'a')
			.replace(/æ/g, 'ae')
			.replace(/ç/g, 'c')
			.replace(/[èéêë]/g, 'e')
			.replace(/[ìíîï]/g, 'i')
			.replace(/ñ/g, 'n')                        
			.replace(/[òóôõöø]/g, 'o')
			.replace(/œ/g, 'oe')
			.replace(/[ùúûü]/g, 'u')
			.replace(/[ýÿ]/g, 'y')
			.replace(/[\/:\-]/g, settings.separator)
			// In what's left, remove anything that isn't URL-safe.
			.replace(/[^a-z0-9_\-]/g, '')
			// Avoid multiple underscores from the above replacements.
			.replace(/[_]+/g, settings.separator)
			// Avoid trailing and leading underscores caused by whitespace on the beginning or end of the text.
			.replace(/^_/, '')
			.replace(/_$/, '');

		return slug; 
	}

/**
 * Fetches source text to be slugified. This might come from just one field, or be concatenated from multiple fields.
 *
 * @return	string	Title text 
 */	
	function getTitle() {
		if(titleField.size() > 1) {
			// As multiple title fields have been defined, concatenate them.
			title = '';
			i = 0;
			titleField.each(function() {
				if(i > 0 && title.length > 0 && this.value.length > 0) {
					title += '_';
				}
				title += this.value;
				i++;
			});
		} else {
			title = titleField.val();
		}
		
		return title;
	}
};	
