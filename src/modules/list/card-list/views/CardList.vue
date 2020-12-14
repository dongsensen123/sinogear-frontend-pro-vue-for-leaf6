<template>
  <div>
    <a-list
      rowKey="id"
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
      :dataSource="data"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <template v-if="!item || item.id === undefined">
          <a-button class="new-btn" type="dashed">
            <a-icon type="plus"/>
            新增产品
          </a-button>
        </template>
        <template v-else>
          <a-card :hoverable="true" class="btn-view">
            <a-card-meta>
              <a slot="title">{{ item.title }}</a>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large"/>
              <div class="meta-content btn-content" slot="description">{{ item.content }}</div>
            </a-card-meta>
            <template class="ant-card-actions" slot="actions">
              <a>操作一</a>
              <a>操作二</a>
            </template>
          </a-card>
        </template>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import {List, Icon, Card, Button, Avatar} from 'ant-design-vue';
  const {Item} = List;
  const {Meta} = Card;

  export default {
    name: 'CardList',
    components: {
      AList: List,
      AIcon: Icon,
      ACard: Card,
      AButton: Button,
      AAvatar: Avatar,
      ACardMeta: Meta,
      AListItem: Item
    },
    data () {
      this.tabList = [
        { key: 'tab1', tab: '快速开始' },
        { key: 'tab2', tab: '产品简介' },
        { key: 'tab3', tab: '产品文档' }
      ];
      return {
        tabActiveKey: 'tab1',

        extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      }
    },
    computed: {
      ...mapState('basic-list', {
        data: state => [{}, ...state.list] || []
      })
    },
    mounted () {
      this.queryData({
        count: 8
      })
    },
    methods: {
      ...mapActions('basic-list', ['queryData']),
      testFun () {
        this.$message.info('快速开始被点击！')
      }
    }
  }
</script>

<style lang="less" scoped>
  .new-btn, .btn-view {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 205px;
  }
  .btn-content {
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow:ellipsis;
  }
</style>
