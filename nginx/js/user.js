var old = '';
var part = 0;
var more = 0;
$(window).on('load', () => {
    toastr.options = {
        "closeButton": true
    }

    checkData();
    loading()

    $("#filter").keyup(function () {
        var filter = $(this).val(), count = 0;
        $.ajax({
            url: '/getcount',
            type: 'POST',
            dataType: 'json',
            success: (data) => {
                if (data != "") {
                    var urlById = '';
                    var n = data[0].split(',');
                    for (i = 0; i <= n.length - 1; i++) {
                        urlById = 'getid/' + n[i];
                        $.ajax({
                            url: urlById,
                            type: 'post',
                            dataType: 'json',
                            async: true,
                            success: (data) => {
                                $("#profile-"+data).each(function () {
                                    console.log("ta za sho--------------> "+filter)
                                    if ($(this).text().search(new RegExp(filter, "m")) < 0) {
                                        $(this).fadeOut();
                                    } else {
                                        $(this).show();
                                        count++;
                                    }
                                });
                            }
                        })
                    }
                }
            }
        })
    });
})

function loading() {
    $.ajax({
        url: '/getcount',
        type: 'post',
        dataType: 'json',
        success: (data) => {
            if (data != "") {
                var urlById = '';
                var n = data[0].split(',');
                var len = n.length;
                for (i = more; i <= len - 1; i++) {
                    urlById = 'getid/' + n[i];
                    part++;
                    console.log('ajax success!', urlById);
                    $.ajax({
                        url: urlById,
                        type: 'post',
                        dataType: 'json',
                        async: false,
                        success: (data) => {
                            $('#data').append('<div class="card" style="margin-bottom: 10px" id="profile-' + data + '"> <div class="card-body" id="p-' + data + '"> <ui><h3><i id="tt'+data+'" class="fa fa-user-circle" aria-hidden="true">' + data + '</h3></ui></div></div>')
                            var div = document.getElementById("p-"+data); // ! подумать над выводом имени + фамилии
                            var tt = document.getElementById("tt"+data);
                            div.onclick = function (e) {
                                var e = e || window.event;
                                var target = e.target || e.srcElement;
                                if (this == target){
                                    $('#info').html('Это профиль: '+data); //вывод информации профиля
                                }
                            }
                            tt.onclick = function (e) {
                                var e = e || window.event;
                                var target = e.target || e.srcElement;
                                if (this == target) {
                                    $('#info').html('Это профиль: '+data);
                                }
                            }

                        }
                    })
                }
            }
        }
    })
}

function checkData() {
    $.ajax({
        url: '/check',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            old = data;
            setInterval(refreshData, 5000);
        }
    })
}

function refreshData() {
    $.ajax({
        url: '/check',
        type: 'post',
        dataType: 'json',
        success: function (data) {
            if (old != data) {
                toastr["info"]("У нас новый пользователь: " + data + " <a href='profile/" + data + "' type='button' class='btn btn-success'> Посмотреть профиль </a>")
                old = data;
                $('#data').append('<div class="card" style="margin-bottom: 10px" id="profile-' + data + '"> <div class="card-body"> <ui><h3><i id="tt'+data+'" class="fa fa-user-circle" aria-hidden="true">' + data + '</h3></ui></div></div>')
            } else {
                //console.log("nothing")
            }
        }
    })
}