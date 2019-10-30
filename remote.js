/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : 
 * @Date          : 2019-10-28 16:19:56
 * @LastEditors   : fineemb
 * @LastEditTime  : 2019-10-31 01:56:57
 */
const locale = {
}
class RemoteCard extends Polymer.Element {
    static get template() {
        return Polymer.html`
        <style>
            .remote_f{
                display:flex;
                flex-wrap: wrap;
            }
            .f-ha-card{
                padding: 1pc;
                background: var(--paper-card-background-color);
                
            }
           
            .remote_f {
                --box-shadow:2px 2px 5px rgba(0, 0, 0, 0.3);
                --button-shadow-color:#00bcd4;
            }
            .box {
                padding: 10px;
                overflow: hidden;
                flex:1.25;
            }
            .boxb {
                flex:0.75;
                min-width: 140px;
                margin-left: 15px;
            }
            .scale {
                width: 100%;
                padding-bottom: 100%;
                height: 0;
                position: relative;
            }
          .button-group {
            width: 100%;
            height: 100%;
            position: absolute;
          }
          .outter-circle {
            position: relative;
            width: 100%;
            height: 100%;
            transform-origin: center;
            transform: rotate(45deg);
          }
          .inner-parts {
            float: left;
            width: 49.5%;
            height:49.5%;
            background-color: var(--card-color-off);
            opacity: 7.5;
            box-sizing: border-box;
            border: 1px #ffffff17 solid;
            box-shadow: var(--box-shadow) ;
          }
          .up{
            margin:0 0.5% 0.5% 0;
            border-top-left-radius: 100%;
          }
          .right{
            margin:0 0 0.5% 0.5%;
            border-top-right-radius: 100%;
          }
          .left{
            margin:0.5% 0.5% 0 0 ;
            border-bottom-left-radius: 100%;
          }
          .down{
            margin:0.5% 0 0 0.5% ;
            border-bottom-right-radius: 100%;
          }
          .inner-circle {
            position: absolute;
            margin-top: 28%;
            margin-left: 28%;
            width: 44%;
            height:44%;
            border-radius: 100%;
            background-image: var(--card-color-off);
            background: var(--paper-card-background-color);
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3) ;
            box-sizing: border-box;
            border: 1px #ffffff17 solid;
          }
          .inner-circle:active{
                background-image: var(--card-color-off);
                box-shadow: 0px 0px 5px var(--accent-color) inset;
            }

            .rotate {
                display: inline-block;
                transform: rotate(-45deg);
                width: 100%;
                height:100%;
                line-height: 90px;
            }
            .iconbox{
                position: relative;
                display: block;
                width: 5%;
                color: #FFFFFF;
                height: 5%;
                margin: 47%;
            }
            .ficon{
                position: relative;
                display: inline-block;
                width: 100%;
                color: #FFFFFF;
                height: 100%;
                vertical-align: middle;
                border-radius: 50%;
                background-size: cover;
                background-color: var(--accent-color);
                text-align: center;
                box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.6);
            } 
            .tap{
                position: relative;
                width: 100%;
                height: 100%;
                top: -100%;
                left: 0;
            }
            .tap:active{
                box-shadow: 2px 2px 5px var(--accent-color);
            }
            .left_buttons {
                display: flex;
                flex-wrap: wrap;
            }
            paper-button {
                text-align: center;
                padding: 5px;
                border-radius: 50%;
                margin: 8px;
                color: var(--accent-color);
                box-shadow: var(--box-shadow);
                box-sizing: border-box;
                border: 1px #ffffff17 solid;
            }
            paper-button:active{
                box-shadow: 0 0 5px var(--accent-color);
            }
            .lbicon {
                cursor: pointer;
                position: relative;
                display: inline-block;
                width: 40px;
                color: var(--accent-color);
                height: 40px;
                text-align: center;
                background-size: cover;
                line-height: 40px;
                vertical-align: middle;
                border-radius: 50%;
            }
        </style>
        <ha-card class="f-ha-card">
            <div class="remote_f">
                <div class="box">
                <div class="scale">
                <div class="button-group">
                    <template is="dom-if" if="[[config.circle]]" as="entity">
                    <div class="outter-circle">
                        <div class="inner-parts up">
                            <div class = "iconbox">
                                <div class = "ficon"></div>
                            </div>
                            <div class="tap up" on-tap="ccall" Btarget="[[config.circle.up]]" mqtt-data="up"></div>
                        </div>
                        <div class="inner-parts right">
                            <div class = "iconbox">
                                <div class = "ficon"></div>
                            </div>
                            <div class="tap right" on-tap="ccall" Btarget="[[config.circle.right]]" mqtt-data="right"></div>
                        </div>
                        <div class="inner-parts left">
                            <div class = "iconbox">
                                <div class = "ficon"></div>
                            </div>
                            <div class="tap left" on-tap="ccall" Btarget="[[config.circle.left]]" mqtt-data="left"></div>
                        </div>
                        <div class="inner-parts down">
                            <div class = "iconbox">
                                <div class = "ficon"></div>
                            </div>
                            <div class="tap down" on-tap="ccall" Btarget="[[config.circle.down]]" mqtt-data="down"></div>
                        </div>
                        <div class="inner-circle ok" on-tap="ccall" Btarget="[[config.circle.ok]]" mqtt-data="ok">
                        </div>        
                    </div>
                    </template>
                </div>  
                </div>
                </div>  
                <div class="boxb">
                    <div class="left_buttons">
                        <template is="dom-repeat" items="[[config.left_buttons]]" as="entity">
                            <template is="dom-if" if="[[isentity(entity)]]" as="entity">
                                <paper-button on-tap="bcall" on-dblclick="dbcall">
                                    <state-badge state-obj="[[getstate(hass,entity)]]" hass="[[hass]]" class="lbicon"></state-badge>
                                </paper-button>
                            </template>   
                            <template is="dom-if" if="[[ismqtt(entity)]]" as="entity">
                                <paper-button on-tap="bcall" on-dblclick="dbcall">
                                    <div class="lbicon">
                                        <ha-icon class="ha-icon" data-state="on" icon="[[geticon(hass,entity)]]"></ha-icon>
                                    </div>
                                </paper-button>      
                            </template>  
                        </template>
                    </div>
                </div>
            </div>
        </ha-card>
        `
    }
    static get properties() {
        return {
            config: Object,
            hass: Object,
            stateObj: Object
        }
    }
    setConfig(config) {
            this.config = config;
    }

