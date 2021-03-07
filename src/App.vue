<template>
  <div id="app">
    <el-row>
      <el-col :span="3">
        <h5>TODO</h5>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="selected"
        >
          <el-menu-item index="1">
            <i class="el-icon-close"></i>
            <span slot="title">死线</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-loading"></i>
            <span slot="title">日常</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-view"></i>
            <span slot="title">想法</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18" :offset="1">
        <DeadLine v-if="show('1')" />
        <Idea v-if="show('3')" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DeadLine from "@/components/DeadLine.vue";
import Idea from "@/components/Ideas.vue";
export default {
  name: "App",
  components: {
    DeadLine,
    Idea,
  },
  data() {
    return {
      index: "1",
    };
  },
  methods: {
    selected(index) {
      this.index = index;
    },
    show(index) {
      return this.index === index;
    },
  },
  computed: {},
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 16px;
}
</style>
