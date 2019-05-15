<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes"
             class="el-menu-vertical-demo"
             unique-opened
             router>
      <template v-for="perm in permissions">
        <template v-if="perm.permissionProperty == '目录'">
          <el-submenu :index="perm.permissionCode"
                      :key="perm.permissionCode">
            <template slot="title">
              <i :class="perm.permissionIcon"></i>
              {{perm.permissionName}}
            </template>
            <template v-for="child in perm.children">
              <el-menu-item :key="child.permissionId"
                            :index="child.permissionCode">
                <i :class="child.permissionIcon"></i>
                {{child.permissionName}}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="perm.permissionCode"
                        :key="perm.permissionCode">
            <i :class="perm.permissionIcon"></i>
            {{perm.permissionName}}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      permissions: this.$store.getters.permissions
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  }
};
</script>


<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 70px;
  bottom: 0;
}

.sidebar > ul {
  height: 100%;
}
</style>
