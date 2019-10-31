lovelace-remote-card
================================================

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

这是一个通用的电视(机顶盒)遥控器卡片, 可以自定义设置额外的按钮

用 `js`类型安装 `remote.js` .

```yaml
resources:
  url: /community_plugin/lovelace-remote/remote.js
  type: js
```
![slider-entity-row](https://raw.githubusercontent.com/fineemb/lovelace-remote-card/d6561e8724a15359ef5044478a3b2346c37ae4cb/01.gif)

## 使用
增加这个卡片到你的Yaml或者UI编辑器
```yaml
                    - type: custom:lovelace-remote-card
                      vibrate: true
                      circle:
                        ok: 
                          topic: homeassistant/remote/JMGO
                        up: 
                          topic: homeassistant/remote/JMGO
                          payload: up
                        down: 
                          topic: homeassistant/remote/JMGO
                          payload: down
                        left: 
                          topic: homeassistant/remote/JMGO
                          payload: left 
                        right: script.tap 
                      left_buttons:
                        - entity: qmtt.retu
                          topic: homeassistant/remote/JMGO
                          payload: retu
                          icon: mdi:keyboard-return 
                        - entity: qmtt.on
                          topic: homeassistant/remote/JMGO
                          payload: "on"
                          icon: mdi:power 
                        - entity: qmtt.home
                          topic: homeassistant/remote/JMGO
                          payload: home
                          icon: mdi:home
                        - entity: qmtt.menu
                          topic: homeassistant/remote/JMGO
                          payload: "menu"
                          icon: mdi:menu 
                        - entity: qmtt.volmin
                          topic: homeassistant/remote/JMGO
                          payload: volmin
                          icon: mdi:volume-minus 
                        - entity: qmtt.volmax
                          topic: homeassistant/remote/JMGO
                          payload: "volmax"
                          icon: mdi:volume-plus
```
## 属性

- `circle` 可以使用`mqtt`和`script`,格式严格按照示例
  * `up` 上 
  * `down` 下
  * `left` 左
  * `right` 右
  * `ok` 确认
- `left_buttons` 左侧按钮支持`mqtt`,`script`和`switch` 可以添加任意数量,但是建议在6或者8个,为的是UI的和谐.`mqtt`格式严格按照示例
- `vibrate` 设置按钮震动反馈是否开启True/False
