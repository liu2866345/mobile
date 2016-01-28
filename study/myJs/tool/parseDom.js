
;(function(win){
    var _stringToDom = function(str){
        var stack = [];
        var newDomArr = [];
        var errorMes = "";
        var node = function(){
            this.text = "";//解析前的字符串
            this.son  = []; //孩子节点
            this.position = -1
        };
        for(var i=0;i<str.length;i++){
            var stackTop = stack[stack.length-1];
            if(typeof stackTop != "undefined" && stackTop.text)
            {
                if(str.charAt(i)==">")
                {//改字符是结束字符
                    if(str.charAt(i-1) == "/"){//非闭合标签
                        if(this.isStart(stackTop) && !this.isOver(stackTop)){
                            stackTop.text = stackTop.text+">";
                            //出栈
                            stackTop.position = newDomArr.length;
                            newDomArr.push(stackTop);
                            stack.splice(stack.length-1,1);
                            continue;
                        }else{
                            errorMes= "error no corrent start tag"
                        }
                    }
                    if(this.isStart(stackTop) && this.isOver(stackTop)){
                        stackTop.text = stackTop.text+">";
                        stackTop.position = newDomArr.length;
                        newDomArr.push(stackTop);
                        stack.splice(stack.length-1,1);
                    }
                    if(this.isStart(stackTop) && !this.isOver(stackTop)){
                        stackTop.text = stackTop.text+">";
                    }
                    if(!this.isStart(stackTop) && !this.isOver(stackTop)){
                        errorMes= "error";
                    }
                }else if(str.charAt(i)=="<")
                {//改字符是开始字符
                    if(i+1 < str.length && str.charAt(i+1)=="/"){
                        if(this.isOver(stackTop)){
                            errorMes= "error duplicate over tag";
                        }
                        if(this.isStart(stackTop)){
                            stackTop.text = stackTop.text+"<";
                        }else{
                            errorMes= "error no start tag";
                        }
                    }else{//<下一个不是/-->是新节点
                        if(this.isStart(stackTop) && this.isOver(stackTop)){
                            errorMes= "error tag is not fixed";
                        }else{
                            if(this.isStart(stackTop)){
                                var newNode = new node();
                                newNode.text = "<";
                                stackTop.son.push(newNode);
                                stack.push(newNode);
                            }else{
                                errorMes= "error no start tag";
                            }
                        }
                    }
                }else{//其他字符直接append
                    stackTop.text = stackTop.text+ str.charAt(i);
                }
            }else{//空战
                var newNode = new node();
                newNode.text = str.charAt(i);
                stack.push(newNode);
            }
        };
        if(errorMes)
        {
            return 'parse fail reason is'+errorMes;
        }
        return this.contactNode(newDomArr);
    };
    _stringToDom.prototype.contactNode = function(arr){
        var crateArr = [];//已创建节点标记
        for(var i in arr){
            var _thisDom;
            if(!arr[i].dom){//没创建节点
                 arr[i].dom =  _thisDom = this.strToObj(arr[i].text);
            }else{
                _thisDom = arr[i].dom;
            }
            var sonArr = arr[i].son;
            //把son append到自己的子元素中
            for(var k in sonArr){
                var _sonDom;
                if(!sonArr[k].dom){//没创建节点
                    sonArr[k].dom =  _sonDom = this.strToObj(sonArr[k].text);
                }else{
                    _sonDom = sonArr[k].dom;
                }
                _thisDom.appendChild(_sonDom);
            }
        }
        return arr[arr.length-1].dom;
    };
    _stringToDom.prototype.strToObj = function(str){//将节点字符变为节点对象
        var _domString = str;
        var node;
        //<div id="" class="" >aaa</div>
        //<div></div>
        //<input />
        var fullTag =  /^<[\w]+[\s\S]*>[\s\S]*<\/\w+>$/;//判断是否为全标签
        var shortTag = /^<[\w]+\s+[\w\W]*\/>$/;//短标签
        if(str.match(fullTag) != null){
            var name = str.match(/^<\w+/);//匹配开始标签
            name = name[0].match(/\w*$/);
            var text = str.match(/>[^>]*</);
            text = text[0].replace(/>|</g,'');
            var attr = str.match(/^<\w+\s+[^\/>]*>/);
            attr = attr!=null?attr[0].match(/\w+="("|([^"][\w\W]*"))/g):[];
            node = document.createElement(name);
            node.innerHTML = text;
            for(var i in attr){
                attr[i].split("=")[0]
                node.setAttribute(attr[i].split("=")[0],attr[i].split("=")[1].replace(/"|'/g,""));
            }
        }else if(str.match(shortTag) != null){
            var name = str.match(/^<\w+/);//匹配开始标签
            name = name.substring(1,name.length-1);

            var attr = str.match(/\w+="("|([^"][\w\W]*"))/g);
            node = document.createElement(name);

            for(var i in attr){
                attr[i].split("=")[0]
                node.setAttribute(attr[i].split("=")[0],attr[i].split("=")[1]);
            }
        }else{
            return "error dom construct error"
        }
        return node;
    };
    _stringToDom.prototype.isStart = function(top){//是否含有开始标志
            var topText = top.text;
            var regex = /^<[^\/]/;
        return topText.match(regex)==null?false:true;
    }
    _stringToDom.prototype.isOver = function(top){//是否含有结束标志
        var topText = top.text;
        var regex = /^[\W\w\s]*<\/[\W\w\s]*/;
        return topText.match(regex)==null?false:true;
    }
    win.stringToDom = _stringToDom;
})(window);


