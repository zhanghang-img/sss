<?php
	header("content-type","text/html;charset=utf-8");
	
	//1接收数据
	$username = $_POST["username"];
	$userPass = $_POST["userpass"];
	
	$conn = mysqli_connect("localhost","root","root","2001db");
	
	//2、在数据库中查询
	// $mysqli_connect_db("2001db",$conn)
		include("./login.php");

	   //2)、执行SQL语句（查询）
	   $sqlStr="select * from vip where username='$username' and userpass='$userpass'";
	   
	   $result=mysql_query($sqlStr,$con);
	   
	   //3)、关闭连接
	   mysql_close($con);
	//3、响应结果
	//获得$result的行数
	$rows = mysql_num_rows($result);
	if($rows>0){//登录成功
		echo "success";	
	}else {//登录失败，返回0.
		echo "fail";
	}	
?>