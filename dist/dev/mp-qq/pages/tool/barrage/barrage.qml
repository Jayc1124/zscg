<view class="data-v-ecab1884"><view class="cu-bar bg-white data-v-ecab1884"><view class="action data-v-ecab1884"><text class="cuIcon-title text-blue data-v-ecab1884"></text>弹幕文字 </view></view><view class="cu-form-group align-start top data-v-ecab1884"><view class="title data-v-ecab1884"></view><textarea class="data-v-ecab1884" placeholder="请输入弹幕" value="{{a}}" bindinput="{{b}}"></textarea></view><view class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">背景颜色</view><u-checkbox qq:if="{{d}}" class="data-v-ecab1884" u-s="{{['d']}}" u-i="ecab1884-0" bind:__l="__l" bindupdateModelValue="{{c}}" u-p="{{d}}">随机</u-checkbox><button class="cu-btn bg-green shadow data-v-ecab1884" bindtap="{{e}}" style="{{'background-color:' + f}}"></button></view><view class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">弹幕颜色</view><u-checkbox qq:if="{{h}}" class="data-v-ecab1884" u-s="{{['d']}}" u-i="ecab1884-1" bind:__l="__l" bindupdateModelValue="{{g}}" u-p="{{h}}">随机</u-checkbox><button class="cu-btn bg-green shadow data-v-ecab1884" bindtap="{{i}}" style="{{'background-color:' + j}}"></button></view><view class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">弹幕大小: {{k}}</view><view class="wrap data-v-ecab1884" style="width:200px"><u-slider qq:if="{{m}}" class="data-v-ecab1884" u-i="ecab1884-2" bind:__l="__l" bindupdateModelValue="{{l}}" u-p="{{m}}"></u-slider></view></view><view class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">滚动速度: {{n}}</view><view class="wrap data-v-ecab1884" style="width:200px"><u-slider qq:if="{{p}}" class="data-v-ecab1884" u-i="ecab1884-3" bind:__l="__l" bindupdateModelValue="{{o}}" u-p="{{p}}"></u-slider></view></view><view class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">禁止滚动</view><view class="wrap data-v-ecab1884"><u-switch qq:if="{{r}}" class="data-v-ecab1884" u-i="ecab1884-4" bind:__l="__l" bindupdateModelValue="{{q}}" u-p="{{r}}"></u-switch></view></view><view qq:if="{{s}}" class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">背景变换速度: {{t}}</view><view class="wrap data-v-ecab1884" style="width:200px"><u-slider qq:if="{{w}}" class="data-v-ecab1884" u-i="ecab1884-5" bind:__l="__l" bindupdateModelValue="{{v}}" u-p="{{w}}"></u-slider></view></view><view qq:if="{{x}}" class="cu-form-group data-v-ecab1884"><view class="title data-v-ecab1884">弹幕变换速度: {{y}}</view><view class="wrap data-v-ecab1884" style="width:200px"><u-slider qq:if="{{A}}" class="data-v-ecab1884" u-i="ecab1884-6" bind:__l="__l" bindupdateModelValue="{{z}}" u-p="{{A}}"></u-slider></view></view><view class="padding flex flex-direction bg-white top data-v-ecab1884"><button class="cu-btn bg-blue margin-tb-sm lg data-v-ecab1884" bindtap="{{B}}">开启</button></view><t-color-picker qq:if="{{E}}" class="r data-v-ecab1884" u-r="colorPicker" bindconfirm="{{D}}" u-i="ecab1884-7" bind:__l="__l" u-p="{{E}}"></t-color-picker></view>