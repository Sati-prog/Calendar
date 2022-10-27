"use script";

function renderDate(lang) {

    dt.setDate(1);

    var e = dt.getDay(), 
        t = new Date, 
        o = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate(), 
        n = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();

    if (e > 0) {

        e = e - 1;
    }

    if (lang == 'ru') document.getElementById("month").innerHTML = [

        "Январь", 
        "Февраль", 
        "Март", 
        "Апрель", 
        "Май", 
        "Июнь", 
        "Июль", 
        "Август", 
        "Сентябрь", 
        "Октябрь", 
        "Ноябрь", 
        "Декабь"][dt.getMonth()] + " " + dt.getFullYear() + " г.";

    if (lang == 'kz') document.getElementById("month").innerHTML = [

        "ТљР°ТЈС‚Р°СЂ", 
        "РђТ›РїР°РЅ", 
        "РќР°СѓСЂС‹Р·", 
        "РЎУ™СѓiСЂ", 
        "РњР°РјС‹СЂ", 
        "РњР°СѓСЃС‹Рј", 
        "РЁiР»РґРµ", 
        "РўР°РјС‹Р·", 
        "ТљС‹СЂРєТЇР№РµРє", 
        "ТљР°Р·Р°РЅ", 
        "ТљР°СЂР°С€Р°", 
        "Р–РµР»С‚РѕТ›СЃР°РЅ"][dt.getMonth()] + ", " + dt.getFullYear() + " Рі.";

    if (lang == 'en') document.getElementById("month").innerHTML = [

        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"][dt.getMonth()] + ", " + dt.getFullYear() + " Рі.";
    
    var a = "";

    for (x = e; x > 0; x--) a += "<div class='prev_date' data-date='" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + (n - x + 1) + "'>" + (n - x + 1) + "</div>";

    for (i = 1; i <= o; i++) {

        console.log(e);

        i == t.getDate() && dt.getMonth() == t.getMonth() 
            ? a += "<div class='today' data-date='" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + i + "'>" + i + "</div>" 
            : a += "<div class='active_date' data-date='" + dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + i + "'>" + i + "</div>"; 
    } 

    document.getElementsByClassName("days")[0].innerHTML = a;

    
    $.ajax({

        type: "GET",
        url: '/wp-content/themes/e-tutor/ajaxrequests/getAllCalendarEvents.php',
        data: {

            date: dt.getFullYear() + "-" + (dt.getMonth() + 1)
        },
        success: function(request) {

            $(".active_date").remove();
            $(".today").remove();
            
            $(".days").append(request);

            $(".active_date").click(function() {

                $(".active_date").removeClass("active_date--click");
                $(this).addClass("active_date--click");
                $.ajax({

                    type: "GET",
                    url: '/wp-content/themes/e-tutor/ajaxrequests/getCalendarEvents.php',
                    data: {

                        date: $(this).data("date"),
                        lang: lang
                    },
                    success: function(request){

                        var requestmas = request.split('-');
                        var now = new Date();
                        var month = now.getMonth() + 1;

                        month = String(month).padStart(2, '0');
                
                        
                        if (now.getFullYear() > requestmas[0]) {

                            var baseUrl = window.location.protocol + "//" + window.location.host + '/category/meropriyatiya/arhiv-meropriyatij/';

                        } else {

                            if (month > requestmas[1]) {

                                var baseUrl = window.location.protocol + "//" + window.location.host + '/category/meropriyatiya/arhiv-meropriyatij/';

                            } else {

                                if (now.getDate() > requestmas[2]) {

                                    var baseUrl = window.location.protocol + "//" + window.location.host + '/category/meropriyatiya/arhiv-meropriyatij/';
                                } else {

                                    var baseUrl = window.location.protocol + "//" + window.location.host + '/category/meropriyatiya/';
                                }
                            }
                        }

                        //var baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
                        var newUrl = baseUrl + '?request=' + request;
                        //history.pushState(null, null, newUrl);
                        location.href = newUrl;
                    }
                });
            });
        }
    });
}

function moveDate(e, lang) {

    "prev" == e 
        ? dt.setMonth(dt.getMonth() - 1) 
        : "next" == e && dt.setMonth(dt.getMonth() + 1), renderDate(lang);
}

var dt = new Date;