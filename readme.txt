databases:(mariaDB)
    user:
        增删改查
        用户名 密码 昵称 身份 vip
        修改密码/昵称 可以上传 身份,新增账号
        管理员可以删除用户,修改身份 
        --> id int AUTO_INCREMENT primary key
        id username password nickname admin
    musicList:
        增删改查
        标题 歌手 分类 歌词(可能需要再来个数据库) 上传时间
        管理员可以删除歌手/歌,修改/删除分类,修改歌词
        (用户也可以上传/修改歌词[有时间再说], 显示谁修改的歌词)
        id title author categroy lyric(text类型) created uploadId Imgurl mp3url
    likeList:
        增删(查)
        个人喜爱的列表 userid喜欢的音乐id
        可以删除喜爱,添加喜爱
        user删除时,他也要删
        note: 名字颠倒了一下(likelist和likeidlist)
        id belong loveId
    music: (这个也不是非要要,再说吧)
        增删改
        音乐本身 收藏数 点赞数 最好能再右上角显示, 放一首歌的时候可以一起返回吗?(不行的话就直接弄到一个表里)(算了)
        进行修改
        当删除musicList的时候,这边也要删除
        id musicId starNum likeNum

login Ok9/22
reg Ok9/22
(forgetPwd)
index htmlOk(9/23) 
    -歌曲 ok(9/24)
    -榜单 (没时间,先放着)
    -搜索 ok(9/24)
    -分类 ok(9/25)
    -登出 ok(9/24) (其它页面的登出还没判断) ok(9/25)
    -修改个人信息 ok(9/24)
    -我的喜欢 ok(9/24)
list  ok(9/24)
    -显示一些(歌曲)搜索结果
        -(+下拉列表,可选择搜索类别)(算了)
selfMusic htmlOK(9/23) methodOk(9/24)
    -收藏的歌
changeSelf htmlOk(9/23) methodOk(9/24)
    -修改个人信息 
musicDetail htmlOk(9/23) methodOk(9/25)
    -点赞(算了)
    -收藏   ok(9/25)
    -进度条(...也不是非要) ok(9/25)
    -声音(...也不是非要)
    -暂停/开始 ok(9/25)
    -(歌曲列表/歌词滚动/下一首/上一首/评论)
updateMusic htmlOk(9/23) methodOk(9/24)
    -上传歌(图片可选) 
Manage--管理员 htmlOk(9/23) ok(9/25)
    -歌曲管理
        -删除歌曲
        -(替换歌曲图片/歌词)
    -用户管理
        -删除用户
        -修改用户身份信息 ok(9/26)

9.25 资源整合
9.26 测试修改

隐患:
用户规则
css