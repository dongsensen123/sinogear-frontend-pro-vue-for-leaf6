<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        <sino-gear-standard-form-row title="所属类目" block style="padding-bottom: 11px;">
          <a-form-item>
            <sino-gear-tag-select :collapse="collapse">
              <sino-gear-tag-select-option value="Category1">类目一</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category2">类目二</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category3">类目三</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category4">类目四</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category5">类目五</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category6">类目六</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category7">类目七</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category8">类目八</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category9">类目九</sino-gear-tag-select-option>
              <sino-gear-tag-select-option value="Category10">类目十</sino-gear-tag-select-option>
            </sino-gear-tag-select>
          </a-form-item>
        </sino-gear-standard-form-row>
      
        <sino-gear-standard-form-row title="owner" grid>
          <a-row>
            <a-col :md="24">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-select
                  style="max-width: 268px; width: 100%;"
                  mode="multiple"
                  placeholder="选择 onwer"
                  v-decorator="['owner']"
                  @change="handleChange"
                >
                  <a-select-option v-for="item in owners" :key="item.id">{{ item.name }}</a-select-option>
                </a-select>
                <a class="list-articles-trigger" @click="setOwner">只看自己的</a>
              </a-form-item>
            </a-col>
          </a-row>
        </sino-gear-standard-form-row>
      
        <sino-gear-standard-form-row title="其它选项" grid last>
          <a-row :gutter="16">
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="活跃用户" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="李三">李三</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
              <a-form-item label="好评度" :wrapper-col="{ xs: 24, sm: 24, md: 12 }">
                <a-select placeholder="不限" style="max-width: 200px; width: 100%;">
                  <a-select-option value="优秀">优秀</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </sino-gear-standard-form-row>
      </a-form>
    </a-card>
    
    <a-card style="margin-top: 24px;" :bordered="false">
      <a-list
        size="large"
        :rowKey="Math.random()*10000000"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="data"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <icon-text type="star-o" :text="item.star" />
            <icon-text type="like-o" :text="item.like" />
            <icon-text type="message" :text="item.message" />
          </template>
          <a-list-item-meta>
            <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
            <template slot="description">
              <span>
                <a-tag>Ant Design</a-tag>
                <a-tag>设计语言</a-tag>
                <a-tag>蚂蚁金服</a-tag>
              </span>
            </template>
          </a-list-item-meta>
          <article-list-content
            :description="item.description"
            :owner="item.owner"
            :avatar="item.avatar"
            :href="item.href"
            :updateAt="item.updatedAt"
          />
        </a-list-item>
        <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
    </a-card>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import SinoGearTagSelect from '../../../../components/SinoGearTagSelect';
  import SinoGearStandardFormRow from "../../../../components/SinoGearStandardFormRow/SinoGearStandardFormRow.vue";
  import ArticleListContent from "../components/ArticleListContent.vue";
  import {Row, Col, Card, List, Button, Select, Tag, Avatar, Form} from 'ant-design-vue';
  import IconText from '../components/IconText.vue';
  
  const ItemMeta = List.Item.Meta;
  const SinoGearTagSelectOption = SinoGearTagSelect.Option;
  const owners = [
    {
      id: 'wzj',
      name: '我自己'
    },
    {
      id: 'wjh',
      name: '吴家豪'
    },
    {
      id: 'zxx',
      name: '周星星'
    },
    {
      id: 'zly',
      name: '赵丽颖'
    },
    {
      id: 'ym',
      name: '姚明'
    }
  ];
  const FormItem = Form.Item;
  const {Item} = List;
  const { Option } = Select;

  export default {
    name: "Articles",
    components: {
      IconText,
      ARow: Row,
      ACol: Col,
      AAvatar: Avatar,
      ACard: Card,
      AList: List,
      AListItem: Item,
      AButton: Button,
      AListItemMeta: ItemMeta,
      AForm: Form,
      AFormItem: FormItem,
      ASelect: Select,
      ASelectOption: Option,
      ATag: Tag,
      ArticleListContent,
      SinoGearStandardFormRow,
      SinoGearTagSelect,
      SinoGearTagSelectOption
    },
    computed: {
      ...mapState('basic-list', {
        data: state => state.list || []
      }),
      ...mapState({
        collapse: state => state.collapse
      })
    },
    data () {
      return {
        owners,
        loading: false,
        loadingMore: false,
        form: this.$form.createForm(this)
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      ...mapActions('basic-list', ['queryData', 'appendFetch']),
      handleChange (value) {
        console.log(`selected ${value}`)
      },
      getList () {
        this.queryData({
          count: 5
        });
      },
      loadMore () {
        this.loadingMore = true;
        setTimeout(() => {
          this.appendFetch({
            count: 5
          }).then(() => {
            this.loadingMore = false;
          });
        }, 500);
      },
      setOwner () {
        const { form: { setFieldsValue } } = this;
        setFieldsValue({
          owner: ['wzj']
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .ant-pro-components-tag-select {
    /deep/ .ant-pro-tag-select .ant-tag {
      margin-right: 24px;
      padding: 0 8px;
      font-size: 14px;
    }
  }
  
  .list-articles-trigger {
    margin-left: 12px;
  }
</style>