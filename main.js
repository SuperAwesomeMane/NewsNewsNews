$(document).ready(function() {

    var links;

    $.ajax({
        url: 'nav.json',
        dataType: 'json',
        success: function(resp) {
            links = resp.links;

            var html = [];
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                var $li =
                    $("<li><a /><ul class='subLinks" + (i + 1) + "' id='subContainer" + (i + 1) + "'></ul></li>")
                    .find("a").html(link.title)
                    .attr({
                        "title": link.title,
                        "href": link.href,
                        "id": link.id,
                        "tabColor": link.tabColor
                    })
                    .end();
                html.push($li);
            }
            $("#container").append(html);
            getSubLinks();

        },
        error: function(req, status, err) {
            console.log('something went wrong', status, err);
        }
    });

    function getSubLinks() {
        for (var i = 2; i < links.length; i++) {
            var subHtml = [];

            for (var j = 0; j < links[i].subsetLinks.length; j++) {

                var subLink = links[i].subsetLinks[j];
                var $subLi = $("<li><a /></li>").find("a")
                    .html(subLink.title)
                    .attr({
                        "title": subLink.title,
                        "href": subLink.href
                            // "target": "_blank"
                    })
                    .end();
                subHtml.push($subLi);
            }
            $("#subContainer" + (i + 1)).append(subHtml);
        }

        loadJquery();
    };

    function loadJquery() {
        $("#subContainer3").hide();

        $("#link3").on("mouseover", function() {
            $("#subContainer3").slideToggle("fast");
        });

        $("#subContainer3").on("mouseleave", function() {
            $("#subContainer3").slideToggle("fast");
        });
    };

    // SLIDESHOW FUNCTION ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    (function($) {
        "use strict";
        var slideshow = (function() {
            var counter = 0,
                i,
                j,
                slides = $("#slideshow .slide"),
                slides2 = $("#slideshow .slide2"),
                slides3 = $("#slideshow .slide3" ),
                slidesLen2 = slides2.length - 1,
                slidesLen = slides.length - 1,
                slideLen = slides3.length - 1;
            for (i = 0, j = 100; i < slides.length; i += 1, j -= 1) {
                $(slides[i]).css("z-index", j);
                $(slides2[i]).css("z-index", j);
                $(slides3[i]).css("z-index", j);
            }
            return {
                startSlideshow: function() {
                    window.setInterval(function() {
                        if (counter === 0) {
                            slides.eq(counter).fadeOut();
                            slides2.eq(counter).fadeOut();
                            slides3.eq(counter).fadeOut();
                            counter += 1;
                        } else if (counter === slidesLen) {
                            counter = 0;
                            slides.eq(counter).fadeIn(function() {
                                slides.fadeIn();
                                slides2.fadeIn();
                                slides3.fadeIn();
                            });
                        } else {
                            slides.eq(counter).fadeOut();
                            slides2.eq(counter).fadeOut();
                            slides3.eq(counter).fadeOut();
                            counter += 1;
                        }
                    }, 5000);
                }
            };
        }());
        slideshow.startSlideshow();
    }(jQuery));

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

});
