function user_list() {
    var wrapper = $(".user");
    wrapper.empty();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/user_list.php",
        success: function (data) {
            if (data != "Eror") {
                var app = '<div class="user"><div class="user-add_block">Имя <input type="text" class="user-add_name user-add_item" placeholder="Юрий">Фамилия<input type="text" class="user-add_lastname user-add_item" placeholder="Юрин">ИД циско<input type="text" class="user-add_id_cisco user-add_item" placeholder="5948521">Логин<input type="text" class="user-add_login user-add_item" placeholder="admin.adminovich"><button class="user-add_button user-add_item" onclick="add(this)">Добавить</button></div>';
                var app_photo, app_name, app_login, app_password, app_id, app_id, app_access, app_trash, group, group_class = "";
                for (var i = 0; i < data.length; i++) {
                    app_photo = '<img src="/break/image/avatars/' + data[i]["photo"] + '" alt="avatars" class="user-item_ava">';
                    app_name = '<div class="user-item_name user-item_block">' + data[i]["name"] + ', ' + data[i]["lastname"] + '<i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="name"></i></div>';
                    app_login = '<div class="user-item_login user-item_block">' + data[i]["login"] + '<i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="login"></i></div>';
                    app_password = '<div class="user-item_password user-item_block">' + data[i]["password"] + '<i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="password"></i></div>';
                    app_id = '<div class="user-item_id user-item_block">' + data[i]["id"] + '</div>';
                    if (data[i]["access"] == 1) {
                        group = "Первая линия";
                        group_class = "";
                    } else if (data[i]["access"] == 2) {
                        group = "Администратор";
                        group_class = "";
                    } else if (data[i]["access"] == 3) {
                        group = "Happy Call";
                        group_class = "user-item_happy";
                    } else if (data[i]["access"] == 4) {
                        group = "Cross";
                        group_class = "user-item_cross";
                    } else if (data[i]["access"] == 5) {
                        group = "Mentor";
                        group_class = "user-item_mentor";
                    }
                    app_access = ' <div class="user-item_access user-item_block">' + group + '<i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="access"></i></div>';
                    app_trash = '<div class="user-item_trash"><i class="fas fa-trash-alt user-item_devare" onclick="item_edit(this)" value="devare" title="Пока-пока:)"></i></div>';
                    app = app + '<div class="user-item ' + group_class + '">' + app_photo + app_name + app_login + app_password + app_id + app_access + app_trash + '</div>';
                }
                wrapper.append(app + "</div>");
            } else {
                alert("Есть проблемы при получении списка");
            }
        }
    });
}

