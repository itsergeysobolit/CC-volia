$(document).ready ( function(){ 
    var time21= $("#time21");
    var time22= $("#time22");
    var time23= $("#time23");
    var time24= $("#time24");
    var time1= $("#time1");
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/taxi_table.php",
        success:function(respons){
            var v21=1;
            var v22 = 1;
            var v23 = 1;
            var v0 = 1;
            var v1 = 1;
            for(var i =0; i<respons.length;i++){
                var car_color="";
                if(respons[i]["car_num"] == 1){
                    car_color="taxi_table-car_color_1";
                } else if(respons[i]["car_num"] == 2){
                    car_color="taxi_table-car_color_2";
                } else if(respons[i]["car_num"] == 3){
                    car_color="taxi_table-car_color_3";
                } else if(respons[i]["car_num"] == 4){
                    car_color="taxi_table-car_color_4";
                } else if(respons[i]["car_num"] == 5){
                    car_color="taxi_table-car_color_5";
                } else if(respons[i]["car_num"] == 6){
                    car_color="taxi_table-car_color_6";
                }
                if(respons[i]["time"] == "21"){
                    time21.append('<span class="taxi_table-num">'+v21+'</span><div class="taxi_table-body '+car_color+'"><div class="taxi_table-body_td" >'+respons[i]["name"]+'<i class="fas fa-running btn-taxi-d" title="Пойдет пешком" onclick="run(this)"></i></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["area"]+'">'+respons[i]["area"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["street"]+'">'+respons[i]["street"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["car_num"]+'"><span>'+respons[i]["car_num"]+'</span></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["time"]+':00">'+respons[i]["time"]+':00</div></div>');
                    v21++;
                } else if(respons[i]["time"] == "22"){
                    time22.append('<span class="taxi_table-num">'+v22+'</span><div class="taxi_table-body '+car_color+'"><div class="taxi_table-body_td">'+respons[i]["name"]+'<i class="fas fa-running btn-taxi-d" title="Пойдет пешком" onclick="run(this)"></i></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["area"]+'">'+respons[i]["area"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["street"]+'">'+respons[i]["street"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["car_num"]+'"><span>'+respons[i]["car_num"]+'</span></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["time"]+':00">'+respons[i]["time"]+':00</div></div>');
                    v22++;
                } else if(respons[i]["time"] == "23"){
                    time23.append('<span class="taxi_table-num">'+v23+'</span><div class="taxi_table-body '+car_color+'"><div class="taxi_table-body_td">'+respons[i]["name"]+'<i class="fas fa-running btn-taxi-d" title="Пойдет пешком" onclick="run(this)"></i></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["area"]+'">'+respons[i]["area"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["street"]+'">'+respons[i]["street"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["car_num"]+'"><span>'+respons[i]["car_num"]+'</span></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["time"]+':00">'+respons[i]["time"]+':00</div></div>');
                    v23++;
                } else if(respons[i]["time"] == "24"){
                    time24.append('<span class="taxi_table-num">'+v0+'</span><div class="taxi_table-body '+car_color+'"><div class="taxi_table-body_td">'+respons[i]["name"]+'<i class="fas fa-running btn-taxi-d" title="Пойдет пешком" onclick="run(this)"></i></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["area"]+'">'+respons[i]["area"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["street"]+'">'+respons[i]["street"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["car_num"]+'"><span>'+respons[i]["car_num"]+'</span></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["time"]+':00">'+respons[i]["time"]+':00</div></div>');
                    v0++;
                } else if(respons[i]["time"] == "1"){
                    time1.append('<span class="taxi_table-num">'+v1+'</span><div class="taxi_table-body '+car_color+'"><div class="taxi_table-body_td">'+respons[i]["name"]+'<i class="fas fa-running btn-taxi-d" title="Пойдет пешком" onclick="run(this)"></i></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["area"]+'">'+respons[i]["area"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["street"]+'">'+respons[i]["street"]+'</div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["car_num"]+'"><span>'+respons[i]["car_num"]+'</span></div><div class="taxi_table-body_td" onclick="edit(this)" value="'+respons[i]["time"]+':00">'+respons[i]["time"]+':00</div></div>');
                    v1++;
                }
            }
        }
    }); 
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/all_sessions.php",
        success:function(respons){
            var wrp = $(".not_order_wrapper");
            var app="";
            for(var p = 0; p< respons[0].length;p++){
                app=app+"<div class='not_order_item'>"+respons[0][p]["name"]+"</div>";
            }
            wrp.eq(0).append(app);
            app="";
            for(var p = 0; p< respons[1].length;p++){
                app=app+"<div class='not_order_item'>"+respons[1][p]["name"]+" <i class='fas fa-minus-circle not_order_del' title='Передумал, будет ехать' onclick='del_it(this)'></i></div>";
                
            }
            wrp.eq(1).append(app);
        }
    }); 
        
});
;
function edit(td){
    var obj= $(td);
    var obj_val = obj.attr("value");
    var obj_ind = obj.index();
    if(obj_ind==3){
        $(".taxi_table").find('input').remove();
        $(".taxi_table").find('span').show();
        var app_btn_car = '<input type="button" value="1" id="car1" onclick="edit_car(this)" class="taxi_table-car_num"><input type="button" value="2" id="car2" onclick="edit_car(this)" class="taxi_table-car_num"><input type="button" value="3" id="car3" onclick="edit_car(this)" class="taxi_table-car_num"><input type="button" value="4" id="car4" onclick="edit_car(this)" class="taxi_table-car_num"><input type="button" value="5" id="car5" onclick="edit_car(this)" class="taxi_table-car_num"><input type="button" value="6" id="car6" onclick="edit_car(this)" class="taxi_table-car_num">';
        obj.find("span").hide();
        obj.append(app_btn_car);
    } else {
        var val_user = prompt("Введите новое значение:");
        var obj_name = obj.parent().find(".taxi_table-body_td").eq(0).text();
        if(val_user !== null){
            $.ajax({
                type:"POST",
                dataType: "json",
                url:"/break/modules/taxi_edit.php",
                data:{
                    index: obj_ind,
                    index_val: val_user,
                    index_name: obj_name
                },
                success:function(respons){
                    if(respons == true ){
                        obj.empty();
                        if(obj_ind==4){
                            obj.text(val_user+":00");
                        } else{
                            obj.text(val_user);
                        }
                    } else {
                        alert("Что-то пошло не так! Обратитесь к Рыкуну.");
                    }
                },
                error: function(respons){
                    alert("К сожалению, проблемы с обработчиком. Перезагрузите страницу и попробуйте еще раз.")
                }
            }); 
        }
    }
}
function run(people){
    var del_name = $(people).parent().parent().find(".taxi_table-body_td").eq(0).text();
    if(confirm(del_name+" действительно пойдет пешком?")){
        $.ajax({
            type:"POST",
            dataType: "json",
            url:"/break/modules/taxi_delete.php",
            data:{
                name: del_name,
            },
            success:function(respons){
                if(respons == true ){
                    $(people).parent().parent().empty();
                } else {
                    alert("Что-то пошло не так! Обратитесь к Рыкуну.");
                }
            },
            error: function(respons){
                alert("К сожалению, проблемы с обработчиком. Перезагрузите страницу и попробуйте еще раз.")
            }
        }); 
    }
}


