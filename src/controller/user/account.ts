import { GET, POST, PUT, required, Controller, DIR_IMAGE } from "rapin";
import { isEmpty, isUndefined } from "lodash";
import { Auth } from "@rapin/typeorm-auth";

export class ControllerUserAccount extends Controller {
  constructor(registry) {
    super(registry);
    
    // this.$context.load.language("user/user");
    // this.$context.load.model("user/user");
    // this.$context.load.model("user/role");
  }

  @POST("/account/register")
  @required(["firstName", "lastName", "email", "telephone"])
  public async create() {
    const result = await this.model_user_user.getUserByEmail(
      this.$context.request.post.email
    );

    if (!isEmpty(result)) {
      this.$context.error.set("email_alrady_exists");
    }
    if (!this.error.get()) {
      const password = this.$context.crypto.token(10);
      const userInfo = await this.$context.model_user_user.addUser({
        ...this.$context.request.post,
        ...{ roleId: 2 },
        password
      });

      const token = await this.$context.user.login(userInfo.email, password);

      this.$context.response.setOutput({
        token,
        account: userInfo
      });
    }
  }

  @POST("/account/login")
  @required(["email", "password"])
  public async login() {
    const userInfo = await this.$context.model_user_user.getUserByEmail(
      this.$context.request.post.email
    );

    if (isEmpty(userInfo)) {
      this.$context.error.set("email_not_exists");
    } else {
      const token = await this.$context.user.login(
        this.$context.request.post.email,
        this.$context.request.post.password
      );
      if (token) {
        this.$context.response.setOutput({
          token,
          account: userInfo
        });
      } else {
        this.$context.error.set("incorrect_email_or_password");
      }
    }
  }

  @Auth()
  @GET("/account")
  public async userGet() {
    const userInfo = await this.$context.model_user_user.getUser(this.$context.user.getId());

    this.$context.response.setOutput(userInfo);
  }

  @Auth()
  @PUT("/account")
  @required(["firstName", "lastName", "telephone"])
  public async update() {
    await this.$context.model_user_user.editUser(this.$context.user.getId(), this.$context.request.post);

    const userInfo = await this.$context.model_user_user.getUser(this.$context.user.getId());

    userInfo.role = await this.$context.model_user_role.getRole(userInfo.role_id);

    this.$context.response.setOutput(userInfo);
  }

  @Auth()
  @POST("/account/image", "file")
  public async imageProfessional() {
    if (!isUndefined(this.request.files.file)) {
      const image =
        "/users/" +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        ".jpg";

      await this.file.upload(this.request.files.file, DIR_IMAGE + image);

      const userInfo = await this.model_user_user.updateImage(
        this.user.getId(),
        image
      );
      this.response.setOutput(userInfo);
    } else {
      this.response.setOutput({ status: 404, message: "Missing file" });
    }
  }
}
