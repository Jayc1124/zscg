<view class="u-swiper-wrap data-v-3f243d96" style="{{'border-radius:' + C}}"><swiper class="data-v-3f243d96" current="{{d}}" bindchange="{{e}}" bindanimationfinish="{{f}}" interval="{{g}}" circular="{{h}}" duration="{{i}}" autoplay="{{j}}" previous-margin="{{k}}" next-margin="{{l}}" style="{{'height:' + m + ';' + ('background-color:' + n)}}"><swiper-item qq:for="{{a}}" qq:for-item="item" qq:key="j" class="u-swiper-item data-v-3f243d96"><view catchtap="{{item.f}}" class="{{['u-list-image-wrap', 'data-v-3f243d96', item.g]}}" style="{{'border-radius:' + c + ';' + ('transform:' + item.h) + ';' + ('margin:' + item.i)}}"><image class="u-swiper-image data-v-3f243d96" src="{{item.a}}" mode="{{b}}"></image><view qq:if="{{item.b}}" class="u-swiper-title u-line-1 data-v-3f243d96" style="{{item.d + ';' + item.e}}">{{item.c}}</view></view></swiper-item></swiper><view class="u-swiper-indicator data-v-3f243d96" style="{{'top:' + y + ';' + ('bottom:' + z) + ';' + ('justify-content:' + A) + ';' + ('padding:' + B)}}"><block qq:if="{{o}}"><view qq:for="{{p}}" qq:for-item="item" qq:key="b" class="{{['u-indicator-item-rect', 'data-v-3f243d96', item.a && 'u-indicator-item-rect-active']}}"></view></block><block qq:if="{{q}}"><view qq:for="{{r}}" qq:for-item="item" qq:key="b" class="{{['u-indicator-item-dot', 'data-v-3f243d96', item.a && 'u-indicator-item-dot-active']}}"></view></block><block qq:if="{{s}}"><view qq:for="{{t}}" qq:for-item="item" qq:key="b" class="{{['u-indicator-item-round', 'data-v-3f243d96', item.a && 'u-indicator-item-round-active']}}"></view></block><block qq:if="{{v}}"><view class="u-indicator-item-number data-v-3f243d96">{{w}}/{{x}}</view></block></view></view>