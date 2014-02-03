$(document).ready(function() {
	
	// Set some defaults.
	if(typeof document.titleField === 'undefined') {
		document.titleField = "input[name$='[title]'],input[name$='[name]']";
	}
	if(typeof document.slugField === 'undefined') {
		document.slugField = "input[name*='slug']";
	}

	// Do nothing if the title and slug fields aren't present.
	if(!$(document.slugField).length || !$(document.titleField).length) {
		return;
	}

	var hasEdited = false;

	// If there's a slug already present, and it looks different to what would have been generated from the current title, show that the slug has already been manually edited.
	if($(document.slugField).attr('value') !== '' && slugify(getTitle()) !== $(document.slugField).attr('value')) {
		hasEdited = true;
	} else {
		hasEdited = false;
		$(document.slugField).addClass('has_suggested_slug');
	}
	
	// Generate the slug automatically as soon as the script loads, as the 'title' field may have been prepopulated with a value.
	populateSlugField($(document.titleField));

	// Generate a new slug each time the title has been edited. 
	$(document.titleField).bind('keyup change', function() {
		populateSlugField();
	});

	// Check for a manual override of the generated slug. Once the slug has been manually overridden, automatic slug generation should stop. 
	$(document.slugField).bind('input', function() {
		if(!hasEdited) {
			console.log('slug field has been edited');
			hasEdited = true;
			$(this).removeClass('has_suggested_slug');
		}
	});

/**
 * Populates the 'slug' field with a URL-safe version of the 'title' field.
 */
	function populateSlugField() {
		if(!hasEdited && $(document.titleField).length > 0) {
			slug = slugify(getTitle());
			$(document.slugField).val(slug);
		}

		// Show or hide the slug length warning according to whether or not it's too long.
		if($(document.slugField).val().length > 64) {
			$('#slug_length_warning').show();
		} else {
			$('#slug_length_warning').hide();
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
			.replace(/\s+(-)?(\s+)?/g, '_')
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
			.replace(/[\/:\-]/g, '_')
			// In what's left, remove anything that isn't URL-safe.
			.replace(/[^a-z0-9_\-]/g, '')
			// Avoid multiple underscores from the above replacements.
			.replace(/[_]+/g, '_')
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
		if($(document.titleField).size() > 1) {
			// As multiple title fields have been defined, concatenate them.
			title = '';
			i = 0;
			$(document.titleField).each(function() {
				if(i > 0 && title.length > 0 && this.value.length > 0) {
					title += '_';
				}
				title += this.value;
				i++;
			});
		} else {
			title = $(document.titleField).val();
		}
		
		return title;
	}
});
