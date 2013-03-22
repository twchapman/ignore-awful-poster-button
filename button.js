ignored = ""

function is_ignored(author) {
	for (var i = ignored.length - 1; i >= 0; i--) {
		if(author === ignored[i]) return true;
	}
	return false;
}

function add_ignored(author_) {
	chrome.extension.sendMessage({method: "add", author: author_.attr('id')}, function(response) {
	})
}

function show_post(post) {
	console.log(post)
	console.log('#' + post.attr('id'))
	$('#' + post.attr('id')).find('.post-body').show()
}

chrome.extension.sendMessage({method: "get_list"}, function(response) {
	ignored = response.list.replace(' ', '').split(',')

	$('.post').each(function( index ) {
		var author = $(this).find('.post-author').text()
		if (is_ignored(author)) {
			$(this).find('.post-body').hide()
			$(this).find('.post-footer').html('<em>This user is on your ignore list.</em> ' + '<a href="#' + $(this).attr('id') + '" id="' + $(this).attr('id') + '"style="text-decoration:underline;">Show Post</a>')
			$(this).find('a#' + $(this).attr('id')).click(function(show){
				show_post($(this))
			})
		} else {
			$(this).find('.star-container').append('<a href="#' + $(this).attr('id') + '" style="text-decoration:underline;" id="' + author + '">Ignore</a>')
			$('#' + author).click(function(ignore) {
				add_ignored($(this))
				$(this).parent().parent().parent().find('.post-body').hide()
				$(this).parent().parent().parent().find('.post-footer').html('<em>This user is on your ignore list.</em> ' + '<a href="#' + $(this).attr('id') + '" style="text-decoration:underline;">Show Post</a>')
			})
		}
	})
})