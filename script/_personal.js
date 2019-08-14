$(document).ready(function () {
    var car_num_block = $(".personal_order-carnum");
    var car_place = $(".personal_order_place");
    var now = new Date();
    var hours = now.getHours();
    $(".break-interval_item").eq(hours - 8).trigger("click");
    $(".useful_info-h_su").trigger("click");
    $(".kpi_other").trigger("click");
    // GET CAR NUM, AND PLACE TAXI START
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/get_carnum.php",
        success: function (respons) {
            if (respons[0]["time"] !== null) {
                var taxi = $(".personal_order_taxi-form");
                $(".personal_order_h").remove();
                $(".personal_order_taxiTime").remove();
                $(".personal_order_submit").remove();
                $(".personal_order_select").remove();
                $(".personal_order_street").remove();
                $(".personal_order_not_me").remove();
                if (respons[0]["time"] !== "") {
                    var app = "<p>Вы едите по этому адресу:</p>\
<p>Район: <span class='taxi_table_adress'>"+ respons[0]['area'] + "</span></p>\
<p>Адрес: <span class='taxi_table_adress'>"+ respons[0]['street'] + "</span></p>\
<p>Время: <span class='taxi_table_adress'>"+ respons[0]['time'] + "</span></p>\
";
                    taxi.append(app);

                } else {
                    var app = "<p>В такой дивный вечер, вы приняли взвешенное решение прогуляться до дома.</p>\
";
                    taxi.append(app);
                }
            }
            car_num_block.empty();
            car_num_block.append(respons[0]["car_num"]);

            var app = ""
            if (respons.length >= 5) {
                for (var i = 1; i < 5; i++) {
                    app += '<div class="personal_order_place"><img src="/break/image/avatars/' + respons[i]["photo"] + '" alt="фото" class="personal_order_place_ava" title="' + respons[i]["name"] + '"></div>'
                }
            } else {
                for (var i = 1; i < respons.length; i++) {
                    app += '<div class="personal_order_place"><img src="/break/image/avatars/' + respons[i]["photo"] + '" alt="фото" class="personal_order_place_ava" title="' + respons[i]["name"] + '"></div>'
                }
                for (var y = respons.length; y <= 4; y++) {
                    app += '<div class="personal_order_place"><img src="/break/image/avatars/no-avatar.jpg" alt="фото" class="personal_order_place_ava" title="Это место пока свободно"></div>'
                }
            }
            $(".personal_order-carplace").append(app);
        }

    });
    // GET CRA NUM AND PLACE TAXI END
    // GET INDICATORS
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/get_indicators.php",
        success: function (respons) {
            var ind_wrap = $(".kpi_indi");
            var ind_item = $(".kpi_item");
            var per_text_wrap = $(".personal_text");
            var z = 1;
            if (respons.length == 2) { // смотрим есть ли данные в масиве
                if (respons[1]["id"] == 'date') {
                    z = 0;
                    $(".kpi_date").text(respons[1]["date_of_issue"]); // вставляем дату устройства на работу
                } else {
                    $(".kpi_date").text(respons[0]["date_of_issue"]) // вставляем дату устройства на работу
                }
                //вставляем все показатели по блокам 
                ind_wrap.eq(0).text(respons[z]["klk"].replace(",", ".") * 1 + "%");
                if (respons[z]["klk"].replace(",", ".") >= 90) {
                    ind_item.eq(1).addClass("kpi_ok");
                } else if (respons[z]["klk"].replace(",", ".") < 90 && respons[1]["klk"].replace(",", ".") >= 81) {
                    ind_item.eq(1).addClass("kpi_good");
                } else if (respons[z]["klk"].replace(",", ".") < 81) {
                    ind_item.eq(1).addClass("kpi_bad");
                }

                ind_wrap.eq(1).text(respons[z]["csat"].replace(",", ".") * 1 + "%");
                if (respons[z]["csat"].replace(",", ".") >= 32) {
                    ind_item.eq(2).addClass("kpi_ok");
                } else if (respons[z]["csat"].replace(",", ".") < 32 && respons[1]["csat"].replace(",", ".") >= 30) {
                    ind_item.eq(2).addClass("kpi_good");
                } else if (respons[z]["csat"].replace(",", ".") < 30) {
                    ind_item.eq(2).addClass("kpi_bad");
                }

                ind_wrap.eq(2).text(respons[z]["aht"].replace(",", ".") * 1 + " c");
                if (respons[z]["aht"].replace(",", ".") <= 300) {
                    ind_item.eq(3).addClass("kpi_ok");
                } else if (respons[z]["aht"].replace(",", ".") > 300 && respons[1]["aht"].replace(",", ".") <= 360) {
                    ind_item.eq(3).addClass("kpi_good");
                } else if (respons[z]["aht"].replace(",", ".") > 360) {
                    ind_item.eq(3).addClass("kpi_bad");
                }

                ind_wrap.eq(3).text(respons[z]["sr"].replace(",", ".") * 1 + "%");
                if (respons[z]["sr"].replace(",", ".") >= 62) {
                    ind_item.eq(4).addClass("kpi_ok");
                } else if (respons[z]["sr"].replace(",", ".") < 62 && respons[1]["sr"].replace(",", ".") >= 56) {
                    ind_item.eq(4).addClass("kpi_good");
                } else if (respons[z]["sr"].replace(",", ".") < 56) {
                    ind_item.eq(4).addClass("kpi_bad");
                }

                ind_wrap.eq(6).text(respons[z]["workBreak"].replace(",", ".") * 1 + "%");
                if (respons[z]["workBreak"].replace(",", ".") <= 18) {
                    ind_item.eq(7).addClass("kpi_ok");
                } else if (respons[z]["workBreak"].replace(",", ".") > 18) {
                    ind_item.eq(7).addClass("kpi_bad");
                }

                ind_wrap.eq(7).text(respons[z]["tss"].replace(",", ".") * 1 + "%");
                if (respons[z]["tss"].replace(",", ".") >= 90) {
                    ind_item.eq(8).addClass("kpi_ok");
                } else if (respons[z]["tss"].replace(",", ".") < 90) {
                    ind_item.eq(8).addClass("kpi_bad");
                }

                ind_wrap.eq(8).text(respons[z]["sts"].replace(",", ".") * 1 + "%");
                if (respons[z]["sts"].replace(",", ".") >= 90) {
                    ind_item.eq(9).addClass("kpi_ok");
                } else if (respons[z]["sts"].replace(",", ".") < 90) {
                    ind_item.eq(9).addClass("kpi_bad");
                }

                ind_wrap.eq(9).text(respons[z]["rft"].replace(",", ".") * 1 + "%");
                if (respons[z]["rft"].replace(",", ".") >= 80) {
                    ind_item.eq(10).addClass("kpi_ok");
                } else if (respons[z]["rft"].replace(",", ".") < 80) {
                    ind_item.eq(10).addClass("kpi_bad");
                }

                ind_wrap.eq(10).text(respons[z]["phone"].replace(",", ".") * 1 + "%");
                if (respons[z]["phone"].replace(",", ".") >= 50) {
                    ind_item.eq(11).addClass("kpi_ok");
                } else if (respons[z]["phone"].replace(",", ".") < 50) {
                    ind_item.eq(11).addClass("kpi_bad");
                }

                ind_wrap.eq(11).text(respons[z]["email"].replace(",", ".") * 1 + "%");
                if (respons[z]["email"].replace(",", ".") >= 13) {
                    ind_item.eq(12).addClass("kpi_ok");
                } else if (respons[z]["email"].replace(",", ".") < 13) {
                    ind_item.eq(12).addClass("kpi_bad");
                }

                ind_wrap.eq(12).text(respons[z]["work"].replace(",", ".") * 1 + "%");
                if (respons[z]["work"].replace(",", ".") >= 30) {
                    ind_item.eq(13).addClass("kpi_ok");
                } else if (respons[z]["work"].replace(",", ".") < 30) {
                    ind_item.eq(13).addClass("kpi_bad");
                }

                ind_wrap.eq(13).text(respons[z]["klk_happy"].replace(",", ".") * 1 + "%");
                if (respons[z]["klk_happy"].replace(",", ".") >= 90) {
                    ind_item.eq(14).addClass("kpi_ok");
                } else if (respons[z]["klk_happy"].replace(",", ".") < 90 && respons[1]["klk_happy"].replace(",", ".") >= 85.5) {
                    ind_item.eq(14).addClass("kpi_good");
                } else if (respons[z]["klk_happy"].replace(",", ".") < 85.5) {
                    ind_item.eq(14).addClass("kpi_bad");
                }

                ind_wrap.eq(14).text(respons[z]["nps"].replace(",", ".") * 1 + "%");
                if (respons[z]["nps"].replace(",", ".") >= 32) {
                    ind_item.eq(15).addClass("kpi_ok");
                } else if (respons[z]["nps"].replace(",", ".") < 32) {
                    ind_item.eq(15).addClass("kpi_bad");
                }

                ind_wrap.eq(15).text(respons[z]["reg"].replace(",", ".") * 1 + "%");
                if (respons[z]["reg"].replace(",", ".") >= 95) {
                    ind_item.eq(16).addClass("kpi_ok");
                } else if (respons[z]["reg"].replace(",", ".") < 95) {
                    ind_item.eq(16).addClass("kpi_bad");
                }

                ind_wrap.eq(16).text(respons[z]["sales_coef"].replace(",", ".") * 1);
                if (respons[z]["sales_coef"].replace(",", ".") <= 8) {
                    ind_item.eq(17).addClass("kpi_ok");
                } else if (respons[z]["sales_coef"].replace(",", ".") > 8 && respons[1]["sales_coef"].replace(",", ".") <= 12) {
                    ind_item.eq(17).addClass("kpi_good");
                } else if (respons[z]["sales_coef"].replace(",", ".") > 12) {
                    ind_item.eq(17).addClass("kpi_bad");
                }
                ind_wrap.eq(17).text(respons[z]["time"].replace(",", ".") * 1);
                ind_wrap.eq(18).text(respons[z]["plan_hours"].replace(",", ".") * 1);
                per_text_wrap.eq(2).text(respons[z]["date_of_issue"]);
                $(".personal_callcraft_lvl").text(Math.floor(respons[z]["exp"] / 80));
                $(".personal_callcraft_exp").text(respons[z]["exp"] - Math.floor(respons[z]["exp"] / 80) * 80 + "/80");
                $(".personal_callcraft_rank").text(respons[z]["rank"]);
                var arr_kpi = kpi(respons[z]["klk"], respons[z]["csat"], respons[z]["aht"], respons[z]["sr"], respons[z]["sts"], respons[z]["sales_coef"]);
                if (localStorage.getItem('access') == 4) {
                    ind_item.eq(7).after(ind_item.eq(2));
                    ind_item.eq(7).after(ind_item.eq(3));
                    ind_item.eq(1).after(ind_item.eq(17));
                    ind_item.eq(1).after(ind_item.eq(9));
                    ind_wrap.eq(4).text((arr_kpi["kpi_cross"]) + "%");
                    ind_wrap.eq(5).text(arr_kpi["premiya_cross"]);
                } else {
                    ind_wrap.eq(4).text((arr_kpi["kpi"]) + "%");
                    ind_wrap.eq(5).text(arr_kpi["premiya"]);
                }
            } else {
                $(".kpi_date").text(respons[0]["date_of_issue"])
            }
        },
        error: function (respons) {
            console.log("Не удалось получить данные.");
        }
    });
    //GET INDICATORS END

});
function break_order(btn) {
    var hour = $(".break-interval_active").val();
    var timeButtom = $(btn);
    var amount = timeButtom.parent().find(".break-amount_people").text();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/break_order.php",
        data: {
            time: hour,
            minutes: timeButtom.val(),
        },
        success: function (data) {
            if (data == "Updated") {
                alert("Вы успешно записались");
                timeButtom.parent().find(".break-amount_people").empty().text(amount * 1 - 1);
            } else if (data == "Not updated") {
                alert("Проблемы с соеденением.");
            } else if (data == "Can`t reserv a break") {
                alert("Нельзя записыватся так часто! Раз в 1,5 часа!");

            } else if (data == "Full") {
                alert("К сожалению свободных мест нет:(");
            } else if (data == "Alredy eat") {
                alert("Вы уже ели сегодня! Обжора...");
            }
        }

    });
}
function get_interval(interval) {
    var time = $(interval).val();
    var amount = $(".break-amount_people");
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/break_list.php",
        data: {
            time: time,
        },
        success: function (data) {
            if (data != "Can`t reach a data base") {
                var break_item_list = $(".break-item_list");
                var break_list = $(".break-list");
                var break_list_time = $(".break-list_time");
                var break_intarval_item = $(".break-interval_item");
                var name = $(".login_userName").text();
                break_list_time.eq(0).text(time + ":00");
                break_list_time.eq(1).text(time + ":20");
                break_list_time.eq(2).text(time + ":30");
                break_list_time.eq(3).text(time + ":40");
                break_list_time.eq(4).text(time + ":50");
                break_list.parent().find(".break-alredy").removeClass("break-alredy");
                $(interval).parent().find(".break-interval_active").removeClass("break-interval_active");
                $(interval).addClass("break-interval_active");
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["hours"] == time) {
                        var amount_people = Math.floor(data[i]["amount"] / 8);
                        if (data[i]["amount"] >= 48) {
                            amount_people -= 2;
                        } else if (data[i]["amount"] >= 24 && data[i]["amount"] < 48) {
                            amount_people -= 1;
                        }
                        var count_people = 0;
                        if (Array.isArray(data[i]["peoples"])) {
                            count_people = data[i]["peoples"].length;
                        } else {
                            if (data[i]["peoples"].length > 0) {
                                count_people = 1;
                            } else {
                                count_people = 0;
                            }
                        }
                        if (Math.floor((data[i]["amount"] / 8)) - count_people <= 0) {
                            data[i]["amount"] = count_people * 8;
                            amount_people = count_people;
                        }
                        if (data[i]["minutes"] == 0) {
                            amount.eq(0).text(amount_people - count_people);
                        } else if (data[i]["minutes"] == 20) {
                            amount.eq(1).text(amount_people - count_people);
                        } else if (data[i]["minutes"] == 30) {
                            amount.eq(2).text(amount_people - count_people);
                        } else if (data[i]["minutes"] == 40) {
                            amount.eq(3).text(amount_people - count_people);
                        } else if (data[i]["minutes"] == 50) {
                            amount.eq(4).text(amount_people - count_people);
                        }
                    }
                }
            }
        }


    });
}

