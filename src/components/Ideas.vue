<template>
  <div>
    <el-tag
      v-for="(tag, index) in ideas"
      :key="tag.id"
      closable
      :disable-transitions="false"
      @close="handleClose(index)"
      :type="types[index % 5]"
    >
      {{ tag.todo }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
      v-else
      class="button-new-tag"
      size="small"
      @click="showInput"
      style="margin-left: 10px"
      >+ New
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Idea",
  props: {},
  data() {
    return {
      cnt: 0,
      ideas: [],
      inputVisible: false,
      inputValue: "",
      types: ["", "success", "info", "warning", "danger"],
    };
  },
  created() {
    for (const key in localStorage) {
      if (key.slice(0, 4) === "IDEA") {
        let tmp = JSON.parse(localStorage[key]);
        if (tmp.id > this.cnt) {
          this.cnt = tmp.id;
        }
        this.ideas.push(tmp);
      }
    }
  },
  methods: {
    handleClose(index) {
      localStorage.removeItem(`IDEA${this.ideas[index].id}`);
      this.ideas.splice(index, 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.cnt++;
        let obj = {
          id: this.cnt,
          todo: inputValue,
        };
        this.ideas.push(obj);
        localStorage[`IDEA${this.cnt}`] = JSON.stringify(obj);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
  },
};
</script>

<style >
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-tag {
  font-size: 20px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>