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


    /* Override defaults with arguments and convert to query string*/
    var t0 = new Date();
    var t1 = new Date();
    t1.setDate(t1.getDate() + 7);
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

    var events_url = "http://venuedog.com/woof/events/show_by_date?" + query.join("");



    /* Get Data from VenueDog.com */
    $.getJSON(events_url + "&callback=?", function(data){

      list += '<ul>';
      $.each(data, function(i, group){
        

        /* Events Grouped by Day */
        if(settings.list_by == "day"){
          list += "<li>" + "DATE" + "<ul>";
          $.each(group, function(j, ev){
            out = ev.name + " @ " + ev.venue_name + " (" + ev.start_time + ")";
            list += "<li>" + out + "</li>";
          });
          list += "</ul></li>";
        }



      });
      list += '</ul>';

      $(event_wrapper).html(list);
    });

  };
})( jQuery );
