<template>
  <div class="cache_demo">
    <a-tabs>
      <a-tab-pane key="1" tab="本地缓存数据">
        <a-row>
          <a-col span="12">
            <a-form layout="inline" :form="form">
              <a-divider orientation="left">全局配置</a-divider>
              <a-form-item label="缓存有效时间">
                <a-input v-decorator="['duration', {
                                    initialValue: duration
                                }]" placeholder="缓存有效时间(毫秒)" style="width: 200px"/>
              </a-form-item>
              <a-row>
                <a-button type="primary" @click="getInitCacheData">数据初始化</a-button>
                <a-button style="margin: 0 10px" @click="getCurrentCacheData">查看所有缓存数据</a-button>
                <a-button style="marginRight: 10px" @click="refreshCacheData">刷新缓存数据</a-button>
                <a-button type="danger" @click="clearAllCacheData">清空缓存</a-button>
              </a-row>
              <a-divider orientation="left">示例1：静态字典</a-divider>
              <a-row>
                <a-form-item label="缓存数据">
                  <a-select v-decorator="['cacheKey', {
                                        initialValue: '/area/China'
                                    }]" style="width: 300px">
                    <a-select-option value="/dict/DICT_KIND_AREA_TYPE">
                      区划类型字典（/dict/DICT_KIND_AREA_TYPE）
                    </a-select-option>
                    <a-select-option value="/area/China">
                      中国省市区数据（/area/China）
                    </a-select-option>
                    <!--  故意写错代办状态字典类别，演示使用io 请求数据 -->
                    <a-select-option value="/dict/DICT_KIND_NOTICE_TODO">
                      本地无缓存、返回io请求数据（/dict/DICT_KIND_NOTICE_TODO）
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="请求方法">
                  <a-radio-group v-decorator="['method', {
                                        initialValue: 'GET'
                                    }]">
                    <a-radio-button value="GET">
                      GET
                    </a-radio-button>
                    <a-radio-button value="POST">
                      POST
                    </a-radio-button>
                  </a-radio-group>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="自定义查询">
                  <a-radio-group v-decorator="['usingDefault', {
                                        initialValue: '1'
                                    }]" @change="handleUsingDefaultChange">
                    <a-popover placement="right">
                      <div slot="content">
                        <pre>
defaultQueryFun(data, query) {
    let target = data;
    const isArray = Array.isArray(target);
    if (!isArray) {
        return target;
    }
    const queryKeys = Object.keys(query);
    target = target.filter((item) => {
        // 全部匹配
        return queryKeys.every((k) => `${item[k]}` === `${query[k]}`);
    });
    return isArray ? target : target[0];
}                       </pre>
                      </div>
                      <a-radio-button value="1">
                        默认
                      </a-radio-button>
                    </a-popover>
                    <a-radio-button value="0">
                      自定义
                    </a-radio-button>
                  </a-radio-group>
                </a-form-item>
                <a-form-item v-if="showCustomFun">
                  <a-radio-group v-decorator="['customFunType', {
                                        initialValue: 'CUSTOM'
                                    }]">
                    <a-popover placement="right">
                      <div slot="content">
                        <pre>
requestCustomFun: function(data, query) {
    // 请求自定义查询方法 data 为缓存数据，query为查询条件
    console.info('使用请求自定义查询方法');
    return data;
}</pre>
                      </div>
                      <a-radio value="CUSTOM">
                        请求自定义（示例）
                      </a-radio>
                    </a-popover>
                    <a-popover placement="right">
                      <div slot="content">
                        <pre>