function item_edit(item) {
    var item = $(item);
    var item_parrent = item.parent();
    var item_text = item.parent().text();
    var item_id = item.parent().parent().find(".user-item_id").text();
    var user_text = null;
    if (item.attr("value") == "devare") {
        var del = confirm("Сотрудник действительно уволен?");
    } else {
        if (item.attr("value") == "access") {
            do {
                user_text = prompt("Укажите группу!\n 1 - Группа первой линии. \n 2 - Группа администраторов \n 3 - Группа Happy Call. \n 4 - Группа Cross.\n 5 - Ментор.\n" + "На что меняем?");
            } while (!(user_text == "1" || user_text == "2" || user_text == "3" || user_text == "4" || user_text == "5" || user_text === null))

        } else if (item.attr("value") == "name") {
            user_text = prompt("Обязательно указываейте первым имя, потом ставьте запятую, и потом фамилию!\n \n" + "На что меняем?");
        } else {
            user_text = prompt("На что меняем?");
        }

    }

    if (user_text !== null || del) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/break/modules/user_edit.php",
            data: {
                val: item.attr("value"),
                text: user_text,
                id: item_id
            },
            success: function (data) {
                if (data == "Update") {
                    if (item.attr("value") == "devare") {
                        alert("Бачек уволен. *юху-ху-ху*")
                        item.parent().parent().remove();
                    } else {
                        item_parrent.empty();
                        if (user_text == 1) {
                            item_parrent.append('Первая линия <i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        } else if (user_text == 2) {
                            item_parrent.append('Администратор <i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        } else if (user_text == 3) {
                            item_parrent.append('Happy Call <i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        } else if (user_text == 4) {
                            item_parrent.append('Cross <i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        } else if (user_text == 5) {
                            item_parrent.append('Mentor <i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        } else {
                            item_parrent.append(user_text + '<i class="far fa-edit user-item_edit" onclick="item_edit(this)" value="' + item.attr("value") + '"></i>');
                        }
                    }
                } else if (data == "Not update")
                    alert("К сожалению, изменения не внесены");
            }
        });
    }
}

function add(item) {
    var item_block = $(item);
    var item_parrent = item_block.parent();
    var user_name = item_parrent.find(".user-add_name").val()
    var user_lastname = item_parrent.find(".user-add_lastname").val()
    var user_login = item_parrent.find(".user-add_login").val()
    var user_id = item_parrent.find(".user-add_id_cisco").val()
    if (user_name || user_lastname || user_login || user_id) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/break/modules/user_add.php",
            data: {
                name: user_name,
                lastname: user_lastname,
                id: user_id,
                login: user_login
            },
            success: function (data) {
                if (data == "Update") {
                    alert("Сотрудник добавлен")
                } else if (data == "Not update")
                    alert("Сотрудник не добавлен")
            }
        });
    }
}

function taxi_stat() {
    var wrapper = $(".user");
    wrapper.empty();
    var app = "  <input id='button-a' class='taxi-btn' type='button' value='Выгрузить отчет'><table class='taxi'><tr class='taxi-history_head'><td class='taxi-history'>ID</td>\
<td class='taxi-history'>Фамилия, имя</td>\
<td class='taxi-history'>Время</td>\
<td class='taxi-history'>Район</td>\
<td class='taxi-history'>Улица</td>\
<td class='taxi-history'>Номер машины</td>\
<td class='taxi-history'>Дата</td></tr>";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/taxi_history.php",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                app = app + "\
<tr class='taxi-history_tr'><td class='taxi-history'>"+ data[i]['id'] + "</td>\
<td class='taxi-history'>"+ data[i]['name'] + "</td>\
<td class='taxi-history'>"+ data[i]['time'] + "</td>\
<td class='taxi-history'>"+ data[i]['area'] + "</td>\
<td class='taxi-history'>"+ data[i]['street'] + "</td>\
<td class='taxi-history'>"+ data[i]['car_num'] + "</td>\
<td class='taxi-history'>"+ data[i]['date'] + "</td></tr>";

            }
            wrapper.append(app + "</table>");
            var wb = XLSX.utils.book_new();
            wb.Props = {
                Title: "Taxi_report",
                Subject: "Taxi",
                Author: "Red Stapler",
                CreatedDate: new Date()
            };
            wb.SheetNames.push("Taxi_Report");
            //                var ws_data = [['hello' , 'world']];
            var ws = XLSX.utils.json_to_sheet(data);
            wb.Sheets["Taxi_Report"] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            function s2ab(s) {

                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;

            }
            $("#button-a").click(function () {
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'taxi.xlsx');
            });


        }
    });
}