function del_it(people){
    var del_name = $(people).parent().text();

    if(confirm(del_name+" действительно поедет со всеми, как человек?")){
        $.ajax({
            type:"POST",
            dataType: "json",
            url:"/break/modules/taxi_delete.php",
            data:{
                name: del_name,
            },
            success:function(respons){
                if(respons == true ){
                    $(people).parent().remove();
                } else {
                    alert("Что-то пошло не так! Обратитесь к Рыкуну.");
                }
            },
            error: function(respons){
                alert("К сожалению, проблемы с обработчиком. Перезагрузите страницу и попробуйте еще раз.")
            }
        }); 
    }
}

function edit_car(car){
    var car_obj = $(car);
    var obj_parent =$("#car1").parent();
    var obj_name = car_obj.parent().parent().find(".taxi_table-body_td").eq(0).text();
    $.ajax({
        type:"POST",
        dataType: "json",
        url:"/break/modules/taxi_edit.php",
        data:{
            index: 3,
            index_val: car_obj.val(),
            index_name: obj_name
        },
        success:function(respons){
            if(respons == true ){
                obj_parent.find("input").remove();
                obj_parent.find("span").text(car_obj.val()).show();
                obj_parent.parent().removeClass();
                switch(car_obj.val()){
                    case "1": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_1");
                        break;
                    case "2": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_2");
                        break;
                    case "3": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_3");
                        break;
                    case "4": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_4");
                        break;
                    case "5": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_5");
                        break;
                    case "6": 
                        obj_parent.parent().addClass("taxi_table-body taxi_table-car_color_6");
                        break;
                }
            } else {
                alert("Что-то пошло не так! Обратитесь к Рыкуну.");
            }
        },
        error: function(respons){
            alert("К сожалению, проблемы с обработчиком. Перезагрузите страницу и попробуйте еще раз.")
        }
    }); 
}
