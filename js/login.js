$(document).ready(function(){
	
	$(function () {
	    // 1、产生验证码
	    showCode();
	
	    // 2、点击span，重新产生验证码
	    $("#codeSpan").click(function () {
	        showCode();
	        // 把验证码发到后端
	        sendCode();
	    });
	
	    // 3、登录
	    $("#btnLogin").click(function () {
	        if ($("#code").val() != $("#codeSpan").html()) {
	            alert("验证码不正确");
	            showCode();
	            return;
	        }
	        login();
	    });
	});
	
	function showCode() {
	    $("#codeSpan").html(getCode(4));
	}
	
	function getCode(n) {
	    let str = "";
	    for (let i = 0; i < n; i++) {
	        str = str + parseInt(Math.random() * 10);
	    }
	    return str;
	}
	
	function sendCode() {
	    $.get("code.php", {
	        "code": $("#codeSpan").html()
	    });
	}
	
	function login() {
	    $.post(
	        "./php/login.php",
	        {
	            "username": $("#userId").val(),
	            "userpass": $("#passId").val()
	        },
	        show
	    );
	}
	
	function show(result) {
		// console.log(result)
	    if (result == "1") {
	        // 1、存储cookie
	        addCookie("username", $("#userId").val(), 7);
	        // 2、显示提示信息
	        let count = 5;
	        $("#message-box").html(`亲，恭喜您，登录成功，${count}秒钟后，跳转到<a href="index.html">首页</a>`);
	        let myTimer = setInterval(() => {
	            count--;
	            if (count == 0) {
	                window.clearInterval(myTimer);
	                window.location.href = "index.html";
	                return;
	            }
	            $("#message-box").html(`亲，恭喜您，登录成功，${count}秒钟后，跳转到<a href="index.html">首页</a>`);
	        }, 1000);
	    } else {
	        $("#message-box").html(`亲，不好意思，登录失败，用户名或者密码错误！`);
	        showCode();
	    }
	}
	
})


