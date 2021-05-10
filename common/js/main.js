var c = 0;
var cnt = 30;       //カウントダウンの数字
var score = 0;　　　//得点用の数字
var sc_mog = 0;
var sc_ind = 0;

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];　　　　//配列
arr_shuffle(arr);
console.log(arr);

$(function () {
    var count = 0;
    var countup = function () {                  //モグラがランダムで出る関数
        $("ul li a").removeClass("mogura").removeClass("butu").removeClass("nise").removeClass("mogura_mid");     //毎回モグラをリセット

        var random = Math.floor(Math.random() * 9) + 1;
        var random2 = Math.floor(Math.random() * 9);




        if (random2 > 1) {
            $("ul li:nth-child(" + arr[count] + ") a").addClass("mogura");　　　　　　//モグラをランダムで表示　//randomは文字列として認識
        } else {
            $("ul li:nth-child(" + arr[count] + ") a").addClass("nise")              //randomの値が1以下の時は偽物表示
        }

        count++;
        if (count == arr.length) {
            var now = arr[count - 1];

            count = 0;
            arr_shuffle(arr);
            if (now == arr[0]) {
                var zero = arr.shift();
                arr.push(zero);
            }
        } else {

        }

    }

    var flg = false;               //変数flgにfalseを付与
    var flg2 = false;
    $("ul").hide();
    $("#start").on("click", function () {           //スタートボタンを押したとき処理開始
        $("ul").show();
        $("#mogura_wrap img").hide();
        base = setInterval(countup, 1000);                 //変数countupを1秒ごとに実行
        $("#start").hide();


        var cnt = 30;                //カウントダウン開始
        cnDown = function () {
            if (cnt >= 20) {
                cnt--;                //カウントを減らす
                $('#countdown').text(cnt);
            }

            else if (cnt >= 10) {
                if (!flg) {
                    flg = true;
                    cnt--;
                    $('#countdown').text(cnt);
                    clearInterval(base);　　　　　　　　　　//最初のbaseを停止
                    speed = setInterval(countup, 700)　　//このままだとループで重複　　　　//フラグを立てて一回だけ実行させる   console.logでミリ秒を取得したい
                } else {
                    cnt--;
                    $('#countdown').text(cnt);
                }

            } else if (cnt >= 1) {
                if (!flg2) {
                    flg2 = true;
                    cnt--;
                    $('#countdown').text(cnt);
                    clearInterval(speed)                   //speedを停止
                    setInterval(countup2, 600)　　　//このままだとループで重複する　　　　　//フラグを立てて一回だけ実行させる
                } else {
                    cnt--;
                    $('#countdown').text(cnt);
                }



            } else if (cnt <= 0) {
                clearInterval(countup)
                clearInterval(countup2)
                clearInterval(cnDown)
                clearInterval(speed);
                clearInterval(base);
                $("#goal").html("<img src='common/img/omedetou.jpg'>");      //画像をアニメーションさせたい
                $("ul").hide();     　　　　　　　　　　　　 //終了したらulを隠す
                $("#countdown").hide();
                $("#score").hide();
                $("#text").show();
                $("#text").html("あなたの得点は" + score + "点です")
                $("#text2").show();
                $("#text2").html("あなたは" + sc_mog + "匹のモグラと、" + sc_ind + "人のインド人を葬り去りました")
                $("#reset").show();　　　　　　　　　　　　//最後にボタンを表示
            }
        }
        setInterval(cnDown, 1000);

        $("#reset").on("click", reset);           //リセットボタンを押したときの処理
        function reset() {
            clearInterval(countup);
            clearInterval(countup2);
            clearInterval(cnDown);
            clearInterval(speed);
            $("li a").removeClass("butu");
            $("ul").show();
            $("img").remove();
            $("#text").hide();
            $("#text2").hide();
            $("#reset").hide();
            $('#score').show();
            $("#countdown").show();
            score = 0;
            cnt = 30;
            flg = false;               //変数flgにfalseを付与
            flg2 = false;
            cnDown();
        };



    });





    $("#reset").hide();                             //まずボタンを隠す
    $("ul li a").on("click", function () {　　　　　　//モグラの絵を叩いたら
        console.log($(this).attr("class"));　　　　　//classが何なのか取得する

        var point = $(this).hasClass("mogura");     //もしクラスにモグラがあったら
        var nise = $(this).hasClass("nise")    //もしクラスに偽モグラがあったら
        if (point) {　　　　　　　　　　　　　　　　　　//100点加点
            score += 100
            sc_mog += 1
            $("#score span").text(score);
            $(this).addClass("butu");
        } else if (nise) {　　　　　　　　　　　　　　　　　　　　//100点減点
            score -= 100
            sc_ind += 1
            $("#score span").text(score);
            $(this).addClass("butu");
        };


        // var butta = $(this).hasClass("butu");　　　　　//クラスbutuがついているか確認する
        //　                //buttaで確認した後にbutuを付与する


    })




    ///後半インド人が多く出る用
    var countup2 = function () {                  //モグラがランダムで出る関数
        $("ul li a").removeClass("mogura").removeClass("butu").removeClass("nise").removeClass("mogura_mid");     //毎回モグラをリセット

        var random = Math.floor(Math.random() * 9) + 1;
        var random2 = Math.floor(Math.random() * 9);



        /////////後半インド人が多く出る
        if (random2 > 0) {
            $("ul li:nth-child(" + arr[count] + ") a").addClass("nise")              //randomの値が1以下の時は偽物表示
        } else {
            $("ul li:nth-child(" + arr[count] + ") a").addClass("mogura");　　　　　　//モグラをランダムで表示　//randomは文字列として認識

        }

        count++;
        if (count == arr.length) {
            var now = arr[count - 1];

            count = 0;
            arr_shuffle(arr);
            if (now == arr[0]) {
                var zero = arr.shift();
                arr.push(zero);
            }
        } else {

        };

    };





    /////////
});


function arr_shuffle(arr) {　　　　　　　　　//配列をシャッフル
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }



}


