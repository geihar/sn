(function(){
  var jquery_version = '3.3.1';
  var site_url = 'https://77b81905.ngrok.io/';
  var static_url = site_url + 'static/';
  var min_width = 100;
  var min_height = 100;

  function bookmarklet(msg) {
    // load CSS
    var css = $('<link>');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random()*99999999999999999999)
    });
    $('head').append(css);

    // load HTML
    box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a><h1>Select an image to bookmark:</h1><div class="images"></div></div>';
    $('body').append(box_html);

    // close event
    $('#bookmarklet #close').click(function(){
       $('#bookmarklet').remove();
    });

    // find images and display them
    $.each($('img[src$="jpg"]'), function(index, image) {
      if ($(image).width() >= min_width && $(image).height() >= min_height)
      {
        image_url = $(image).attr('src');
        $('#bookmarklet .images').append('<a href="#"><img src="'+ image_url +'" /></a>');
      }
    });

    // when an image is selected open URL with it
    $('#bookmarklet .images a').click(function(e){
      selected_image = $(this).children('img').attr('src');
      // hide bookmarklet
      $('#bookmarklet').hide();
      // open new window to submit the image
      window.open(site_url +'images/create/?url='
                  + encodeURIComponent(selected_image)
                  + '&title='
                  + encodeURIComponent($('title').text()),
                  '_blank');
    });
  }

  // Check if jQuery is loaded
  if(typeof window.$ != 'undefined') {
    bookmarklet();
  } else {
    // Check for conflicts
    var conflict = typeof window.$ != 'undefined';
    // Create the script and point to Google API
    var script = document.createElement('script');
    script.src = '//ajax.googleapis.com/ajax/libs/jquery/' +
      jquery_version + '/jquery.min.js';
    // Add the script to the 'head' for processing
    document.head.appendChild(script);
    // Create a way to wait until script loading
    var attempts = 15;
    (function(){
      // Check again if jQuery is undefined
      if(typeof window.$ == 'undefined') {
        if(--attempts > 0) {
          // Calls himself in a few milliseconds
          window.setTimeout(arguments.callee, 250)
        } else {
          // Too much attempts to load, send error
          alert('An error ocurred while loading jQuery')
        }
      } else {
          bookmarklet();
      }
    })();
  }
})()