<template>
    <div class="card-list">
        <div id="我的收藏" class="card-section" :style="{'--cat-color': '#C97B5D', '--cat-weak': '#F6E4DB'}" v-show="favoriteList.length">
            <Card class="nodeCard">
                <p slot="title" class="anchor">我的收藏<a href="#我的收藏">#</a></p>
                <span slot="extra" class="card-extra-btn" @click="removeFavorite">
                    <Icon type="ios-loop-strong"></Icon>
                    清空
                </span>
                <Nav :navData="favoriteList" :del=true :spinShow="spinShow"></Nav>
            </Card>
        </div>
        <div id="常用网址" class="card-section" :style="{'--cat-color': '#B08D3E', '--cat-weak': '#F3EBD9'}" v-show="usedList.length">
            <Card class="nodeCard">
                <p slot="title" class="anchor">常用网址<a href="#常用网址">#</a></p>
                <span slot="extra" class="card-extra-btn" @click="removeUsed">
                    <Icon type="ios-loop-strong"></Icon>
                    清空
                </span>
                <Nav :navData="usedList" :del=true :spinShow="spinShow"></Nav>
            </Card>
        </div>
        <div :id="item.title" class="card-section" v-for="(item,index) in data" :key="index" v-show="item.nav.length" :style="{'--cat-color': catColor(index), '--cat-weak': catBadge(index).bg}">
            <Card class="nodeCard">
                <p slot="title" class="anchor">{{ item.title }}<a :href="'#' + item.title">#</a></p>
                <span slot="extra" class="count-pill">{{ item.nav.length }} 个站点</span>
                <Nav :navData="item.nav" :subTitle="item.title" :spinShow="spinShow"></Nav>
            </Card>
        </div>
    </div>
</template>

<script>
import Nav from '@/components/card/nav'
import {colorForIndex, badgeForIndex} from '@/common/js/palette'
import {mapGetters, mapActions} from 'vuex'
export default {
    props: {
        data: {
            default: {}
        },
        spinShow: {
            default: false
        }
    },
    methods: {
        catColor (index) {
            return colorForIndex(index)
        },
        catBadge (index) {
            return badgeForIndex(index)
        },
        removeUsed () {
            this.removeUsedList()
            this.$Message.success('清空成功')
        },
        removeFavorite () {
            this.removeFavoriteList()
            this.$Message.success('清空成功')
        },
        ...mapActions([
            'removeUsedList',
            'removeFavoriteList'
        ])
    },
    computed: {
        ...mapGetters([
            'favoriteList',
            'usedList'
        ])
    },
    components: {
        Nav
    }
}
</script>

<style lang=less scoped>
.card-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.card-section {
    .nodeCard {
        margin: 0;
    }
}

.anchor {
    display: flex;
    align-items: center;
}

.anchor::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: var(--cat-color, var(--accent-primary));
    margin-right: 8px;
    flex-shrink: 0;
}

.anchor a {
    opacity: 0;
    font-size: 24px;
    transition: opacity .2s ease-in-out;
    margin-left: 5px;
    position: relative;
    top: 2px;
}

.count-pill {
    font-size: 12px;
    color: var(--foreground-muted);
    background: var(--surface-primary);
    border: 1px solid var(--border-color);
    padding: 2px 10px;
    border-radius: 999px;
}
.nodeCard {
    border-radius: 16px !important;
    border: none !important;
    box-shadow: var(--shadow-card) !important;
    background: var(--card-bg) !important;

    /deep/ .ivu-card-body {
        padding: 24px !important;
    }

    /deep/ .ivu-card-head {
        border-bottom: none !important;
        padding: 24px 24px 0 24px !important;
        line-height: normal !important;

        p {
            font-size: 16px !important;
            font-weight: 600 !important;
            color: var(--foreground-primary) !important;
        }

        .ivu-card-extra {
            top: 50% !important;
            transform: translateY(-50%) !important;
        }
    }
}

.card-extra-btn {
    color: var(--foreground-muted);
    font-size: 12px;
    cursor: pointer;

    &:hover {
        color: var(--accent-primary);
    }
}
</style>
