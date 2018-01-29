var fs=require('fs');
var stat=fs.stat;

var copy=function(src,dst){
    //��ȡĿ¼
    fs.readdir(src,function(err,paths){
        console.log(paths)
        if(err){
            throw err;
        }
        paths.forEach(function(path){
            var _src=src+'/'+path;
            var _dst=dst+'/'+path;
            var readable;
            var writable;
            stat(_src,function(err,st){
                if(err){
                    throw err;
                }
                
                if(st.isFile()){
                    readable=fs.createReadStream(_src);//������ȡ��
                    writable=fs.createWriteStream(_dst);//����д����
                    readable.pipe(writable);
                }else if(st.isDirectory()){
                    exists(_src,_dst,copy);
                }
            });
        });
    });
}

var exists=function(src,dst,callback){
    //����ĳ��·�����ļ��Ƿ����
    fs.exists(dst,function(exists){
        if(exists){//������
            callback(src,dst);
        }else{//����
            fs.mkdir(dst,function(){//����Ŀ¼
                callback(src,dst)
            })
        }
    })
}

exists('../from','../to',copy)