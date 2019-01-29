// app application 应用程序
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
    {
        name: '张三',
        message: '今天天气不错！',
        dateTime: '2017-10-18'
    },
    {
        name: '王五',
        message: '今天伙食不错！',
        dateTime: '2018-10-16'
    },
    {
        name: '赵四',
        message: '今天温度不错！',
        dateTime: '2019-10-14'
    },
    {
        name: '王二',
        message: '今天雨水不错！',
        dateTime: '2019-01-02'
    },
    {
        name: '钱三',
        message: '今天阳光不错！',
        dateTime: '2018-10-19'
    }
]
// 结论：对于我们来讲，其实只需要判定，如果你的请求路径是 /pinglun 的时候，那我就认为你提交表单的请求过来了

var server = http.createServer();

server.on('request', function (req,res) {
//使用该方法将url解析为一个方便操作的对象，第二个参数true表示将字符串转成为一个对象
    var parsObj = url.parse(req.url, true)
    console.log(parsObj)
    //请求路径
    var pathname = parsObj.pathname
    if (pathname === '/')
    {
        fs.readFile('./views/index.html', function (err, data) {
            if (err){
                return res.end('404 Not Found1.')
            }
            //使用模版引擎，渲染comments内容
            var htmlStr = template.render(data.toString(), {
                comments: comments
            })
            res.end(htmlStr)
        })
    }else if (pathname === '/post'){

        fs.readFile('./views/post.html', function (err, data) {
            if (err){
                return res.end('404 Not Found2')
            }
            res.end(data)
        })
    } else if (pathname.indexOf('/public/') === 0){
        fs.readFile('.' + pathname, function (err, data) {
            if (err){
                return res.end('404 Not Found3')
            }
            return res.end(data)
        })
    }else if (pathname === '/pinglun'){
        //请求内容，数据是以key-value形式过来
        var comment = parsObj.query
        console.log(parsObj)
        comment.dateTime = '2018-11-2'
        comments.unshift(comment)
        //重定向表示位置
        res.statusCode = 302
        //重定向的目标路径
        res.setHeader('Location', '/')
        res.end()
    }else {
        return res.end('404 Not Found');
    }
});

server.listen(3000,function () {
    console.log('listen on 3000')
})