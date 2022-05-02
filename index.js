const cmd = "申请白名单";

function getText(e) {
    var rt = '';
    for (i in e.message) {
        switch (e.message[i].type) {
            case "text":
                rt += e.message[i].text;
                break;
        }
    }
    return rt;
}

function RuncmdAll(cmd, self) {
	const cfg = NIL._vanilla.cfg;
    NIL.SERVERS.forEach((s, k) => {
        s.sendCMD(cmd, (dt) => { NIL.bots.getBot(self).sendGroupMsg(cfg.group.main, `${k}\n${dt}`) });
    });
}

function onStart(api){
	api.listen('onMainMessageReceived',(e)=>{
		let t = getText(e);
		if(t == cmd){
			if(NIL._vanilla.wl_exists(e.sender.qq)){
				let xbox = NIL._vanilla.get_xboxid(e.sender.qq);
                RuncmdAll(`allowlist add "${xbox}"`, e.self_id);
				e.reply(`尝试添加${e.sender.qq}的白名单(${xbox})到所有服务器`);
			}else{
				e.reply('你还没绑定xboxid!',true);
			}
		}
	});
}

module.exports = {
    onStart,
    onStop(){}
}