# JavaScript API Wrapper for VenueDog Events API 
Find Local Events @ [VenueDog](http://venuedog.com/)

# Requirements

* Include jQuery
* Include Date.js
* Include venuedog.js

# Example Use


```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>
<script src="/date.js"></script>
<script src="venuedog.js"></script>


<script>
  $(document).ready(function(){
    $('.events').venuedog({
      'categories' : "1,2,3,4", 
      'paginate' : 7
    });
  });
</script>
```


# See in action

* Checkout the WordPress [VenueDog-Events Plugin](http://wordpress.org/extend/plugins/venuedog-events/)
* Use it in real time at the [VenueDog Blog](http://blog.venuedog.com/)
