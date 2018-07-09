window.onload=function(){

var res=document.querySelector('.res');
var top=document.querySelector('.top');
calculator.onmouseover=function(event){
	var target=event.target;
	if (target.tagName!='INPUT') 
		return;
	var atr=target.getAttribute('type');
	if (atr=='text') 
		return;
	target.classList.add('orange');
}
calculator.onmouseout=function(event){
	event.target.classList.remove('orange');
}
calculator.onclick=function(event){
	var target=event.target;
	if (target.tagName!='INPUT')
		return;
	var atr=target.getAttribute('type');
	if (atr=='text') return;
	var val=target.value;
	if(!isNaN(val)){
		calc.numberClick(val,res);
	}
	 if(val=='+'||val=='-'||val=='*'||val=='/'){
		calc.operationClick(val,res,top);
	}
	if(val=='='){
		calc.equalClick(res,top)
	}
	if(val=='C'){
		calc.clearClick(res,top);
	}
	if(val=='.'){
		calc.pointClick(val,res);
	}	
}
var calc={
	replace:true,
	repeatoperation:false,
	memory:0,
	clearClick:function(res,top){
		res.value='0';
		top.value='';
		this.memory=0;
		this.repeatoperation=false;
		this.replace=true;
	},
	numberClick: function(value,res){
		if (this.replace){
			res.value=value,
			this.replace=false;
		}
		else {
			res.value+=value;
		}
	},
	operationClick:function(value,res,top){
		top.value+=res.value+value;
		//this.replace=true;
		if (this.repeatoperation==false) {
			this.memory=top.value;
			this.repeatoperation=true;
		}
		else{
			res.value=eval(this.memory+res.value);
			this.memory=res.value+value;
		}
		this.replace=true;
	},
	equalClick:function(res,top){
		res.value=eval(this.memory+res.value)
		top.value='';
		this.replace=true;
		this.repeatoperation=false;
		this.memory=0;
	},
	pointClick:function(val,res){
		if (this.replace) {
			res.value='0.';
			this.replace=false;
			return;
		}
		var str=res.value;
		var pos=str.indexOf('.');
		if (pos!=-1) return;
		res.value+=val;
	}

}



}