globalCustomFun(data, query) {
    // 全局自定义查询方法 data 为缓存数据，query为查询条件
    console.info('使用全局自定义查询方法');
    return data;
}</pre>
                      </div>
                      <a-radio value="GLOBAL">
                        全局自定义（示例）
                      </a-radio>
                    </a-popover>
                  </a-radio-group>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="是否分页">
                  <a-switch v-decorator="['paginate', {
                                        initialValue: true,
                                        valuePropName: 'checked'
                                    }]"/>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="当前页码">
                  <a-input-number v-decorator="['page', {
                                        initialValue: '1'
                                    }]" :min="1"/>
                </a-form-item>
                <a-form-item label="分页条数" default-value="10">
                  <a-select v-decorator="['pageSize', {
                                        initialValue: '10'
                                    }]" style="width: 100px">
                    <a-select-option value="10">每页10条</a-select-option>
                    <a-select-option value="20">每页20条</a-select-option>
                    <a-select-option value="30">每页30条</a-select-option>
                  </a-select>
                </a-form-item>
              </a-row>
              <a-row>
                <a-form-item label="查询参数">
                  <a-input v-decorator="['queryStr', {
                                        initialValue: ''
                                    }]" style="width: 300px" placeholder="格式：key1={key1}&key2={key2}"/>
                </a-form-item>
                <a-button type="primary" @click="getDicData">查询</a-button>
              </a-row>
              <a-divider orientation="left">示例2：引擎配置</a-divider>
              <a-form-item label="引擎">
                <a-select v-decorator="['engine_cacheKey', {
                                    initialValue: '/engine/query_demo'
                                }]" style="width: 300px">
                  <a-select-option value="/engine/query_demo">
                    查询示例（/engine/query_demo）
                  </a-select-option>
                  <!-- 故意写错流水号管理id，演示使用io 请求数据 -->
                  <a-select-option value="/engine/query_code_seq">
                    本地无缓存、返回io请求数据（/engine/query_code_seq）
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-button type="primary" @click="getEngineData">查询</a-button>
            </a-form>

          </a-col>
          <a-col span="12">
            结果
            <pre style="height: 540px;overflow: auto;background: #eee">
{{JSON.stringify(cacheData, undefined, 2)}}
                        </pre>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="协商缓存">
        <a-button type="primary" @click="sendNegotiationRequest" style="margin: 10px 10px 30px 0">查询数据
        </a-button>
        <a-button type="danger" @click="clearNegotiationData">清空协商缓存数据</a-button>
        <pre>
{{JSON.stringify(negotiationData, undefined, 2)}}</pre>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Popover,
    Radio,
    Row,
    Select,
    Switch,
    Tabs
  } from 'ant-design-vue';
  import {cache, io} from 'sinobest-functions';
  import {config} from '../../../../../common/config';

  const {contextPath, cacheConfig} = config;
  const {localCacheKey, negotiateCacheKey} = cacheConfig || {};
  export default {
    name: "CacheDemo",
    components: {
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      ADivider: Divider,
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AButton: Button,
      ASelect: Select,
      ASelectOption: Select.Option,
      ARadio: Radio,
      ARadioButton: Radio.Button,
      ARadioGroup: Radio.Group,
      AInputNumber: InputNumber,
      ASwitch: Switch,
      APopover: Popover,

    },
    data: function () {
      return {
        form: this.$form.createForm(this),
        duration: 86400000,
        showCustomFun: false,
        cacheData: {},
        negotiationData: []
      }
    },
    methods: {
      async getInitCacheData() {
        this.registerCache();
        // 缓存所有的数据
        const data = await io.initCacheData(`${contextPath}/api/cache/init`);
        this.showNotice('数据初始化完成！可在控制台查看所有缓存数据');
        console.info('缓存的全部数据', data);
      },
      async getCurrentCacheData(showNotice = true) {
        let tempCacheData = localStorage.getItem(localCacheKey);
        try {
          tempCacheData = JSON.parse(tempCacheData);
        } catch (e) {
          tempCacheData = {};
        } finally {
          console.info('当前缓存', tempCacheData);
          if (showNotice) {
            message.info('请在控制台查看当前缓存数据');
          }
        }
      },
      async refreshCacheData() {
        cache.refreshCacheData();
        message.success('缓存数据刷新完成！可在控制台查看所有缓存数据');
        this.getCurrentCacheData(false);
      },
      clearAllCacheData() {
        message.success('清空缓存完成！可在控制台查看所有缓存数据');
        cache.clearCacheData();
        this.getCurrentCacheData(false);
      },
      async getDicData() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          }
          const {method, cacheKey, page, pageSize, usingDefault, customFunType, paginate} = values;
          let {queryStr = ''} = values;
          const cacheOpt = {cacheKey};
          if (usingDefault === '0' && customFunType === 'CUSTOM') {
            // 添加请求自定义方法
            cacheOpt.customFun = this.requestCustomFun;
          } else {
            // 注册全局自定义方法
            this.registerCache(usingDefault === '0' && customFunType === 'GLOBAL');
          }
          let url = `${contextPath}/api/dicts/item`;
          let body = {};
          if (method === 'POST') {
            url = `${url}/query`;
            queryStr
              .split('&')
              .filter(Boolean)
              .forEach((str) => {
                const [key, value] = str.split('=');
                body[key] = value;
              });
            url = `${url}?`;
            queryStr = '';
          } else {
            url = `${url}/kindCode/DICT_KIND_AREA_TYPE`;
            url = `${url}?${queryStr}`;
            body = '';
          }
          if (paginate) {
            url = `${url}${queryStr ? '&' : ''}page=${page}&pageSize=${pageSize}`;
          }
          const options = {...options, cache: cacheOpt};
          console.info('请求参数', url, method, body, options);
          const promise = io.request(url, body, method, options);
          promise.then((res) => {
            console.info('最终结果', res);
            this.cacheData = res;
          });
        });
      },

      handleUsingDefaultChange(e) {
        const {value} = e.target;
        this.showCustomFun = !Number(value)
      },
      requestCustomFun: function (data) {
        // 请求自定义查询方法 data 为缓存数据，query为查询条件
        console.info('使用请求自定义查询方法');
        return data;
      },
      globalCustomFun(data) {
        // 全局自定义查询方法 data 为缓存数据，query为查询条件
        console.info('使用全局自定义查询方法');
        return data;
      },

      async getEngineData() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          }
          const {engine_cacheKey: cacheKey} = values;
          const cacheOpt = {cacheKey};
          const url = `${contextPath}/api/engine/query/query_user`;
          const options = {cache: cacheOpt};
          console.info('请求参数', url, 'GET', '', options);
          const promise = io.get(url, options);
          promise.then((res) => {
            console.info('最终结果', res);
            this.cacheData = res;
          });
        });
      },
      sendNegotiationRequest() {
        this.registerCache()
        // 协商缓存
        Promise.all([
          io.get(`${contextPath}/api/test?age=1&name=get`, {
            config: {
              usingHashStorage: true
            }
          }),
          io.post(`${contextPath}/api/test`, {name: 'post'})
        ]).then((result) => {
          this.negotiationData = result;
          result.forEach((res) => {
            console.info(res);
          });
        });
      },
      clearNegotiationData() {
        // 清空协商缓存数据
        sessionStorage.removeItem(negotiateCacheKey);
        // 清空协商缓存中的etag
        io.put(`${contextPath}/api/test/get`);
        io.put(`${contextPath}/api/test/post`);
        this.negotiationData = [];
      },

      registerCache(usingGlobal) {
        const {duration} = this;
        let cacheConfig = {
          localCacheKey,
          negotiateCacheKey,
          duration,
          customGlobalFun: {}
        };
        if (usingGlobal) {
          cacheConfig = {
            ...cacheConfig,
            customGlobalFun: {
              '/dict/DICT_KIND_AREA_TYPE': (data, filterObj) => {
                console.info('/dict/DICT_KIND_AREA_TYPE');
                return this.globalCustomFun(data, filterObj);
              },
              '/area/China': (data, filterObj) => {
                console.info('/area/China');
                return this.globalCustomFun(data, filterObj);
              }
            }
          };
        }
        cache.register(cacheConfig);
      },
      showNotice(content = '请打开控制台查看日志', type = 'success') {
        message[type](content);
      }
    }
  }
</script>

<style lang="less">
  .cache_demo {
    background: #fff;
  }
</style>


<style lang="less">
  .cache_demo {
    .ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane {
      padding: 0 24px 12px;
    }

    .ant-form-item-control,
    .ant-form-item-label {
      line-height: 32px;
    }

    .ant-form-inline .ant-form-item {
      margin-bottom: 10px;
    }
  }
</style>