function informing() {
    var wrapper = $(".user");
    wrapper.empty();
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/show_message.php",
        success: function (respons) {
            if (respons != "error 1" && respons != "error 2") {
                var messege_admin_text = $(".messege_admin-text");
                var messege_admin_q = $(".messege_admin-q");
                var messege_admin_a = $(".messege_admin-a");
                var messege_admin_answer = $(".messege_admin-answer");
                var messege_admin_not_answer = $(".messege_admin-not_answer");
                var app = "<div class='messege_admin'>\
<div class='messege_admin-text'>"+ respons[0] + "</div>\
<div class='messege_admin-q'>"+ respons[2] + "</div>\
<div class='messege_admin-a'>"+ respons[1] + "</div>";
                var app_answer = "<div class='messege_admin-answer'><span class='messege_admin-answer_item_h'> Ответили </span>";
                var app_not_answer = "<div class='messege_admin-not_answer'><span class='messege_admin-not_answer_item_h'> Не ответили </span>";
                console.log(respons[3]["message"]);
                for (var i = 3; i < respons.length; i++) {
                    if (respons[i]["message"] == 1) {
                        app_not_answer = app_not_answer + "<span class='messege_admin-answer_item'>" + respons[i]["name"] + ", " + respons[i]["lastname"] + "</span>"
                    } else if (respons[i]["message"] == 0) {
                        app_answer = app_answer + "<span class='messege_admin-answer_item'>" + respons[i]["name"] + ", " + respons[i]["lastname"] + "</span>"
                    }
                }
                wrapper.append(app + app_answer + "</div>" + app_not_answer + "</div></div>");
            } else if (respons == "error 1") {
                alert("Проблема в соединении с базой данных при загрузке сообщения.");
            } else if (respons == "error 2") {
                alert("Проблема в соединении с базой данных  при загрузке пользователей.");
            }
        }
    });
}

function update_indicators() {
    var wrapper = $(".user");
    wrapper.empty();
    var kpi = prompt("Вставьте сюда скопированый запрос из файла.");
    if (kpi != "" && kpi !== null) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/break/modules/update_indicators.php",
            data: {
                kpi: kpi
            },
            success: function (respons) {
                if (respons == "not devare") {
                    alert("Не удалось удалить таблицу. Обновите страницу и попробуйте позже.");
                } else if (respons == "not update") {
                    alert("Не удалось обновить таблицу. Обновите страницу и попробуйте позже.");
                } else {
                    alert("Показатели обновлены.");
                }
            }
        });
    }
}

