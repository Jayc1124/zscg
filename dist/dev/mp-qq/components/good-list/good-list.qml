<view class="erke-list" style="width:95%;margin:auto"><view qq:for="{{a}}" qq:for-item="good" qq:key="j" id="{{good.i}}" class="good-li"><view bindtap="{{good.h}}"><tm-sheet qq:if="{{c}}" u-s="{{['d']}}" u-i="{{good.g}}" bind:__l="__l" u-p="{{c}}"><view style="display:flex;flex-flow:row;justify-content:space-between"><view style="width:49%"><tm-image qq:if="{{good.b}}" u-i="{{good.a}}" bind:__l="__l" u-p="{{good.b}}"></tm-image></view><view style="width:49%;display:flex;flex-flow:column;justify-content:space-between" class=""><view><tm-text qq:if="{{b}}" u-s="{{['d']}}" u-i="{{good.d}}" bind:__l="__l" u-p="{{b}}">{{good.c}}</tm-text></view><view><tm-tag qq:if="{{good.f}}" style="" u-i="{{good.e}}" bind:__l="__l" u-p="{{good.f}}"></tm-tag></view></view></view></tm-sheet></view></view></view>