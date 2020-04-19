/*
 * @Author        : fineemb
 * @Github        : https://github.com/fineemb
 * @Description   : 
 * @Date          : 2019-10-28 16:19:56
 * @LastEditors   : fineemb
 * @LastEditTime  : 2020-04-19 23:56:10
 */

console.info("%c REMOTE CARD \n%c Version 1.2 ",
"color: orange; font-weight: bold; background: black", 
"color: white; font-weight: bold; background: dimgray");

class RemoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set hass(hass) {
        this._hass = hass;
        this._entity = this.config.entity;
        this.hacard.querySelector("#remote").className = this._hass.states[this._entity].state;

    }

    setConfig(config) {
        if (!config.entity) {
          throw new Error('你需要定义一个实体');
        }
        this.config = deepClone(config);

        const root = this.shadowRoot;
        if (root.lastChild) root.removeChild(root.lastChild);
        const style = document.createElement('style');
        style.textContent = this._cssData();
        root.appendChild(style);
        this.hacard = document.createElement('ha-card');
        this.hacard.className = 'f-ha-card';
        this.hacard.innerHTML = this._htmlData();
        root.appendChild(this.hacard);

        if(this.config.left_buttons){
            this.config.left_buttons.forEach(function(button){
                let buttonBox = document.createElement('paper-button');
                    buttonBox.innerHTML = `
                        <div class="lbicon">
                            <ha-icon class="ha-icon" data-state="on" icon="`+button.icon+`"></ha-icon>
                        </div>
                    `;
                    buttonBox.setAttribute("data-entity",button.entity)
                    if(button.topic)buttonBox.setAttribute("data-topic",button.topic)
                    if(button.payload)buttonBox.setAttribute("data-payload",button.payload)
                    if(button.server)buttonBox.setAttribute("data-server",button.server)
                    buttonBox.addEventListener('click', (e) => this.selectMode(e),false);
                this.hacard.querySelector("#right_buttons").appendChild(buttonBox)    
            }, this)
        }

      }

      selectMode(e) {
        console.log(e);
        var entity = e.currentTarget.dataset.entity;
        var topic = e.currentTarget.dataset.topic;
        var payload = e.currentTarget.dataset.payload;
        var domain = entity.split('.')[0];
        if(domain ==="qmtt" || topic || payload){
            var data = {
                'topic': topic,
                'payload': payload,
                'qos': 2,
                'retain': false
            }
            this._hass.callService("mqtt", "publish", data)
        }else if(domain ==="switch"){
            var service = e.currentTarget.dataset.server?e.currentTarget.dataset.server:'toggle';
            var data = {
              'entity_id': entity
            }
            this._hass.callService(domain, service, data)
        }else if(domain ==="script"){
            var service = entity.split('.')[1];
            var data = {}
            this._hass.callService(domain, service, data)
        }
    }
      _htmlData(){
          var html = `       
          <div id="remote" class="remote_f">
              <div class="box">
              <div class="scale">
              <div class="button-group">
                  <div class="outter-circle">
                      <div class="inner-parts up">
                          <div class = "iconbox">
                              <div class = "ficon"></div>
                          </div>
                          <div id="lup" class="tap up"></div>
                      </div>
                      <div class="inner-parts right">
                          <div class = "iconbox">
                              <div class = "ficon"></div>
                          </div>
                          <div id="lright" class="tap right"></div>
                      </div>
                      <div class="inner-parts left">
                          <div class = "iconbox">
                              <div class = "ficon"></div>
                          </div>
                          <div id="lleft" class="tap left"></div>
                      </div>
                      <div class="inner-parts down">
                          <div class = "iconbox">
                              <div class = "ficon"></div>
                          </div>
                          <div id="ldown" class="tap down"></div>
                      </div>
                      <div id="lok" class="inner-circle ok">
                      </div>        
                  </div>
              </div>  
              </div>
              </div>  
              <div class="boxb">
                  <div id="right_buttons">
                  </div>
              </div>
          </div>`
          return html;
      }
      _cssData(){
        var css = `
        #remote{
            display:flex;
            flex-wrap: wrap;
            justify-content: center;
            --box-shadow:2px 2px 5px rgba(0, 0, 0, 0.3);
            --button-shadow-color:#00bcd4;
        }
        .f-ha-card{
            padding: 1pc;
            background: var(--paper-card-background-color);
            
        }

        .box {
            padding: 5px;
            overflow: hidden;
            flex:1.25;
            display: flex;
            align-items: center;
            min-width: 165px;
        }
        .boxb {
            flex:1;
            min-width: 145px;
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
        #right_buttons {
            display: flex;
            flex-wrap: wrap;
            align-content: center;
            min-height: 100%;
            justify-content: center;
        }
        paper-button {
            text-align: center;
            padding: 5px;
            border-radius: 50%;
            margin: 10px;
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
        .not_home .lbicon {
            color: var(--state-color-off);
        }
        .not_home .ficon {
            background-color: var(--state-color-off);
        }`
        return css;
      }
      // The height of your card. Home Assistant uses this to automatically
      // distribute all cards over the available columns.
      getCardSize() {
        return 1;
      }
}

function deepClone(value) {
    if (!(!!value && typeof value == 'object')) {
      return value;
    }
    if (Object.prototype.toString.call(value) == '[object Date]') {
      return new Date(value.getTime());
    }
    if (Array.isArray(value)) {
      return value.map(deepClone);
    }
    var result = {};
    Object.keys(value).forEach(
      function(key) { result[key] = deepClone(value[key]); });
    return result;
  }
customElements.define('lovelace-remote-card', RemoteCard);