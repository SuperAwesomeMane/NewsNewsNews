$(document).ready(function() {
    var FEED_URL = "http://www.internetnews.com/icom_includes/feeds/inews/xml_front-10.xml";

        $.ajax({
            url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(FEED_URL),
            dataType: 'json',
            success: function(data) {
                if (data.responseData.feed && data.responseData.feed.entries) {
                    $.each(data.responseData.feed.entries, function(i, e) {
                        $("#rssFeeds").append("------------------------" + "<br/>");
                        $("#rssFeeds").append("Title      : " + e.title + "<br/>");
                        $("#rssFeeds").append("Link     : " + e.link + "<br/>");
                    });
                }
            }
        });
});
