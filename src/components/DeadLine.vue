<template>
  <div>
    <el-row>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>进行中</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="dialogFormVisible = true"
              >新建</el-button
            >
          </div>
          <div v-for="(i, index) in running" :key="i.id">
            <el-row style="height: 32px">
              <el-col :span="10">
                <span class="text">{{ i.todo }}</span>
              </el-col>
              <el-col :span="6">
                <span class="text">{{ i.deadline.substr(0, 10) }}</span>
              </el-col>
              <el-col :span="4">
                <el-button
                  icon="el-icon-check"
                  circle
                  size="mini"
                  @click="doit(index)"
                >
                </el-button>
              </el-col>
              <el-col :span="4">
                <el-button
                  icon="el-icon-close"
                  circle
                  size="mini"
                  @click="delete1(index)"
                >
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>已完成</span>
          </div>
          <div v-for="(i, index) in done" :key="i.id">
            <el-row style="height: 32px">
              <el-col :span="10">
                <span class="text">{{ i.todo }}</span>
              </el-col>
              <el-col :span="6">
                <span class="text">{{ i.deadline.substr(0, 10) }}</span>
              </el-col>
              <el-col :span="4">
                <el-button
                  icon="el-icon-refresh-left"
                  circle
                  size="mini"
                  @click="cancel(index)"
                >
                </el-button>
              </el-col>
              <el-col :span="4">
                <el-button
                  icon="el-icon-close"
                  circle
                  size="mini"
                  @click="delete2(index)"
                >
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="学习进度" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="todo" :label-width="'120px'">
          <el-input
            v-model="form.todo"
            autocomplete="off"
            style="width: 220px"
          ></el-input>
        </el-form-item>
        <el-form-item label="deadline" :label-width="'120px'">
          <el-date-picker
            v-model="form.deadline"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "DeadLine",
  props: {},
  data() {
    return {
      cnt: 0,
      done: [],
      running: [],
      dialogFormVisible: false,
      form: {
        todo: "",
        deadline: "",
      },
    };
  },
  created() {
    for (const key in localStorage) {
      if (key.slice(0, 4) === "DEAD") {
        let tmp = JSON.parse(localStorage[key]);
        if (tmp.id > this.cnt) {
          this.cnt = tmp.id;
        }
        if (tmp.done) {
          this.done.push(tmp);
        } else {
          this.running.push(tmp);
        }
      }
    }
  },
  methods: {
    add() {
      this.cnt++;
      let obj = {
        id: this.cnt,
        todo: this.form.todo,
        deadline: this.form.deadline.toISOString(),
        done: false,
      };
      this.running.push(obj);
      localStorage[`DEAD${obj.id}`] = JSON.stringify(obj);
      this.dialogFormVisible = false;
    },
    doit(index) {
      let tmp = this.running[index];
      tmp.done = true;
      localStorage[`DEAD${tmp.id}`] = JSON.stringify(tmp);
      this.running.splice(index, 1);
      this.done.push(tmp);
    },
    delete1(index) {
      let tmp = this.running[index];
      localStorage.removeItem(`DEAD${tmp.id}`);
      this.running.splice(index, 1);
    },
    cancel(index) {
      let tmp = this.done[index];
      tmp.done = false;
      localStorage[`DEAD${tmp.id}`] = JSON.stringify(tmp);
      this.done.splice(index, 1);
      this.running.push(tmp);
    },
    delete2(index) {
      let tmp = this.done[index];
      localStorage.removeItem(`DEAD${tmp.id}`);
      this.running.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.text {
  line-height: 32px;
}
</style>
