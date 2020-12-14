<template>
  <div style="padding: 24px; background-color: #fff;">
    {{ msg }}
    <sinogear-editor
      v-model="msg"
      :disabled="disabled"
      @onClick="onClick"
      ref="editor"
    >
    </sinogear-editor>
    <a-button @click="clear">清空内容</a-button>
    <a-button @click="disabled = true">禁用</a-button>
  </div>
</template>

<script>
  import { SinogearEditor } from 'sinogear-vue';
  import { Button } from 'ant-design-vue';
  export default {
    name: "EditorDemo",
    components: {
      SinogearEditor, AButton: Button
    },
    data() {
      return {
        msg: 'Welcome to Use Tinymce Editor',
        disabled: false
      }
    },
    methods: {
      //鼠标单击的事件
      onClick(e, editor) {
        console.log('Element clicked')
        console.log(e);
        console.log(editor)
      },
      //清空内容
      clear() {
        this.$refs.editor.clear()
      }
    }
  }
</script>

<style scoped>

</style>