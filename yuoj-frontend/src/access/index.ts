import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";

// 进行权限判断拦截
router.beforeEach(async (to, from, next) => {
  console.log(from.path + " ====> " + to.path);
  let loginUser = (store as any).state.user.loginUser;

  // todo 自动登录
  if (!loginUser || !loginUser.userRole) {
    // 加 await 是为了等用户登录后 在执行后续的代码
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  // 需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 此时没有权限 要跳转没登录，跳转到登录页面
    if (
      !loginUser ||
      !loginUser.userRole ||
      loginUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      console.log("此时没有权限 要跳转没登录，跳转到登录页面");
      next(`"/user/login?redirect=${to.fullPath}"`);
      return;
    }
    // 如果已经登录了，但是权限不厚，那么跳转到无权限页面
    if (!checkAccess(loginUser, needAccess)) {
      console.log("如果已经登录了，但是权限不厚，那么跳转到无权限页面");
      next("/noAuth");
      return;
    }
  }

  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    // 此时用户没有登录
    console.log("此时用户没有登录");
  } else {
    // 用户正确的权限登录
    console.log("用户正确的权限登录");
  }

  next();
});
