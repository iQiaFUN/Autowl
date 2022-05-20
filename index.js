const path = require('path');
const tmpcfg = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'example.json')));

function checkFile(file, text) {
    if (NIL.IO.exists(path.join(__dirname, file)) == false) {
        NIL.IO.WriteTo(path.join(__dirname, file), text);
    }
}

checkFile("config.json", tmpcfg);
const cfg = JSON.parse(NIL.IO.readFrom(path.join(__dirname, 'config.json')));

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
	const vcfg = NIL._vanilla.cfg;
    NIL.SERVERS.forEach((s, k) => {
        s.sendCMD(cmd, (dt) => { NIL.bots.getBot(self).sendGroupMsg(vcfg.group.main, `${k}\n${dt}`) });
    });
}
class AutoWL extends NIL.ModuleBase{
    onStart(api){
        api.listen('onMainMessageReceived',(e)=>{
            let t = getText(e);
            if(t == cfg.cmd){
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
    onStop(){}
}

module.exports = new AutoWL;