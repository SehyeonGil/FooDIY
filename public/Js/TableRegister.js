/**
 * Created by Sehyeon on 2017-11-21.
 */
function tableRegister(val){
    //var item = {choice_mail: document.getElementById('agree_checkbox').value, tell: document.getElementById('phone_num').value, choice_sms:document.getElementById('agree_checkbox2').value, post:document.getElementById('zipNo').value, add1:document.getElementById('roadAddrPart1').value, add2:document.getElementById('addrDetail').value + " " + document.getElementById('roadAddrPart2').value, pointx:document.getElementById('entY').value, pointy:document.getElementById('entX').value};
    var item = {table_name: val.table_name.value, reservationType: val.reservationType.value, reservationTimeMin:val.reservationTimeMin.value, reservationTimeMax:val.reservationTimeMax.value,
        orderValueMin:val.orderValueMin.value, peopleCount:val.peopleCount.value, maxTime:val.maxTime.value, member_id:val.member_id.value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/table_register",
        data: item,
        success: function (data) {
            if (data === "clear") {
                location.replace("/seller/modify_profile");
            }
            else {
                $("#signupfail").html(data);
                $("#signupfail").css("color", "red");
                return false;
            }
        }
    });
}
function cancle() {
    location.replace("/seller/modify_profile");
}