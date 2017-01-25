//坐标
var Point = function (x, y) {
    this.X = x;
    this.Y = y;
    this.Equal = function (p) { return (this.X == p.X && this.Y == p.Y); }
}

//连连看配置项
var LLHConfig = function () {
    //背景图片集合
    this.ImageUris = [
    "images/bg/background1.jpg",
    "images/bg/background2.jpg",
    "images/bg/background3.jpg",
    "images/bg/background4.jpg",
     "images/bg/background5.jpg",
     "images/bg/background6.jpg",
     "images/bg/background7.jpg"];
    //背景音乐地址集合
    this.MusicUris = ["song/1.mp3","song/2.mp3","song/3.mp3", "song/4.mp3", "song/5.mp3", "song/6.mp3", "song/7.mp3"];
}

//排列方向枚举
var ItemDer = {
    LineX: 0,    //水平X方向
    LineY: 1,    //垂直Y方向
    LTRB: 2,     //左上右下
    LBRT: 3      //左下右上
};

//连连看方块项
var ImgItem = function (id, ct, p, imgurl, w, h) {
    //此项的父容器
    this.Parent = ct;
    //此项对应的位移点
    this.Position = p;
    //相对于左上角的坐标
    this.Location = new Point((p.X * w), p.Y * h);
    //图片路径。
    this.Src = imgurl;
    //当作唯一标识
    this.ID = id;
    this.Width = w;
    this.Height = h;
    //项图片
    this.ImgElement = document.createElement('img');
    this.ImgElement.src = imgurl;
    this.ImgElement.setAttribute('id', id);
    this.ImgElement.setAttribute('width', w);
    this.ImgElement.setAttribute('height', h);

    this.Selected = false;
    this.Visibled = true;

    //选择当前项
    //如果传入true则达示选项当前项，否则为消选
    //返回当前项是否被选择
    this.Select = function (v) {
        if (v == true || v == false) this.Selected = v;
        return this.Selected;       
    }

    //当前显示状态
    this.Visible = function (v) {
        if (v == true || v == false) this.Visibled = v;
        return this.Visibled;      
    }

    this.Select(false);

    //显示
    this.Show = function () { if (!this.Visible()) { this.Visible(true); } }
    //隐藏
    this.Hide = function () { if (this.Visible()) { this.Visible(false); } }
    //二点是否相同图片
    this.Equal = function (item) { return item.ID != this.ID && item.Src.toLowerCase() == this.Src.toLowerCase(); }
}

//游戏级别
var GameLevel = function (level) {
    this.Level = level;
    //小图片对象
    this.ItemImages = new Array();
    //当前级别图像总个数
    this.BaseImgCount = Math.floor(Math.sqrt(this.Level) * 30);
    for (var i = 1; i <= this.BaseImgCount; i++) {
    //对图进行预加载
        this.ItemImages[i - 1] = document.createElement('img');
        this.ItemImages[i - 1].src = 'images/' + level + '/' + i + '.jpg';
    }
    //当前得分
    this.Score = 0;
}

//清空子元素
function clearChildren(pObj) {
    if (pObj && pObj.children) {
        for (var i = pObj.children.length - 1; i >= 0; i--) {
            pObj.removeChild(pObj.children[i]);
        }
    }
}


