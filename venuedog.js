/*!
 *  VenueDog JavaScript Library v1.0.0
 *
 *  @copyright 2012, VenueDog LLC
 *  @author SAI Digital
 *  @license GPL 2
 */
(function( $ ) {


  $.fn.venuedog = function(args) {

    var event_wrapper = $(this);
    var selector = this.selector;


    /* Override defaults with arguments and convert to query string*/
    var t0 = new Date();
    var t1 = new Date();
    t1.setDate(t1.getDate() + 7);
    var src = "http://venuedog.com/";
    var list = '';

    var settings = $.extend({
      'start_date' : t0.getFullYear() + "-" + (t0.getMonth() + 1) + "-" + t0.getDate(),
      'end_date'   : t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate(),
      'categories' : "1,2,4,7",
      'list_by'    :  "day"
    }, args);

    var query = [];
    $.each(settings, function(key, val){
      query.push("&" + key + "=" + val);  
    });
    var events_url = src + "woof/events/show_by_date?" + query.join("");


    /* Initialize Events by Day display */
    if(settings.list_by == "day"){
      list = get_week(src, events_url, event_wrapper);

      /* Bind next and previous buttons to actions */
      $(selector + " a.next_events").click( function(e){
        e.preventDefault();
        show_week();
      });
    }


  };



  /* Events Grouped by Day */
  var get_week = function(src, events_url, event_wrapper) {

    /* Get Data from VenueDog.com */
    $.getJSON(events_url + "&callback=?", function(data){
      tmp = '<ul>';

      $.each(data, function(the_date, group){
        day = new Date(the_date);
        tmp += "<li>" + day.toLocaleDateString() + "<ul>";

        $.each(group, function(j, ev){
            event_url = src + "events/" + ev.id;
            event_link = '<a href="'+ event_url + '" target="_blank">' + ev.name +'</a>';
            out = event_link + " @ " + ev.venue_name + " (" + ev.start_time + ")";
            tmp += "<li>" + out + "</li>";
        });
        tmp += "</ul></li>";
      });

      tmp += '<li><a class="next_events" href="#next">Next</a></li>';
      tmp += '</ul>';

      $(event_wrapper).html(tmp);
    });

  }



})( jQuery );
