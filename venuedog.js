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

    events_url = build_events_url(src, settings);

    /* Initialize Events by Day display */
    if(settings.list_by == "day"){
      list = load_week(src, events_url, event_wrapper, settings, selector);
    }

  };



  /* Events Grouped by Day */
  var load_week = function(src, events_url, event_wrapper, settings, selector) {

    /* Get Data from VenueDog.com */
    $.getJSON(events_url + "&callback=?", function(data){
      tmp = '<ul>';

      $.each(data, function(the_date, group){
        day = new Date(the_date);
        tmp += "<li>" + day.addHours(24).toString("ddd, MMM d, yyyy") + "<ul>";

        $.each(group, function(j, ev){
            event_url = src + "events/" + ev.id;
            event_link = '<a href="'+ event_url + '" target="_blank">' + ev.name +'</a>';
            event_time = new Date(ev.start_time);
            out = event_link + " @ " + ev.venue_name + " (" + event_time.toString("h:mm tt") + ")";
            tmp += "<li>" + out + "</li>";
        });
        tmp += "</ul></li>";
      });

      tmp += '<li class="cron"><a class="prev_events" href="#previous">Previous</a>&nbsp;<a class="next_events" href="#next">Next</a></li>';
      tmp += '</ul>';

      $(event_wrapper).hide().html(tmp).fadeIn('slow');


      /* Bind next and previous buttons to actions */
      $(selector + ' a.next_events').click( function(e){
        e.preventDefault();
        t0 = new Date(settings.start_date);
        t0.setDate(t0.getDate() + 7);
        t1 = new Date(settings.end_date);
        t1.setDate(t1.getDate() + 7);
        sd = t0.getFullYear() + "-" + (t0.getMonth() + 1) + "-" + t0.getDate();
        ed = t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate();
        settings.start_date = t0;
        settings.end_date = t1;
        new_events_url = build_events_url(src, settings);

        load_week(src, new_events_url, event_wrapper, settings, selector);
      });
      $(selector + ' a.prev_events').click( function(e){
        e.preventDefault();
        t0 = new Date(settings.start_date);
        t0.setDate(t0.getDate() - 7);
        t1 = new Date(settings.end_date);
        t1.setDate(t1.getDate() - 7);
        sd = t0.getFullYear() + "-" + (t0.getMonth() + 1) + "-" + t0.getDate();
        ed = t1.getFullYear() + "-" + (t1.getMonth() + 1) + "-" + t1.getDate();
        settings.start_date = t0;
        settings.end_date = t1;
        new_events_url = build_events_url(src, settings);

        load_week(src, new_events_url, event_wrapper, settings, selector);
      });

    });
  }



  /* Build API query string from date data */
  var build_events_url = function(src, settings){
    var query = [];
    $.each(settings, function(key, val){
      query.push("&" + key + "=" + val);  
    });
    events_url = src + "woof/events/show_by_date?" + query.join("");
    return events_url;
  }




})( jQuery );
