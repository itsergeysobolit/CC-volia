$(document).ready ( function(){ 
    var now = new Date();
    $(".break-list_wrapper_cross").hide();
    $(".break-list_wrapper_happy").hide();
    $(".break-group").find("button").eq(0).addClass("break-group_active");
    var hours = now.getHours();
    $(".break-interval_item").eq(hours-8).trigger("click");
});
function get_interval(interval){
    var time = $(interval).val();
    if(typeof time === 'undefined'){
        time =interval;
    }
    var group= $(".break-group").find(".break-group_active").index();
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/break_list.php",
        data:{
            time: time,
            group: group,
        },
        success: function(data){
            $(".break-list_wrapper_1st").hide();
            $(".break-list_wrapper_happy").hide();
            $(".break-list_wrapper_cross").hide();
            if(data != "Can`t reach a data base"){
                if(group==0){
                    var break_item_list = $(".break-list_wrapper_1st").find(".break-item_list");
                    var break_list_time = $(".break-list_wrapper_1st").find(".break-list_time");
                    var break_interval_forecast = $(".break-list_wrapper_1st").find(".break-interval_forecast");
                    $(".break-list_wrapper_1st").css("display", "flex");
                } else if(group==1){
                    var break_item_list = $(".break-list_wrapper_happy").find(".break-item_list");
                    var break_list_time = $(".break-list_wrapper_happy").find(".break-list_time");
                    var break_interval_forecast = $(".break-list_wrapper_happy").find(".break-interval_forecast");   
                    $(".break-list_wrapper_happy").css("display", "flex");
                } else if(group==2){
                    var break_item_list = $(".break-list_wrapper_cross").find(".break-item_list");
                    var break_list_time = $(".break-list_wrapper_cross").find(".break-list_time");
                    var break_interval_forecast = $(".break-list_wrapper_cross").find(".break-interval_forecast");   
                    $(".break-list_wrapper_cross").css("display", "flex");
                }
                break_list_time.eq(0).text(time+":00");
                break_list_time.eq(1).text(time+":20");
                break_list_time.eq(2).text(time+":30");
                break_list_time.eq(3).text(time+":40");
                break_list_time.eq(4).text(time+":50");
                for(var i =0;i<data.length;i++){
                    if(data[i]["hours"]==time){
                        var app ="";
                        var delete_button = "<i class='fas fa-angry break-delete_people' title='Хватит отдыхать' onclick='work(this)'></i> ";
                        $(interval).parent().find(".break-interval_active").removeClass("break-interval_active");
                        $(interval).addClass("break-interval_active");

                        if(Array.isArray(data[i]["peoples"])){
                            for(var j=0;j<data[i]["peoples"].length;j++){
                                app = app + "<div class='break-list_item'>"+data[i]["peoples"][j]+ delete_button+"</div>";
                            }
                        } else {
                            if(data[i]["peoples"]){
                                app = "<div class='break-list_item'>"+data[i]["peoples"]+delete_button+"</div>";
                            }
                        }
                        var forecast = Math.floor(data[i]["amount"]/8);
                        if(data[i]["amount"]>=48){
                            if(data[i]["minutes"]==0){
                                break_interval_forecast.eq(0).text(forecast-2);
                                break_item_list.eq(0).empty();
                                break_item_list.eq(0).append(app);
                            } else if(data[i]["minutes"]==20){
                                break_interval_forecast.eq(1).text(forecast-2);
                                break_item_list.eq(1).empty();
                                break_item_list.eq(1).append(app);
                            } else if(data[i]["minutes"]==30){
                                break_interval_forecast.eq(2).text(forecast-2);
                                break_item_list.eq(2).empty();
                                break_item_list.eq(2).append(app);
                            } else if(data[i]["minutes"]==40){
                                break_interval_forecast.eq(3).text(forecast-2);
                                break_item_list.eq(3).empty();
                                break_item_list.eq(3).append(app);
                            } else if(data[i]["minutes"]==50){
                                break_interval_forecast.eq(4).text(forecast-2);
                                break_item_list.eq(4).empty();
                                break_item_list.eq(4).append(app);
                            }
                        } else if(data[i]["amount"]>=24 && data[i]["amount"]<48){
                            if(data[i]["minutes"]==0){
                                break_interval_forecast.eq(0).text(forecast-1);
                                break_item_list.eq(0).empty();
                                break_item_list.eq(0).append(app);
                            } else if(data[i]["minutes"]==20){
                                break_interval_forecast.eq(1).text(forecast-1);
                                break_item_list.eq(1).empty();
                                break_item_list.eq(1).append(app);
                            } else if(data[i]["minutes"]==30){
                                break_interval_forecast.eq(2).text(forecast-1);
                                break_item_list.eq(2).empty();
                                break_item_list.eq(2).append(app);
                            } else if(data[i]["minutes"]==40){
                                break_interval_forecast.eq(3).text(forecast-1);
                                break_item_list.eq(3).empty();
                                break_item_list.eq(3).append(app);
                            } else if(data[i]["minutes"]==50){
                                break_interval_forecast.eq(4).text(forecast-1);
                                break_item_list.eq(4).empty();
                                break_item_list.eq(4).append(app);
                            }
                        } else {
                            if(data[i]["minutes"]==0){
                                break_interval_forecast.eq(0).text(forecast);
                                break_item_list.eq(0).empty();
                                break_item_list.eq(0).append(app);
                            } else if(data[i]["minutes"]==20){
                                break_interval_forecast.eq(1).text(forecast);
                                break_item_list.eq(1).empty();
                                break_item_list.eq(1).append(app);
                            } else if(data[i]["minutes"]==30){
                                break_interval_forecast.eq(2).text(forecast);
                                break_item_list.eq(2).empty();
                                break_item_list.eq(2).append(app);
                            } else if(data[i]["minutes"]==40){
                                break_interval_forecast.eq(3).text(forecast);
                                break_item_list.eq(3).empty();
                                break_item_list.eq(3).append(app);
                            } else if(data[i]["minutes"]==50){
                                break_interval_forecast.eq(4).text(forecast);
                                break_item_list.eq(4).empty();
                                break_item_list.eq(4).append(app);
                            }
                        }
                    }
                }
            }
        }

    });
}
function forecast(){
    var forecast = $(".break-forecast_new");
    var forecast_arr = forecast.val().split(/\s+/g);
    var forecast_good=0;
    if(forecast_arr.length==24){
        for(var i = 0; i<24; i++){
            if($.isNumeric(forecast_arr[i])){
                forecast_good+=1;
            } else {
                alert("В загрузке есть неверный елемент: '"+ forecast_arr[i]+"'! На "+ i+ " часу");
            }
        }
        if(forecast_good==24){

            $.ajax({
                type:"POST",
                dataType: "json",
                url:"/break/modules/break_forecast.php",
                data:{
                    time: forecast_arr,
                },
                success: function(data){
                    if(data != "not ok"){
                        alert("Загрузка успешно подана");
                    } else {
                        alert("Есть проблемы при загрузке");

                    }
                }

            });


        }
    } else{
        alert("В загрузке проблема с количеством промежутков! Сейчас в ней : "+forecast_arr.length);

    }
}
function work(people){
    var group= $(".break-group").find(".break-group_active").index();
    var delete_people = $(people).parent();
    var delete_hours = $(".break-interval_active").val();
    var accept = confirm("Сотрудник: "+delete_people.text()+ " задолбал?");
    if(accept){
        $.ajax({
            type:"POST",
            dataType: "json",
            url:"/break/modules/break_delete.php",
            data:{
                time: delete_hours,
                fio: delete_people.text(),
                group: group
            },
            success: function(data){
                if(data == "Delete"){
                    delete_people.remove();
                    alert("Теперь будет батрачить");
                } else if(data == "Not delete") {
                    alert("Не удалось заставить его батрачить(Ошибка при удалении)");

                } else {
                    alert("Неизвестная ошибка!");

                }
            },
            error:function(){
                alert("Что то не так на стороне сервера! Бегите!");
            }

        });
    }
}
function changes_forecast(obj, direction){
    var changes_interval_direction = direction;
    var changes_hours = $(".break-interval_active").val();
    var changes_interval_index = $(obj).parent().parent().index();
    var changes_interval_obj = $(obj).parent().parent().find(".break-interval_forecast");
    var group = $(".break-group").find(".break-group_active").index();
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/break_changes.php",
        data:{
            direction: changes_interval_direction,
            index: changes_interval_index,
            hours: changes_hours,
            group: group
        },
        success: function(data){
            if(data && changes_interval_direction== "up"){
                changes_interval_obj.text(changes_interval_obj.text()*1+1);
            } else if(data && changes_interval_direction == "down") {
                if(changes_interval_obj.text()*1-1<=0){
                    changes_interval_obj.text(0);
                } else{
                    changes_interval_obj.text(changes_interval_obj.text()*1-1);
                }
            } else if(data=="Can`t reach a data base"){
                alert("База данных недоступна");
            } else if(!data){
                alert("К сожалению, не удалось записать изменения.")
            }
        },
        error:function(){
            alert("Что то не так на стороне сервера! Бегите!");
        }

    });
}
function get_group(group){
    var group_ind = $(group).index();
    var time = $(".break-interval_wrapper").find(".break-interval_active").val();
    $(group).parent().find(".break-group_active").removeClass("break-group_active");
    $(group).addClass("break-group_active");
    get_interval(time);
}
function break_sv(sv){
    var sv = sv;
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/break_sv.php",
        data:{
            sv: sv,
        },
        success: function(respons){
            if(respons=="ok"){
                alert("Мы поставили человека на стреме, он посмотрит за паузами. Все схвачено.")
            } else if(respons=="Erorr"){
                alert("Произошла ошибка, человек не хочет смотреть за паузами.")
            }
        },
        error:function(){
            alert("Что то не так на стороне сервера! Бегите!");
        }
    });
}

function send_mess(){
    var message = $(".message_box").val();
    var message_a = $(".message_a").val();
    var message_q = $(".message_q").val();
    if(message=="" || message_a=="" || message_q==""){
        alert("Заполнены не все поля. Проверьте и повторите.");
    } else{
        $.ajax({
            type:"POST",
            dataType: "json",
            url:"/break/modules/send_message.php",
            data:{
                message: message,
                message_a: message_a,
                message_q: message_q
            },
            success: function(respons){
                if(respons=="ok"){
                    alert("В ближайшее время все консултанты получат собщение.")
                } else if(respons=="erorr 1"){
                    alert("Не удалось записать сообщение. Попробуйте обновить страницу и повторить еще раз.")
                } else if(respons=="erorr 2"){
                    alert("Не удалось включить сообщение консультанту. Обновите страницу и попробуйте еще раз.")
                }
            },
            error:function(){
                alert("Что то не так на стороне сервера! Бегите!");
            }
        });
    }
}

