(function($) {

  // BLOG POSTS
  // -------------------------------------------------------------------------------------------------------------------
  $(document).on( 'click tap', '#load-more', function( event ) {
    event.preventDefault();

    // Define Posts Per Page
    var posts_per_page = $(this).data('ppp');

    // Define Category
    var posts_category = $(this).data('category');

    // Define Search Results
    var posts_search_results = $(this).data('search');

    // Define Type Results
    var posts_type_results = $(this).data('type');

    // Define Archive Results
    var posts_archive_year      = $(this).data('year');
    var posts_archive_monthnum  = $(this).data('monthnum');

    // Container
    var $container = $(this).prev();

    // Define Offset
    var posts_offset = $container.find('.item').length;

    // Define Original Text
    var load_more_btn_text = $(this).data('title');

    // Run Ajax call
    var request = $.ajax({
      url      : ajaxPagination.ajaxUrl,
      type     : 'post',
      dataType : "json",
      cache    : false,
      context  : this,
      data : {
        'ppp'       : posts_per_page,
        'cat'       : posts_category,
        'search'    : posts_search_results,
        'year'      : posts_archive_year,
        'monthnum'  : posts_archive_monthnum,
        'type'      : posts_type_results,
        'offset'    : posts_offset,
        'action'    : 'load_more_pagination',
        'security'  : ajaxPagination.protection
      },
      beforeSend : function( xhr ) {
        $(this).text('Loading...');
      }
    });

    request.fail(function( jqXHR, textStatus ) {
      $('<p class="text-center">Error. Please refresh page and try again.</p>' ).insertAfter($(this));
      // Change AJAX button text
      $(this).text(load_more_btn_text);
    });

    request.done(function( result ){

      //console.log(result.data);

      // Check if we have items to add
      if( result.data.count > 0 ){

        // Change AJAX button text
        $(this).text(load_more_btn_text);

        // Append NEW elements
        var $newElements = $(result.data.html).css({ opacity: 0 });
        $container.append($newElements.animate({ opacity: 1 }, 600));
      }

      // Remove Load More button if no posts
      if ( result.data.isLastPage === true ){
        $(this).remove();
      }

    });

    return false;

  });

}(jQuery));