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

        $("#link3").on("click", function() {
            $("#subContainer3").slideToggle("fast");
            // $(".pageTitle").toggle("fast");
        });
    }
});