function not_me() {
    $.ajax({
        type: "POST",
        url: "/break/modules/taxi_not_order.php",
        success: function (data) {
            result = data.trim();
            if (result == 'ordered') {
                alert("Вы уже записаны на такси или не едете!\nОбратитесь к СВ за помощью!");
            } else if (result == 'error') {
                alert("Что-то пошло не так!\nОбратитесь к СВ за помощью!");
            } else if (result == 'ok') {
                alert("Ну и иди, нам больше места будет!");
            }
        }
    });
}
function copy(text) {
    var val = $(text).attr("value");
    var app = "";
    var $temp = $("<textarea>");
    var copi = $(".copied");
    $("body").append($temp);
    if (val == 1) {
        app = "За 1 грн. Забрать заявление на перенос договора (указываем номер договора) с адреса\
(полный адрес с какого переносим услуги) на  адрес \
(указываем полный адрес куда переподключаем услуги). ФИО: (владельца договора).\n\
Тел: (телефон по какому мастер созвонится).\n\
Подключить абоненту ТВ+Интернет  (если есть доп. точки то указывает + доп. точку (-и)).\n\
ТП: указывает название пакета и код.\n\
Настроить + продемонстрировать.\n\
Абонент уведомлен об присутствии с паспортом, ИНН, копиями документов, о звонке мастера и о дате и времени подключения."
    } else if (val == 2) {
        app = "Абонент уведомлен о присутствии владельца с паспортом и копиями документов, времени и дате прихода техника.";
    } else if (val == 3) {
        app = "Здравствуйте!\n\n\
Абонент хочет подключится. Номер телефона: (телефон). \
Имя: (имя). Предварительный договор: (договор). \n\n\
Спасибо!";
    } else {
        app = val;
    }
    $temp.val(app).select();
    document.execCommand("copy");
    $temp.remove();
    if (copi.length) {
        copi.remove();
    }
    $("body").append('<div class="copied"><i class="fas fa-check copied_chek"></i>Скопировано!</div>');
    copi = $(".copied");
    copi.fadeOut(1500);
}
$(".useful_info-discount_input").on("change keyup paste", function () {
    var val = $(this).val();
    var item = $(".useful_info-discount_new_price");
    item.eq(0).empty().append("<span>Скидка 10%</span><span>" + (val * 0.9).toFixed(2) + "</span>");
    item.eq(1).empty().append("<span>Скидка 20%</span><span>" + (val * 0.8).toFixed(2) + "</span>");
    item.eq(2).empty().append("<span>Скидка 30%</span><span>" + (val * 0.7).toFixed(2) + "</span>");
    item.eq(3).empty().append("<span>Скидка 40%</span><span>" + (val * 0.6).toFixed(2) + "</span>");
    item.eq(4).empty().append("<span>Скидка 50%</span><span>" + (val * 0.5).toFixed(2) + "</span>");

});
function tog_hed(item) {
    var hed = $(item);
    hed.next().toggle("slow");
}
function open_kpi() {
    //Указываем вес показателей
    var app = ' <div class="kpi kpi_custom">\
<div class="kpi_item">\
<div class="kpi_text" title="Контрольный лист качества(оценка звонка). Цель 90%.">КЛК</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Количество C-SAT оценок от абонента после звонка. Цель 32%.">C`sat</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Средняя длительность разговора в звонке. Цель 300 c.">AHT</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Решение тех вопросов без переключения на СТП и без СО. Цель 62%.">SR</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Количество обращений в которых было предложено помощник по продажам 2,9. Цель 70%.">STS/2.9</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Количество часов на одну продажу. Цель 8.">Sales Coef</div>\
<input type="text" class="kpi_indi kpi_indi_custom">\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Процент выполнения всех показателей">% KPI</div>\
<div class="kpi_indi kpi_indi_custom">0</div>\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Процент премии который вы получите">% премии</div>\
<div class="kpi_indi kpi_indi_custom">0</div>\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Процент выполнения всех показателей">% KPI Cross</div>\
<div class="kpi_indi kpi_indi_custom">0</div>\
</div>\
<div class="kpi_item">\
<div class="kpi_text" title="Процент премии который вы получите">% премии Cross</div>\
<div class="kpi_indi kpi_indi_custom">0</div>\
</div>\
<button onclick="close_kpi()">Закрыть</button>\
<button onclick="calc_kpi()">Посчитать</button>\
</div>';
    $("body").append(app);

}
function close_kpi() {
    $(".kpi_custom").remove();
}
function calc_kpi() {
    var item = $(".kpi_indi_custom");
    var res_kpi = kpi(item.eq(0).val(), item.eq(1).val(), item.eq(2).val(), item.eq(3).val(), item.eq(4).val(), item.eq(5).val());
    item.eq(6).text(res_kpi["kpi"]);
    item.eq(7).text(res_kpi["premiya"]);
    item.eq(8).text(res_kpi["kpi_cross"]);
    item.eq(9).text(res_kpi["premiya_cross"]);

}
function kpi(klk = "0", csat = "0", aht = "0", sr = "0", sts = "0", sales = "100") {
    var weight_klk = 0.3;
    var weight_csat = 0.2;
    var weight_aht = 0.25;
    var weight_sr = 0.25;
    var weight_sales = 0.25;
    var weight_sts = 0.20;
    var result_klk = 0;
    var result_csat = 0;
    var result_aht = 0;
    var result_sr = 0;
    var result_sts = 0;
    var result_sales = 0;
    var fact_klk = klk;
    var fact_csat = csat;
    var fact_aht = aht;
    var fact_sr = sr;
    var fact_sts = sts;
    var fact_sales = sales;
    var result_arr = [];
    fact_klk = fact_klk.replace(",", ".");
    fact_csat = fact_csat.replace(",", ".");
    fact_aht = fact_aht.replace(",", ".");
    fact_sr = fact_sr.replace(",", ".");
    fact_sts = fact_sts.replace(",", ".");
    fact_sales = fact_sales.replace(",", ".");
    //считаем КЛК
    if (fact_klk * 1 < 90 * 0.9) {
        result_klk = 0;
    } else if (fact_klk * 1 / 90 > 1.05) {
        result_klk = weight_klk * 1.05 * 100;
    } else {
        result_klk = ((fact_klk * 1) / 90) * weight_klk * 100;
    }
    //считаем Csat
    if (fact_csat * 1 < 30) {
        result_csat = 0;
    } else if (fact_csat * 1 / 32 > 1.05) {
        result_csat = weight_csat * 1.05 * 100;
    } else {
        result_csat = ((fact_csat * 1) / 32) * weight_csat * 100;
    }
    //считаем AHT
    if (fact_aht * 1 > 300 * 1.2) {
        result_aht = 0;
    } else if ((2 - (fact_aht * 1) / 300) > 1.05) {
        result_aht = weight_aht * 1.05 * 100;
    } else {
        result_aht = (2 - (fact_aht * 1) / 300) * 100 * weight_aht;
    }
    //считаем SR
    if (fact_sr * 1 < 56) {
        result_sr = 0;
    } else if ((fact_sr * 1 / 62) > 1.05) {
        result_sr = weight_sr * 1.05 * 100;
    } else {
        result_sr = (fact_sr * 1 / 62) * 100 * weight_sr;
    }
    if (fact_sts * 1 < 81) {
        result_sts = 0;
    } else if (2 - (fact_sts * 1 / 90) > 1.05) {
        result_sts = weight_sts * 1.05 * 100;
    } else {
        result_sts = (fact_sts * 1 / 90) * 100 * weight_sts;
    }
    if (fact_sales * 1 > 12) {
        result_sales = 0;
    } else if (2 - (fact_sales * 1 / 8) > 1.05) {
        result_sales = weight_sales * 1.05 * 100;
    } else {
        result_sales = (2 - (fact_sales * 1 / 8)) * 100 * weight_sales;
    }
    var result = result_sr + result_csat + result_aht + result_klk;
    var result_cross = result_sr + result_sts + result_sales + result_klk;
    //выводим процент выполнения КПЭ
    result_arr["klk"] = result_klk;
    result_arr["csat"] = result_csat;
    result_arr["aht"] = result_aht;
    result_arr["sr"] = result_sr;
    result_arr["sts"] = result_sts;
    result_arr["sales"] = result_sales;
    result_arr["kpi"] = (result_klk + result_csat + result_aht + result_sr).toFixed(2);
    result_arr["kpi_cross"] = (result_sr + result_sts + result_sales + result_klk).toFixed(2);
    if (result >= 100) {
        result_arr["premiya"] = 50;
    } else if (result < 100 && result >= 95) {
        result_arr["premiya"] = 40;
    } else if (result < 95 && result >= 90) {
        result_arr["premiya"] = 30;
    } else if (result < 90 && result >= 80) {
        result_arr["premiya"] = 20;
    } else if (result < 80 && result >= 70) {
        result_arr["premiya"] = 10;
    } else if (result < 70) {
        result_arr["premiya"] = 0;
    }
    if (result_cross >= 100) {
        result_arr["premiya_cross"] = 50;
    } else if (result_cross < 100 && result_cross >= 95) {
        result_arr["premiya_cross"] = 40;
    } else if (result_cross < 95 && result_cross >= 90) {
        result_arr["premiya_cross"] = 30;
    } else if (result_cross < 90 && result_cross >= 80) {
        result_arr["premiya_cross"] = 20;
    } else if (result_cross < 80 && result_cross >= 70) {
        result_arr["premiya_cross"] = 10;
    } else if (result_cross < 70) {
        result_arr["premiya_cross"] = 0;
    }
    return result_arr;
}