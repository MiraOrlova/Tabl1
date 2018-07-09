window.onload=function(){

var index=null;
var add=document.getElementById('addUser');
var update=document.getElementById('upDate');
var table=document.getElementById('table');
var name=document.getElementById('name');
var age=document.getElementById('age');
var salary=document.getElementById('salary');

function getUsers(){
	table.innerHTML='';
	var xhr=new XMLHttpRequest();
	xhr.open('get','/getusers',true);
	xhr.send();
	xhr.onreadystatechange=function(){
		if (xhr.readyState !=4) return;
		if (xhr.status !=200)
		console.log(xhr.status+':'+xhr.statusText);
		else {
		 	//console.log(xhr.responseText);
		 	//амість console
		 	var mas=JSON.parse(xhr.responseText);
		 	//console.log(mas);
		 	
		 	for (var i=0;i<mas.length;i++){
		 		var tr=document.createElement('tr');
		 		table.appendChild(tr);
		 		for (var key in mas[i]){
		 			var td=document.createElement('td');
		 			tr.appendChild(td);
		 			td.innerHTML=mas[i][key];
		 		}
		 		var td=document.createElement('td');
		 		tr.appendChild(td);
		 		var btn=document.createElement('button');
		 		td.appendChild(btn);
		 		btn.classList.add('delete');
		 		btn.innerHTML='Delete';
		 		btn.onclick=DeleteUser;

		 		var td=document.createElement('td');
		 		tr.appendChild(td);
		 		var btnup=document.createElement('button');
		 		td.appendChild(btnup);
		 		btnup.classList.add('update');
		 		btnup.innerHTML='Update';
		 		btnup.onclick=function(){
		 			var row=this.parentNode.parentNode;
		 			index=row.rowIndex;
		 			var tds=row.querySelectorAll('td');
		 			name.value=tds[0].innerHTML;
		 			age.value=tds[1].innerHTML;
		 			salary.value=tds[2].innerHTML;
		 		}
		 		
		 	}
		} 
	}
}
getUsers();

function DeleteUser(){
	var index=this.parentNode.parentNode.rowIndex;
	//alert(index);
	var xhr=new XMLHttpRequest();
	var obj={index:index}
	var objson=JSON.stringify(obj);
	xhr.open("POST", '/delete', true);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.send(objson);
	xhr.onreadystatechange=function(){
		if (xhr.readyState !=4) return;
		if (xhr.status !=200)
		console.log(xhr.status+':'+xhr.statusText);
		else{
		console.log(xhr.responseText);
		getUsers();
		}	
	}
}

function addUsers(user){
	var xhr=new XMLHttpRequest();
	xhr.open('post','/addusers',true);
	var obj=JSON.stringify(user);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.send(obj);
	xhr.onreadystatechange=function(){
		if (xhr.readyState !=4) return;
		if (xhr.status !=200)
		console.log(xhr.status+':'+xhr.statusText);
		else{
		console.log(xhr.responseText);
		getUsers();
		}	
	}
}

add.onclick=function(){
	var user={
		name: name.value,
		age:age.value,
		salary:salary.value
	}
addUsers(user);	
}

update.onclick=function(){
	var xhr=new XMLHttpRequest();
	xhr.open('post','/updateusers',true);
	var user={
		name: name.value,
		age:age.value,
		salary:salary.value
	}
	user.rowIndex=index;
	var obj=JSON.stringify(user);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.send(obj);
	xhr.onreadystatechange=function(){
		if (xhr.readyState !=4) return;
		if (xhr.status !=200)
		console.log(xhr.status+':'+xhr.statusText);
		else{
		console.log(xhr.responseText);
		getUsers();
		}	
	}
}




}