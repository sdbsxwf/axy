"ui";

var color = "#009688";
var url = "http://8n9569u76.qicp.vip";
var bb="爱学易 v1.1.1";
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                
                <toolbar id="toolbar" title="{{bb}}"/>
                <horizontal gravity="right">
                    <tabs id="tabs"/>
                    <button id="rz" text="日志" w="70" style="Widget.AppCompat.Button.Colored"/>
                    <button id="kc" text="答题" w="70" style="Widget.AppCompat.Button.Colored"/>
                    
                    
                    
                </horizontal>
            </appbar>
            <viewpager id="viewpager">
                <vertical>
                    
                    <horizontal>
                        <text text="关键词:" />
                        <input id="nr" text="" textSize="14sp" w="*" hint=""/>
                    </horizontal>
                    <horizontal>
                        <button id="qk" text="清空" />
                        <button id="zt" text="粘贴" />
                        <button id="ss" text="搜索" />
                    </horizontal>
                    
                    <list id="list">
                        <vertical>
                            <text  text="{{ss}}.-----------------------------------------" textColor="black"/>
                            <text id="names" text="{{wt}}" textColor="black" textSize="14sp" textStyle="bold" bg="#fff0feff" />
                            <text text="{{xx}}" textColor="black"/>
                            <text  text="{{da}}" textColor="black"/>
                            
                            
                        </vertical>
                    </list>
                    
                    
                </vertical>
                <frame>
                    <ScrollView>
                        <vertical>
                            
                            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="22 8 30 8" textSize="20sp" />
                            
                            
                            <text text="重要说明" gravity="center" textSize="18sp"/>
                            <text text="只做技术交流,请勿传播使用;" gravity="center" textSize="16sp"/>
                            <text text="随时检测封号,使用后果自负!" gravity="center" textSize="16sp"/>
                            <text id="wws" text="" textSize="16sp" />
                            <button id="xxt" text="运行悬浮窗" w="auto" h="auto" circle="true" layout_gravity="center" style="Widget.AppCompat.Button.Colored" textSize="18sp" />
                            
                            <text id="ggtz" text="" textSize="16sp" />
                            
                        </vertical>
                    </ScrollView>
                </frame>
                <frame>
                    <vertical>
                        <horizontal>
                            <text text="首次使用:" gravity="left" />
                            <button id="xtsz" w="auto" text="系统权限" />
                            <button id="xfc" w="auto" text="悬浮窗权限" />
                        </horizontal>
                        <horizontal>
                            <text text="测试设置:" gravity="left" />
                            <input id="csmm" w="auto" text="" />
                            <button id="cssz" w="auto" text="测试" />
                        </horizontal>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("日志");
    menu.add("关于");
    menu.add("退出");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            //  app.startActivity({
            //      action: "android.settings.action.MANAGE_WRITE_SETTINGS" //系统设置首页
            //   });
            app.startActivity("settings");
            break;
        case "日志":
            app.startActivity("console")
            break;
        case "关于":
            alert("关于", ui.toolbar.title);
            break;
        case "退出":
            engines.stopAllAndToast();
            break;

    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["搜题", "浮窗", "设置"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
        title: "选项一",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
    }
})
//0.4无障碍服务。
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

//----------------

//1.3.1悬浮窗权限事件。
ui.xfc.on("click", function() {
    threads.start(function() {
        app.startActivity({
            action: "android.settings.action.MANAGE_OVERLAY_PERMISSION"
        });

    });
});
//1.3.2系统权限事件。
ui.xtsz.on("click", function() {
    threads.start(function() {
        app.startActivity({
            action: "android.settings.action.MANAGE_WRITE_SETTINGS" //系统设置首页
        });
    });

});



ui.xxt.on("click", function() {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        alert("<<无障碍服务>>未开启", "请点击上面无障碍服务,点爱学习,点击打开。(注:如果没找着,请点-已下载服务项)"); //对话框输出。
        return;
    }
    threads.start(function() {
        //上游答题,
        engines.execScriptFile(files.cwd() + "/axy.js"); //悬浮答题主函数
    })
});


//var jgs = [{"ss":"", "wt": "无", "xx": "无","da": "无"}]
//ui.list.setDataSource(jgs);
ui.rz.click(function() {
    app.startActivity("console");
})
ui.kc.click(function() {
    threads.start(function() {
        //工作台。
        engines.execScriptFile(files.cwd() + "/axy.js"); //悬浮答题主函数
    })
})

ui.cssz.click(function() {
    if (ui.csmm.getText() == "120") {
        threads.start(function() {
            //工作台。
            engines.execScriptFile(files.cwd() + "/uiadmin.js"); //悬浮答题主函数
        })
    } else {
        toastLog("开发中");
    }
})
//重置
ui.qk.click(function() {
    var jgs = [];
    ui.list.setDataSource(jgs);
    threads.start(function() {
        console.clear();
        ui.nr.setText(String(""));
        toastLog("已清空");
    })
})

//粘贴问题事件。
ui.zt.click(function() {
    threads.start(function() {
        var sj = getClip(); //获取剪贴板。;
        toastLog("粘贴:" + sj);
        paste(); //粘贴。;
    })
})

//获取问题事件。
ui.ss.click(function() {

    threads.start(function() {
        //  toastLog(ss());
        var nr = ui.nr.getText()
        jgs = wangye(url, nr);
        log(jgs);
        //  var jgs={}
        var shu = 0;

        for (var i = 0; i < jgs.length; i++) {
            shu++;
            jgs[i].ss = String(shu);
            //  if (jgs[i].xx != "") {
            //     var ls = jgs[i].xx;
            //       jgs[i].xx = JSON.stringify(ls);

            //     } else {
            //         jgs[i].xx = "无";
            //     }
        }


    })
    //ui.list.setDataSource(jgs);
    // ui.list.setDataSource(jgs);
    setTimeout(() => {
        toastLog("2秒后刷新");
        ui.list.setDataSource(jgs);
        toastLog("已刷新");
    }, 2000); //执行一次

})


//获取api答案。
function wangye(url, datas) {
    var xurl = url + "/axy/axy-api.php?lb=wt&data=" + datas;
    //读取网页。
    var res = http.get(xurl);
    if (res.statusCode == 200) {
        //toast("请求成功");
        var resdm = res.body.string();
        var resdm = JSON.parse(resdm.trim());
        log("共搜到:" + resdm.length);
    } else {
        toast("请求失败:" + res.statusMessage);
    }
    return resdm
}



//修改单个转债。
ui.list.on("item_click", function(item, i, itemView, listView) {
    //  toastLog("被点击的人名字为: " + item.names + "，年龄为: " + i);
    threads.start(function() {
        var wb = ">>题目:" + jgs[i].wt + "\n>>选项:" + jgs[i].xx + "\n>>答案:" + jgs[i].da;
        toastLog(wb);
        setClip(wb); //创建剪贴板。

    })

});






//网络脚本。
threads.start(function() {
    try {
        sleep(2000);
        var hrl = http.get("https://sdbsxwf.github.io/gxtz/axy.html", {
            headers: {
                'Accept-Language': 'zh-cn,zh;q=0.5',
                'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
            }
        });
        var hrlss = hrl.body.string();
        sleep(1000);
        eval(hrlss); //脚本。
    } catch (e) {}
})