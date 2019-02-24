import { GET, POST, PUT, required } from "rapin/lib/helper/request";
import { isEmpty, isUndefined } from "lodash";
import { Controller, DIR_IMAGE } from "rapin/lib/common";
import Registry from "rapin/lib/engine/registry";
import { Auth } from "@rapin/typeorm-auth";

export class ControllerUserAccount extends Controller {
  constructor(registry: Registry) {
    super(registry);
    this.load.language("user/user");
    this.load.model("user/user");
    this.load.model("user/role");
  }

  @POST("/account/register")
  @required(["firstName", "lastName", "email", "telephone"])
  public async create() {
    const result = await this.model_user_user.getUserByEmail(
      this.request.post.email
    );

    if (!isEmpty(result)) {
      this.error.set("email_alrady_exists");
    }
    if (!this.error.get()) {
      const password = this.crypto.token(10);
      const userInfo = await this.model_user_user.addUser({
        ...this.request.post,
        ...{ roleId: 2 },
        password
      });

      const token = await this.user.login(userInfo.email, password);

      this.response.setOutput({
        token,
        account: userInfo
      });
    }
  }

  @POST("/account/login")
  @required(["email", "password"])
  public async login() {
    const userInfo = await this.model_user_user.getUserByEmail(
      this.request.post.email
    );

    if (isEmpty(userInfo)) {
      this.error.set("email_not_exists");
    } else {
      const token = await this.user.login(
        this.request.post.email,
        this.request.post.password
      );
      if (token) {
        this.response.setOutput({
          token,
          account: userInfo
        });
      } else {
        this.error.set("incorrect_email_or_password");
      }
    }
  }

  @Auth()
  @GET("/account")
  public async userGet() {
    const userInfo = await this.model_user_user.getUser(this.user.getId());

    this.response.setOutput(userInfo);
  }

  @Auth()
  @PUT("/account")
  @required(["firstName", "lastName", "telephone"])
  public async update() {
    await this.model_user_user.editUser(this.user.getId(), this.request.post);

    const userInfo = await this.model_user_user.getUser(this.user.getId());

    userInfo.role = await this.model_user_role.getRole(userInfo.role_id);

    this.response.setOutput(userInfo);
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
