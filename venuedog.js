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
    
    var settings = $.extend({
        'categories' : "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
        'paginate'   : "7",
        'list_by'    :  "day",
        'src'        :  "http://venuedog.com/",
        'selector'   : this.selector
    }, args);

    settings.start_date = Date.today();
    settings.end_date   = Date.today().add(parseInt(settings.paginate)).days();

    var list = '';
    settings.events_url = build_events_url(settings);

    /* Initialize events display based on list_by */
    if(settings.list_by == "day"){
      list = load_week(settings);
    }
    else if(settings.list_by == "day_scroll"){

      settings.ajax_loading = true;
      window.vdog_settings = settings;
      list = load_scroll(settings);
 
      setInterval( function(){ check_scroll();}, 500 );

    }


  };







  /* Events Grouped by Day */
  var load_week = function( settings ) {

    /* Get Data from VenueDog.com */
    $.getJSON(settings.events_url + "&callback=?", function(data){
      tmp = '<ul>';

      $.each(data, function(the_date, group){
        day = new Date( Date.parse(the_date));
        tmp += '<li class="day">' + day.toString("ddd, MMM d, yyyy") + "<ul>";

        $.each(group, function(j, ev){
            event_url = settings.src + "events/" + ev.id;
            event_link = '<a href="'+ event_url + '" target="_blank">' + ev.name +'</a>';
            event_time = new Date( Date.parse( ev.start_time.replace('Z', '') ));
            out = event_link + " @ " + ev.venue_name + " (" + event_time.toString("h:mm tt") + ")";
            tmp += "<li>" + out + "</li>";
        });
        tmp += "</ul></li>";
      });

      tmp += '<li class="cron"><a class="prev_events" href="#previous">Previous</a>&nbsp;<a class="next_events" href="#next">Next</a></li>';
      tmp += '</ul>';

      $(settings.selector).hide().html(tmp).fadeIn('slow');


      /* Bind next and previous buttons to actions */
      $(settings.selector + ' a.next_events').click( function(e){
        e.preventDefault();

        settings.start_date = settings.start_date.add(parseInt(settings.paginate)).days();
        settings.end_date   = settings.end_date.add(parseInt(settings.paginate)).days();
        settings.events_url = build_events_url(settings);

        load_week( settings );
      });
      $(settings.selector + ' a.prev_events').click( function(e){
        e.preventDefault();

        settings.start_date = settings.start_date.add(parseInt(settings.paginate) * -1).days();
        settings.end_date   = settings.end_date.add(parseInt(settings.paginate) * -1).days();
        settings.events_url = build_events_url(settings);

        load_week( settings );
      });

    });
  }



  /* Build API query string from date data */
  var build_events_url = function(settings){
    var query = [];
    $.each(settings, function(key, val){
      query.push("&" + key + "=" + val);  
    });
    events_url = settings.src + "woof/events/show_by_date?" + "start_date=" + settings.start_date.toString("yyyy-M-d") +
                 "&end_date=" + settings.end_date.toString("yyyy-M-d") + "&categories=" + settings.categories;
    return encodeURI(events_url);
  }





 /**
  *  Calls events append methos if user has 
  *  scrolled to bottom of page
  */
  var check_scroll = function(){
    var contentHeight = $(vdog_settings.selector).height();
    var pageHeight = document.documentElement.clientHeight;  
    var scrollPosition; 


    if(navigator.appName == "Microsoft Internet Explorer") {
      scrollPosition = document.documentElement.scrollTop; 
    }
    else {
      scrollPosition = window.pageYOffset;
    }

    if(( contentHeight - pageHeight - scrollPosition) < 100){ 
      if(vdog_settings.ajax_loading == false){
        vdog_settings.start_date = vdog_settings.start_date.add(parseInt(vdog_settings.paginate)).days();
        vdog_settings.end_date   = vdog_settings.end_date.add(parseInt(vdog_settings.paginate)).days();
        vdog_settings.events_url = build_events_url(vdog_settings);
        load_scroll(vdog_settings);
      }
    }
  }


  /* Infinite Scroll of Events by Day */
  var load_scroll = function(settings){
    vdog_settings.ajax_loading = true;
    /* Get Data from VenueDog.com */
    $.getJSON(settings.events_url + "&callback=?", function(data){
      tmp = '<ul>';

      $.each(data, function(the_date, group){
        day = new Date( Date.parse(the_date));
        tmp += '<li class="day">' + day.toString("ddd, MMM d, yyyy") + "<ul>";

        $.each(group, function(j, ev){
            event_url = settings.src + "events/" + ev.id;
            event_link = '<a href="'+ event_url + '" target="_blank">' + ev.name +'</a>';
            event_time = new Date( Date.parse( ev.start_time.replace('Z', '') ));
            out = event_link + " @ " + ev.venue_name + " (" + event_time.toString("h:mm tt") + ")";
            tmp += "<li>" + out + "</li>";
        });
        tmp += "</ul></li>";
      });
      tmp += '</ul>';

      $(settings.selector).append(tmp).fadeIn('slow');

      vdog_settings.ajax_loading = false;
    });
    
    
  }




  function scroll(){
    if(navigator.appName == "Microsoft Internet Explorer"){
      scrollPosition = document.documentElement.scrollTop;
    }
    else{
      scrollPosition = window.pageYOffset;
    }
  }





})( jQuery );
