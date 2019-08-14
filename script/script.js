$(document).ready(function () {
    var path = document.location.pathname; // получаем путь хтмл файла
    var userName = $('.login_userName');
    var personalName = $('.personal_text');
    var content = $('.wrapper'); //получаем переменную контента
    var menu = $(".nav-menu");
    var adminli = $(".nav-menu_link:eq(4)");
    var indexli = $(".nav-menu_link:eq(0)");
    var pollsli = $(".nav-menu_link:eq(1)");
    var taxili = $(".nav-menu_link:eq(3)");
    var breakli = $(".nav-menu_link:eq(2)");
    var h_su = $(".useful_info-h_su");
    var su_wrap = $(".useful_info-copy_wrapper_su");
    var message = $(".message");

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/check_login.php",
        success: function (respons) {
            var access = respons["access"];
            localStorage.setItem('team', respons['team']);
            localStorage.setItem('access', access); // передаем уровень допуска в файл _personal js чтобы построить правильно сетку кпэ
            if (respons == 0) {
                if (path.toLowerCase() != '/break/pages/login.html') {
                    location.href = "/break/pages/login.html"; // проверяем надо ли нам перенаправлять на страницу логина
                } else {
                    $(".login_deny").css("display", "block");
                    $(".login").css("display", "flex");
                }
            } else {
                if (path.toLowerCase() == '/break/pages/login.html') {
                    location.href = "/break/index.html";
                }
                if ((respons["access"] == 1 || respons["access"] == 3 || respons["access"] == 4) && (path.toLowerCase() == '/break/pages/admin.html' || path.toLowerCase() == '/break/pages/break.html' || path.toLowerCase() == '/break/pages/taxi.html')) {
                    alert("Какой хитрец! Я внес тебя в черный список " + respons["name"]);
                    location.href = "/break/pages/personal.html";
                } else if (respons["access"] == 1 || respons["access"] == 3 || respons["access"] == 4) {
                    adminli.remove();
                    taxili.remove();
                    breakli.remove();
                    if ((respons["access"] == 1 || respons["access"] == 4) && respons["name"] != " Татьяна, Мамчур") {
                        h_su.remove();
                        su_wrap.remove();
                    }
                } else
                    if (respons["access"] == 5) {
                        adminli.remove();
                        message.remove();
                    }
                if (respons["access"] == 3) {
                    $(".break-list").eq(1).hide();
                }
                menu.css("display", "flex");
                $(".login_success").css("display", "flex");
                $(".login").css("display", "flex");
                content.css('visibility', 'visible'); //если логин и пароль ок - показываем контент
                $('.smoaft').css('display', 'inline-block');
                $('.smobef').css('display', 'inline-block');
                userName.text(respons["name"]);
                $(".login_avatar").attr("src", "/break/image/avatars/" + respons["photo"]);
                if (path.toLowerCase() == "/break/pages/personal.html") {
                    $(".personal_avatar").attr("src", "/break/image/avatars/" + respons["photo"]);
                    personalName[0].append(respons["name"]);
                    personalName[1].append(respons["login"]);
                }
                $.ajax({
                    type: "POST",
                    url: "/break/modules/get_break.php",
                    dataType: "json",
                    success: function (respons) {
                        if (respons != "error 1") {
                            var app = "<div class='break_down'><div class='break_down-item break_down-item_sv'>" + respons[0]['sv'] + "<span> Кто на паузах?</span></div>";
                            for (var i = 0; i < respons.length; i++) {
                                if (respons[i]['time'] != undefined) {
                                    app = app + "<div class='break_down-item'>" + respons[i]['time'] + "</div>"
                                }
                            }
                            app = app + "</div>";
                            $("body").append(app);
                        }
                    }
                });
                //Список топчиков начало
                $.ajax({
                    type: "POST",
                    url: "/break/modules/get_top_list.php",
                    dataType: "json",
                    success: function (respons) {
                        var add_block = "<div class='top_right'><div class='top_right-item top_right-item_opened'><span>TOP за вчера</span></div></div>";
                        $("body").append(add_block);
                        var top_block_item = $('.top_right-item_opened');

                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[0] + ".jpg'></div><div class='topchik_block-text'>" + respons[1] + ": лучший C-SAT за вчера - " + respons[2] + "</div></div>");
                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[3] + ".jpg'></div><div class='topchik_block-text'>" + respons[4] + ": лучший AHT за вчера - " + respons[5] + "</div></div>");
                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[6] + ".jpg'></div><div class='topchik_block-text'>" + respons[7] + ": лучший SR за вчера - " + respons[8] + "</div></div>");
                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[9] + ".jpg'></div><div class='topchik_block-text'>" + respons[10] + ": лучший TSS за вчера - " + respons[11] + "</div></div>");
                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[12] + ".jpg'></div><div class='topchik_block-text'>" + respons[13] + ": лучший %Work за вчера - " + respons[14] + "</div></div>");
                        top_block_item.append("<div class='topchik_block'><div class='topchik_block-photo'><img src='/break/image/avatars/" + respons[15] + ".jpg'></div><div class='topchik_block-text'>" + respons[16] + ": лучший NPS за вчера - " + respons[17] + "</div></div>");



                    }
                });

                //список топчиков конец

            }
        }
    });
    //Кнопка входа начало
    $('.login_buttonIn').click(function () {
        var login = $('#log'), password = $('#pass'), userName = $('.userName'), lock = $('.lock');
        lock.css('display', 'block');
        if (login.val() != '' && password.val() != '') {
            $.ajax({
                type: "POST",
                url: "/break/modules/login.php",
                dataType: "json",
                data: {
                    login: login.val(),
                    password: password.val()
                },
                success: function (respons) {
                    if (respons == 0 || respons == 3 || respons == 4) { // wrong login or password
                        setTimeout(function () {
                            lock.css('display', 'none');
                            $(".login_deny").css('animation', '2s tremor_deny ease-in-out 1');
                        }, 1000);
                    } else {
                        content.css('visibility', 'visible'); //если логин и пароль ок - показываем контент
                        $(".login_deny").css('animation', '2s access ease-out 1');
                        setTimeout(function () {
                            $('.login_deny').css('display', 'none');
                            $('.login_success').css('display', 'flex');
                            userName.text(respons["name"]);
                            lock.css('display', 'none');
                        }, 1000);
                        if (respons["last"] == "0") {

                            var pass1 = prompt("Вы у нас впервые. \n Введите новый пароль.")
                            var pass2 = prompt("Введите пароль повторно.");
                            while (pass1 != pass2 || pass1 === null && pass2 === null) {
                                alert("Пароли не совпадают, попробуйте еще раз.")
                                pass1 = prompt("Введите новый пароль.")
                                pass2 = prompt("Введите пароль повторно.");
                            }
                            $.ajax({
                                type: "POST",
                                url: "/break/modules/change_password.php",
                                dataType: "json",
                                data: {
                                    password: pass1
                                },
                                success: function (respons) {
                                    if (respons == "ok") {
                                        alert("Пароль успешно изменен!")
                                        location.href = "/break/pages/personal.html";//переход как кнопка "назад"
                                    } else {
                                        alert("Пароль не изменен! Попробуйте повторить попытку. Иначе обратитесь к СВ.")
                                        $.ajax({
                                            type: "POST",
                                            url: "/break/modules/logout.php",
                                            success: function (result) {
                                                location.reload();
                                            }
                                        });
                                        location.href = "/break/pages/login.html";//переход как кнопка "назад"
                                    }
                                }
                            });

                        } else {
                            location.href = "/break/pages/personal.html";//переход как кнопка "назад"

                        }
                    }
                }
            });
        } else if (login.val() == '' || password.val() == '') {
            $(".login_deny").css('animation', '2s tremor_empty ease-out 1');
            lock.css('display', 'none');
        }
        setTimeout(function () { $('.login_deny').css('animation', 'none'); }, 1000);
    })
    //Кнопка входа конец
    //Кнопка выхода начало
    $('.login_buttonOut').click(function () {
        $.ajax({
            type: "POST",
            url: "/break/modules/logout.php",
            success: function (result) {
                location.reload();
            }
        });
    })
    function online() {
        $.ajax({
            type: "POST",
            url: "/break/modules/chek_session.php",
            success: function (result) {
                location.reload(true);
            }
        });
    }
    setTimeout(online, 300000);
    $.ajax({
        type: "POST",
        url: "/break/modules/chek_session.php",
        dataType: "json",
        success: function (result) {
            if (result != "hide") {

                do {
                    var answer = prompt(result[0] + "\n " + result[2]);
                } while (answer != result[1]);
                if (answer == result[1]) {
                    $.ajax({
                        type: "POST",
                        url: "/break/modules/read_message.php",
                        success: function (result) {
                            location.reload(true);
                        }
                    });
                }

            }
        }
    });
});
$(".nav-menu_small-active").hover(
    function () {
        $(".login").css("background-color", "#95ff52");
        $(".header_main").css("color", "black");
    }, function () {
        $(".login").css("background-color", "#3a4750");
        $(".header_main").css("color", "white");
    }
);
function thisarcticle(news) {
    $(".lock").css('display', 'block');
    $("body").append("<div class='iframewrapper'><iframe src='/break/pages/news/" + news + "' class='news-page'></iframe></div>");
    $(".iframewrapper").append("<button class='close'>Close</button>");
}
$(function () {
    $("body").on("click", "button.close", function () {
        $(".iframewrapper").remove();
        $(".lock").css('display', 'none');
    });
});
function discard() {
    $(".lock").css("display", "none");
    $(".personal_download-form").css("display", "none");
}
