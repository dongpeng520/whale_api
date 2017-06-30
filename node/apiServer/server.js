var express = require('express');
var bodyParser = require('body-parser');// 解析表单`post`数据
var mongoose = require('mongoose');
var session=require('express-session');
var mongoStore=require('connect-mongo')(session);
var serveStatic = require('serve-static');// 指定文件路径
var  _ = require('underscore');// _.extend()
var path = require('path');
var dbUrl='mongodb://127.0.0.1:27017/test1';

var app = express();
// 配置参数
var PORT = process.env.PORT || 5000;
// 数据库
mongoose.connect(dbUrl)

app.set('views', './views/pages');
// 设置视图的根目录
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'test1',
  store:new mongoStore({
  	url:dbUrl,
  	collection:'sessions'
  }),
  resave: false,
  saveUninitialized: true
}));

// 日志
var log4js = require('log4js');
log4js.configure({
    appenders: [
        {
            type: 'console'
        }, {
            type: 'file',
            filename: 'logs/access.log',
            maxLogSize: 9999,
            backups:4,
            category: 'normal'
        }
    ],
    replaceConsole: true
});
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level:'auto', format:':method :url'}));
global.logger = logger;

app.locals.moment = require('moment');// 格式化操作的时间


var  Movie = require('./models/movie');
var  User = require('./models/user');

// pre handle user
  app.use(function(req, res, next) {
    var _user = req.session.user
    app.locals.user = _user

    next()
  })

// 1.首页路由
app.get('/', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('index', {
			title: '视频首页',
			movies: movies
		});
	});
});
// 电影真正的更新地址
app.get('/admin/movie', function(req, res) {
	res.render('admin', {
		title: 'iMovie 后台管理',
		movie: {}
	});
});
// 电影post地址路由
app.post('/admin/movie/new', function(req, res) {
	// console.log("a");  经过判断是下方这个语句出了问题
	var id = req.body.movie._id;
	console.log("在post这个过程中id是:" + id); //undefined
	var movieObj = req.body.movie;
	var _movie;
	if (id) {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);
			_movie.save(function(err, movie) {
				if (err) {
					console.log(err);
				}
				//res.redirect('/movie/' + movie._id);
				res.redirect('/admin/list');
			});
		});
	} else {
		delete movieObj._id;
		_movie = new Movie(movieObj);
		_movie.save(function(err, movie) {

			if (err) {
				console.log("我是错误，我在这里");
				console.log(err);
			}
			console.log("跳转之前电影的id是：" + movie._id);
			//res.redirect('/movie/' + movie._id);
			res.redirect('/admin/list');
			console.log("这里是跳转之后");
		});
	}
});

//电影列表页路由
app.get('/admin/list', function(req, res) {
	Movie.fetch(function(err, movies) {
		if (err) {
			console.log(err);
		}
		res.render('list', {
			title: 'iMovie 后台-影片列表',
			movies: movies
		});
	});

});

//电影更新路由，admin update movie
app.get('/admin/update/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		Movie.findById(id, function(req, movie) {
			res.render('admin', {
				title: 'website 后台更新页',
				movie: movie
			});
		});
	} else {
		console.log("你的电影并没有成功录入进去");
	}
});
app.delete('/admin/list', function(req, res) {
  var  id = req.query.id;
  if (id) {
    Movie.remove({_id: id}, function(err, movie){
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    });
  }
});
//详情页
app.get('/movie/:id', function(req, res) {
	var id = req.params.id;
	console.log("这个/movie/:id的网页中的id是:" + id); // 424这个地方是可以打印出东西来的
	if (id) {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log("在这里出现了错误");
				return;
			}
			console.log(movie);
			res.render('detail', {
				title: "oh" + movie.title,
				movie: movie
			});
			//这里的意思其实给detail这个html文件传值
		});
	}
});
app.get('/results', function(req, res) {
	var catId = req.query.cat
	var q = req.query.q
	/*var page = parseInt(req.query.p, 10) || 0
	var count = 2
	var index = page * count*/
	if (catId) {
	Category
	  .find({_id: catId})
	  .populate({
	    path: 'movies',
	    select: 'title poster'
	  })
	  .exec(function(err, categories) {
	    if (err) {
	      console.log(err)
	    }
	    var category = categories[0] || {}
	    var movies = category.movies || []
	    var results = movies.slice(index, index + count)

	    res.render('results', {
	      title: 'imooc 结果列表页面',
	      keyword: category.name,
	      currentPage: (page + 1),
	      query: 'cat=' + catId,
	      totalPage: Math.ceil(movies.length / count),
	      movies: results
	    })
	  })
	}
	else {
	Movie
	  .find({title: new RegExp(q + '.*', 'i')})
	  .exec(function(err, movies) {
	    if (err) {
	      console.log(err)
	    }
	    movies=movies || {}
	    res.render('index', {
	      title: 'imooc 结果列表页面',
	      keyword: q,
	      movies: movies
	    })
	  })
	}
});
//注册页路由
app.post('/user/signup',function(req,res){
	var _user=req.body.user;
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/')
		}else{
			user=new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				return res.redirect('/admin/userlist')
			})
		}
	})

});
//用户登录
app.post('/user/signin',function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;
	User.findOne({name:name,password:password},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			console.log("用户或密码不正确")
			return res.redirect('/')
		}else{
			req.session.user=user;
			console.log("登录成功");
			return res.redirect('/');
		}
	})

});

//用户列表
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render('userlist', {
	      title: '用户列表',
	      users:users
	    })
	})
})
//删除用户
app.delete('/admin/dellist', function(req, res) {
  var  id = req.query.id;
  if (id) {
    User.remove({_id: id}, function(err, user){
      if (err) {
        console.log(err)
        res.json({success: 0})
      }
      else {
        res.json({success: 1})
      }
    });
  }
});
app.get("/logout",function(req,res){
	delete req.session.user
	res.redirect('/');
})
app.use(serveStatic(path.join(__dirname, 'public')));
// 404处理
app.use(function(req, res) {
	logger.error('[PAGE]Server.route: Try to load a resource that does not exist.');
    res.status(404).send({
        note: '404  Fail to Find Resource:' + req.originalUrl
    })
});
app.listen(PORT);
console.log(`app running at localhost:${PORT}`);