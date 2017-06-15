$(document).ready(function() {
	// set focus on search box
	$('#query').focus();

	// call search_wikipedia() on either button click or user hitting 'enter'
	$('#search-btn').on('click', search_wikipedia);

	$(document).keypress(function(e) {
		if(e.which === 13)
			search_wikipedia();
	});
});

function search_wikipedia() {
	// clear previous results
	$('a').remove();
  

	var query_term = $('#query').val();
	console.log(query_term);
	$.ajax({
		url: 'https://en.wikipedia.org/w/api.php',
		dataType: 'jsonp',
		data: {
			action: 'opensearch',
			search: query_term,
			format: 'json'
		},
		success: function(response) {
			$('#query_reminder').text('You searched on: "' + query_term + '"');
      for(var i=0;i<response[1].length;i++){
        var wiki_article = document.createElement('div');
        wiki_article.className = 'wiki-article';
        
        var wiki_link = document.createElement('a');
        wiki_link.setAttribute('href', response[3][i]);
        wiki_link.setAttribute('target', '_blank');
				wiki_link.appendChild(wiki_article);
        
        var title = document.createElement('h4');
        var title_text = document.createTextNode(response[1][i]);
        title.appendChild(title_text);
        wiki_article.appendChild(title);
        
        
       var summary = document.createElement('p');
				var summary_text = document.createTextNode(response[2][i]);
				summary.appendChild(summary_text);
				wiki_article.appendChild(summary);

  document.body.appendChild(wiki_link);
        
      };
     // clear search field from previous search
			$('#query').val('');

			// focus out of search field
			$('#query').blur();
			//console.log(response);
      
      },
	});	
}