function schedule() {
    var wrapper = $(".user");
    wrapper.empty();
    // Шапка таблицы
    var app = " <input id='button-a' class='taxi-btn' type='button' value='Выгрузить отчет'><table class='taxi'>\
                    <tr class='taxi-history_head'>\
                        <td class='taxi-history' style='display:none;'>id</td>\
                        <td class='taxi-history'>ФИО</td>\
                        <td class='taxi-history'>Team</td>\
                        <td class='taxi-history'>01.08 чт</td>\
                        <td class='taxi-history'>02.08 пт</td>\
                        <td class='taxi-history'>03.08 сб</td>\
                        <td class='taxi-history'>04.08 вс</td>\
                        <td class='taxi-history'>05.08 пн</td>\
                        <td class='taxi-history'>06.08 вт</td>\
                        <td class='taxi-history'>07.08 ср</td>\
                        <td class='taxi-history'>08.08 чт</td>\
                        <td class='taxi-history'>09.08 пт</td>\
                        <td class='taxi-history'>10.08 сб</td>\
                        <td class='taxi-history'>11.08 вс</td>\
                        <td class='taxi-history'>12.08 пн</td>\
                        <td class='taxi-history'>13.08 вт</td>\
                        <td class='taxi-history'>14.08 ср</td>\
                        <td class='taxi-history'>15.08 чт</td>\
                        <td class='taxi-history'>16.08 пт</td>\
                        <td class='taxi-history'>17.08 сб</td>\
                        <td class='taxi-history'>18.08 вс</td>\
                        <td class='taxi-history'>19.08 пн</td>\
                        <td class='taxi-history'>20.08 вт</td>\
                        <td class='taxi-history'>21.08 ср</td>\
                        <td class='taxi-history'>22.08 чт</td>\
                        <td class='taxi-history'>23.08 пт</td>\
                        <td class='taxi-history'>24.08 сб</td>\
                        <td class='taxi-history'>25.08 вс</td>\
                        <td class='taxi-history'>26.08 пн</td>\
                        <td class='taxi-history'>27.08 вт</td>\
                        <td class='taxi-history'>28.08 ср</td>\
                        <td class='taxi-history'>29.08 чт</td>\
                        <td class='taxi-history'>30.08 пт</td>\
                        <td class='taxi-history'>31.08 сб</td>\
                    </tr>";
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/break/modules/getUsers.php",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                // Ячейки таблицы
                app = app + "\
                    <tr class='taxi-history_tr'>\
                        <td class='taxi-history' style='display:none;'>"+ data[i]['id'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['fio'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['team'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['01.08 чт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['02.08 пт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['03.08 сб'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['04.08 вс'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['05.08 пн'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['06.08 вт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['07.08 ср'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['08.08 чт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['09.08 пт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['10.08 сб'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['11.08 вс'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['12.08 пн'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['13.08 вт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['14.08 ср'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['15.08 чт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['16.08 пт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['17.08 сб'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['18.08 вс'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['19.08 пн'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['20.08 вт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['21.08 ср'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['22.08 чт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['23.08 пт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['24.08 сб'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['25.08 вс'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['26.08 пн'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['27.08 вт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['28.08 ср'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['29.08 чт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['30.08 пт'] + "</td>\
                        <td class='taxi-history'>"+ data[i]['31.08 сб'] + "</td>\
                    </tr>";

            }
            wrapper.append(app + "</table>");
            var wb = XLSX.utils.book_new();
            wb.Props = {
                Title: "Taxi_report",
                Subject: "Taxi",
                Author: "Red Stapler",
                CreatedDate: new Date()
            };
            wb.SheetNames.push("Taxi_Report");
            //                var ws_data = [['hello' , 'world']];
            var ws = XLSX.utils.json_to_sheet(data);
            wb.Sheets["Taxi_Report"] = ws;
            var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            function s2ab(s) {

                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }
            $("#button-a").click(function () {
                saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'schedule.xlsx');
            });
        }
    });
}

function editUsersValue(td) {
    var obj = $(td);
    var obj_val = obj.attr("value");
    var obj_ind = obj.index();
    // if (obj_ind == 3) {
    //     $(".taxi_table").find('input').remove();
    //     $(".taxi_table").find('span').show();
    //     var app_btn_car = '<input type="button" value="1" id="car1" onclick="edit_car(this)" class="taxi_table-car_num">\
    //         <input type = "button" value = "2" id = "car2" onclick = "edit_car(this)" class="taxi_table-car_num" >\
    //         <input type="button" value="3" id="car3" onclick="edit_car(this)" class="taxi_table-car_num">\
    //         <input type="button" value="4" id="car4" onclick="edit_car(this)" class="taxi_table-car_num">\
    //         <input type="button" value="5" id="car5" onclick="edit_car(this)" class="taxi_table-car_num">\
    //         <input type="button" value="6" id="car6" onclick="edit_car(this)" class="taxi_table-car_num">';
    //     obj.find("span").hide();
    //     obj.append(app_btn_car);
    // } else {
    var val_user = prompt("Введите новое значение:");
    var obj_name = obj.parent().find(".taxi_table-body_td").eq(0).text();
    if (val_user !== null) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/break/modules/taxi_edit.php",
            data: {
                index: obj_ind,
                index_val: val_user,
                index_name: obj_name
            },
            success: function (respons) {
                if (respons == true) {
                    obj.empty();
                    if (obj_ind == 4) {
                        obj.text(val_user + ":00");
                    } else {
                        obj.text(val_user);
                    }
                } else {
                    alert("Что-то пошло не так! Обратитесь к Рыкуну.");
                }
            },
            error: function (respons) {
                alert("К сожалению, проблемы с обработчиком. Перезагрузите страницу и попробуйте еще раз.")
            }
        });
    }
}