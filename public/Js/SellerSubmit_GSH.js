/**
 * Created by Sehyeon on 2017-11-16.
 */
function submitseller(){
    var item = {choice_mail: document.getElementById('agree_checkbox').value, tell: document.getElementById('phone_num').value, choice_sms:document.getElementById('agree_checkbox2').value, post:document.getElementById('zipNo').value, add1:document.getElementById('roadAddrPart1').value, add2:document.getElementById('addrDetail').value + " " + document.getElementById('roadAddrPart2').value, pointx:document.getElementById('entY').value, pointy:document.getElementById('entX').value};
    $.ajax({
        method: "POST",
        type: "POST",
        url: "/seller/submit_seller",
        data: item,
        success: function (data) {
            if (data === "clear") {
                alert("판매자 등록을 축하합니다!");
                location.replace("/seller/manage");
            }
            else {
                $("#signupfail").html(data);
                $("#signupfail").css("color", "red");
                return false;
            }
        }
    });
}