    ismqtt(entity){
        if(typeof entity ==="object"){
            return true;
        }
        return false;
    }

    isentity(entity){
        if(typeof entity ==="string"){
            return true;
        }
        return false;    
    }

    getstate(hass, entity) {
        return hass.states[entity]
    }
    geticon (hass, entity){
        var icon;
        if(typeof entity ==="object"){
            icon = entity.icon
        }else{
            icon = hass.states[entity].attributes.icon;
        }
        return icon
    }
    ccall(e) {
        console.log(e); 
        var id = e.target.btarget;
        if(typeof id ==="object" || id.topic || id.payload){
            //mqtt
            var data = {}
                data.topic = id.topic;
                data.payload = id.payload;
            this.hass.callService("mqtt", "publish", data)
            navigator.vibrate(100)
        }else if(typeof id === "string"){
            //script
            this.callService(id)
        }
    }
    handleTrack(e){
        switch(e.detail.state) {
          case 'start':
            console.log("started");
            break;
          case 'track':
            //
            break;
          case 'end':
            console.log("ended");
            break;
        }
    }
    dbcall(e){
        console.log(e);
        var id = e.model.__data.entity;
        if(id.payload === "on"){
            this.hass.callService("mqtt", "publish", {"topic":id.topic,"payload":"off"})
        }
    }
    bcall(e) {
        console.log(e);
        var id = e.model.__data.entity;
        if(typeof id ==="object" || id.topic || id.payload){
            //mqtt
            var data = {}
                data.topic = id.topic;
                data.payload = id.payload;
            this.hass.callService("mqtt", "publish", data)
            navigator.vibrate(100)
        }else if(typeof id === "string"){
            //script
            this.callService(id)
        }
    }

    callService(ev, stateObj) {
        var entity = ev;
        var domain = entity.split('.')[0];
        if (domain === 'script') {
          var service = entity.split('.')[1];
          var data = {}
        } else {
          var service = ev.service ? ev.split('.')[1] : 'toggle';
          var data = {
            'entity_id': ev
          }
        }
        this.hass.callService(domain, service, data)
    }
    stopPropagation(e) {
        e.stopPropagation()
    }
}
customElements.define('lovelace-remote-card', RemoteCard);