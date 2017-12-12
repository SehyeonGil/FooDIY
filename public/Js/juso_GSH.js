/**
 * Created by Sehyeon on 2017-07-31.
 */
function goPopup(){
    // 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrLinkUrl.do)를 호출하게 됩니다.
    var pop = window.open("/seller/jusoPopup","pop","width=570,height=420, scrollbars=yes, resizable=yes");
}
function jusoCallBack(roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn
    , detBdNmList, bdNm, bdKdcd, siNm, sggNm, emdNm, liNm, rn, udrtYn, buldMnnm, buldSlno, mtYn, lnbrMnnm, lnbrSlno
    , emdNo, entX, entY) {
    // 팝업페이지에서 주소입력한 정보를 받아서, 현 페이지에 정보를 등록합니다.
    /*document.juso.roadAddrPart1.value = roadAddrPart1;
     document.juso.roadAddrPart2.value = roadAddrPart2;
     document.juso.addrDetail.value = addrDetail;
     document.juso.zipNo.value = zipNo;
     document.juso.entX.value = entX;
     document.juso.entY.value = entY;*/
    $("#roadAddrPart1").val(roadAddrPart1).change();
    addrDetail=addrDetail+' '+roadAddrPart2;
    $("#addrDetail").val(addrDetail).change();
    $("#roadAddrPart2").val(roadAddrPart2).change();
    // document.getElementById('roadAddrPart1').value = roadAddrPart1;
    // document.getElementById('addrDetail').value = addrDetail;
    // document.getElementById('roadAddrPart2').value = roadAddrPart2;
    Proj4js.reportError = function (msg) {
        alert(msg);
    };

    Proj4js.defs['UTM-K'] = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"; // from
    Proj4js.defs['WG84'] = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

    var utmk = new Proj4js.Proj('UTM-K');
    var wg84 = new Proj4js.Proj('WG84');
    var p = new Proj4js.Point(entX, entY);

    Proj4js.transform(utmk, wg84, p);
    $("#entX").val(p.x).change();
    $("#entY").val(p.y).change();
    $("#zipNo").val(zipNo).change();
    //myMap(p.y,p.x);
}